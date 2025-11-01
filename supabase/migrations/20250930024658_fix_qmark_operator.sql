set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_profile_id()
 RETURNS uuid
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO ''
AS $function$
  select (auth.jwt() -> 'app_metadata' ->> 'profile_id')::uuid;
$function$
;

CREATE OR REPLACE FUNCTION public.is_group_mate(p_id uuid, p_type text)
 RETURNS boolean
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  with current_user_id as (
    select auth.uid() as user_id
  ),
  target_user_id as (
    select case
      when p_type = 'user' then p_id
      when p_type = 'profile' then (select user_id from public.profiles where id = p_id)
      else null
    end as user_id
  )
  select
    (
      exists (
        select 1
        from public.profiles dp
        join public.group_users gu on dp.group_id = gu.group_id
        join current_user_id cui on gu.user_id = cui.user_id
        where dp.id = p_id and dp.user_id is null and dp.group_id is not null
      )
    )
    or
    (
      exists (
        select 1
        from public.group_users gu1
        join public.group_users gu2
          on gu1.group_id = gu2.group_id
        join current_user_id cui on gu1.user_id = cui.user_id
        join target_user_id tui on gu2.user_id = tui.user_id
        where gu1.user_id != gu2.user_id
      )
    );
$function$
;

CREATE OR REPLACE FUNCTION public.set_created_by()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin

    if TG_OP = 'UPDATE' then
        new.created_by = auth.uid();
    end if;

    return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_record_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin

    if TG_OP = 'UPDATE' then
        new.updated_at = now();
        new.updated_by = auth.uid();
    end if;

    return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.soft_delete_record(p_record_id uuid, p_table_name text)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
    declare
        v_table_exists boolean;
        v_has_deleted_columns boolean;
        v_record_exists boolean;
    begin
        -- Step 1: Verify the table exists
        select exists (
            select 1
            from information_schema.tables
            where table_schema = 'public' and table_name = p_table_name
        ) into v_table_exists;

        if not v_table_exists then
            raise exception 'Table "%" does not exist in the "public" schema', p_table_name;
        end if;

        -- Step 2: Verify the table has "deleted_at" and "deleted_by" columns
        select exists (
            select 1
            from information_schema.columns
            where table_schema = 'public' and table_name = p_table_name
            and column_name in ('deleted_at', 'deleted_by')
            group by table_name
            having count(*) = 2
        ) into v_has_deleted_columns;

        if not v_has_deleted_columns then
            raise exception 'Table "%" does not have both "deleted_at" and "deleted_by" columns', p_table_name;
        end if;

        -- Step 3: Verify the record exists
        execute format(
            'select exists (select 1 from public.%I where id = $1)',
            p_table_name
        ) using p_record_id into v_record_exists;

        if not v_record_exists then
            raise exception 'Record with id "%" does not exist in table "%"', p_record_id, p_table_name;
        end if;

        -- Step 4: Perform the soft delete
        execute format(
            'update public.%I set deleted_at = now(), deleted_by = auth.uid() where id = $1',
            p_table_name
        ) using p_record_id;
    end;
$function$
;

CREATE OR REPLACE FUNCTION public.user_has_group_role(group_id uuid, group_role text)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO ''
AS $function$
  select coalesce(
    exists (
      select 1
      from jsonb_array_elements(auth.jwt() -> 'app_metadata' -> 'groups') as group_obj
      where group_obj ->> 'group_id' = group_id::text
        and group_obj ->> 'role' = group_role
    ),
    false
  );
$function$
;

CREATE OR REPLACE FUNCTION public.user_is_group_member(group_id uuid)
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO ''
AS $function$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'groups')
    @> jsonb_build_array(jsonb_build_object('group_id', group_id::text)),
    false
  );
$function$
;


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION simmer.create_group_with_owner()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
        declare
            auth_role text = auth.role();
            auth_uid uuid = auth.uid();
        begin
            if auth_role in ('authenticated', 'service_role', 'postgres') then
                insert into public.group_users (group_id, user_id, role)
                    values (new.id, auth_uid, 'owner');
                return null;
            elsif auth_role = 'anon' then
                raise exception 'Unauthorized' using hint = 'Anonymous role. You must authenticate.';
            else
                raise exception 'Unauthorized' using hint = format('Unexpected role: %s', auth_role);
            end if;
            return null;
        end;
    $function$
;

CREATE OR REPLACE FUNCTION simmer.default_group_to_app_metadata()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
    declare
        v_app_meta jsonb;
        v_user_id uuid;
        v_default_group text;
    begin
        -- Use NEW for insert/update, OLD for delete
        if TG_OP = 'DELETE' then
            v_user_id := OLD.user_id;
            if OLD.setting_name = 'user_default_group_id' then
                v_default_group := null;
            else
                return OLD;
            end if;
        else
            v_user_id := NEW.user_id;
            if NEW.setting_name = 'user_default_group_id' then
                v_default_group := NEW.setting_value;
            else
                return NEW;
            end if;
        end if;

        -- Fetch current raw_app_meta_data or default to '{}'
        select coalesce(raw_app_meta_data, '{}'::jsonb)
        into v_app_meta
        from auth.users
        where id = v_user_id;

        -- Set or remove the default_group field
        if TG_OP = 'DELETE' or v_default_group is null then
            v_app_meta := v_app_meta - 'default_group';
        else
            v_app_meta := jsonb_set(v_app_meta, '{default_group}', to_jsonb(v_default_group), true);
        end if;

        -- Write back to auth.users
        update auth.users
        set raw_app_meta_data = v_app_meta
        where id = v_user_id;

        if TG_OP = 'DELETE' then
            return OLD;
        else
            return NEW;
        end if;
    end;
$function$
;

CREATE OR REPLACE FUNCTION simmer.group_role_to_app_metadata()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
    declare
        v_app_meta jsonb;
        v_groups jsonb;
        v_group_obj jsonb;
        v_user_id uuid;
        v_group_id text;
        v_role text;
    begin
        -- Use NEW for insert/update, OLD for delete
        if TG_OP = 'DELETE' then
            v_user_id := OLD.user_id;
            v_group_id := OLD.group_id::text;
            v_role := OLD.role::text;
        else
            v_user_id := NEW.user_id;
            v_group_id := NEW.group_id::text;
            v_role := NEW.role::text;
        end if;

        -- Fetch current raw_app_meta_data or default to '{}'
        select coalesce(raw_app_meta_data, '{}'::jsonb)
        into v_app_meta
        from auth.users
        where id = v_user_id;

        -- Extract or initialize the groups array
        v_groups := coalesce(v_app_meta->'groups', '[]'::jsonb);

        -- Remove any existing entry for this group_id
        v_groups := (
            select jsonb_agg(elem)
            from jsonb_array_elements(v_groups) elem
            where elem->>'group_id' != v_group_id
        );
        if v_groups is null then
            v_groups := '[]'::jsonb;
        end if;

        -- Only add the new group object for insert/update
        if TG_OP != 'DELETE' then
            v_group_obj := jsonb_build_object(
                'group_id', v_group_id,
                'role', v_role
            );
            v_groups := v_groups || v_group_obj;
        end if;

        -- Update the groups array in app_meta
        v_app_meta := jsonb_set(v_app_meta, '{groups}', v_groups, true);

        -- Write back to auth.users
        update auth.users
        set raw_app_meta_data = v_app_meta
        where id = v_user_id;

        if TG_OP = 'DELETE' then
            return OLD;
        else
            return NEW;
        end if;
    end;
$function$
;

CREATE OR REPLACE FUNCTION simmer.profile_to_app_metadata()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
    declare
        v_app_meta jsonb;
        v_user_id uuid;
    begin
        -- Use NEW for insert/update, OLD for delete
        if TG_OP = 'DELETE' then
            v_user_id := OLD.user_id;
        else
            v_user_id := NEW.user_id;
        end if;

        if v_user_id is not null then
            -- Get the current raw_app_meta_data, or default to '{}'
            select coalesce(raw_app_meta_data, '{}'::jsonb) into v_app_meta
            from auth.users
            where id = v_user_id;

            if TG_OP = 'DELETE' then
                -- Remove the profile_id field
                v_app_meta := v_app_meta - 'profile_id';
            else
                -- Update the profile_id field
                v_app_meta := jsonb_set(v_app_meta, '{profile_id}', to_jsonb(NEW.id::text), true);
            end if;

            -- Write new metadata into auth.users(raw_app_meta_data)
            update auth.users
            set raw_app_meta_data = v_app_meta
            where id = v_user_id;
        end if;

        if TG_OP = 'DELETE' then
            return OLD;
        else
            return NEW;
        end if;
    end;
$function$
;


