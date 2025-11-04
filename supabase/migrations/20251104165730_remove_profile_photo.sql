alter table "public"."profiles" drop column "profile_photo_url";

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
  ),
  my_profile as (
    select id as profile_id from public.profiles where user_id = (select user_id from current_user_id)
  ),
  target_profile as (
    select id as profile_id from public.profiles where user_id = (select user_id from target_user_id)
  )
  select
    (
      -- Case: the provided p_id is a profile id that is an "orphan" (no user) but belongs to a group.
      -- Check whether the current user's profile shares any group with that profile.
      exists (
        select 1
        from public.profiles dp
        join public.group_profiles gp_dp on gp_dp.profile_id = dp.id
        join my_profile mp on true
        join public.group_profiles gp_mp on gp_mp.profile_id = mp.profile_id and gp_mp.group_id = gp_dp.group_id
        where dp.id = p_id and dp.user_id is null
      )
    )
    or
    (
      -- General case: check whether the current user's profile and the target user's/profile's profile
      -- share any group via group_profiles.
      exists (
        select 1
        from public.group_profiles gp1
        join public.group_profiles gp2 on gp1.group_id = gp2.group_id
        join my_profile mp on gp1.profile_id = mp.profile_id
        join target_profile tp on gp2.profile_id = tp.profile_id
        where gp1.profile_id != gp2.profile_id
      )
    );
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

CREATE OR REPLACE FUNCTION public.soft_delete_record(p_record_ids uuid[], p_table_name text)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
    declare
        v_table_exists boolean;
        v_has_deleted_columns boolean;
        v_record_count integer;
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

        -- Step 3: Verify all records exist
        execute format(
            'select count(*) from public.%I where id = any($1)',
            p_table_name
        ) using p_record_ids into v_record_count;

        if v_record_count != array_length(p_record_ids, 1) then
            raise exception 'One or more records do not exist in table "%"', p_table_name;
        end if;

        -- Step 4: Perform the soft delete
        execute format(
            'update public.%I set deleted_at = now(), deleted_by = (select auth.uid()) where id = any($1)',
            p_table_name
        ) using p_record_ids;
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

CREATE OR REPLACE FUNCTION simmer.account_creation_profile_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
    v_first text;
    v_last text;
begin
    -- If there is no metadata, just skip creating a profile and return.
    if new.raw_user_meta_data is null then
        return new;
    end if;

    v_first := new.raw_user_meta_data ->> 'first_name';
    v_last := new.raw_user_meta_data ->> 'last_name';

    -- If either first or last name is missing/empty, skip inserting a profile.
    if v_first is null or v_last is null or length(trim(both from v_first)) = 0 or length(trim(both from v_last)) = 0 then
        return new;
    end if;

    insert into public.profiles (first_name, last_name, user_id)
    values (v_first, v_last, new.id);

    return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION simmer.create_group_with_owner()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
        begin
            -- Resolve the creator's profile_id from JWT app_metadata
            -- public.get_user_profile_id() returns (auth.jwt() -> 'app_metadata' ->> 'profile_id')::uuid
            if public.get_user_profile_id() is not null then
                insert into public.group_profiles (group_id, profile_id, role)
                    values (new.id, public.get_user_profile_id(), 'owner');
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
        v_profile_id uuid;
        v_group_id text;
        v_role text;
    begin
        -- Use NEW for insert/update, OLD for delete
        if TG_OP = 'DELETE' then
            v_profile_id := OLD.profile_id;
            v_group_id := OLD.group_id::text;
            v_role := OLD.role::text;
        else
            v_profile_id := NEW.profile_id;
            v_group_id := NEW.group_id::text;
            v_role := NEW.role::text;
        end if;

        -- Resolve profile -> user mapping
        select user_id
        into v_user_id
        from public.profiles
        where id = v_profile_id;

        -- If there's no linked auth.user, nothing to do
        if v_user_id is null then
            if TG_OP = 'DELETE' then
                return OLD;
            else
                return NEW;
            end if;
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

CREATE OR REPLACE FUNCTION simmer.handle_group_invite_accept()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
    -- Only act when an invite flips to accepted
    if TG_OP = 'UPDATE' then
        if NEW.is_accepted and (OLD.is_accepted is distinct from NEW.is_accepted) then
            -- Insert the membership iff the invitee has a profile and the membership doesn't already exist
            insert into public.group_profiles (group_id, profile_id, role)
            select NEW.group_id, p.id, NEW.role
            from public.profiles p
            where p.user_id = NEW.user_id
            and not exists (
                select 1 from public.group_profiles gp
                where gp.group_id = NEW.group_id and gp.profile_id = p.id
            );
        end if;
    end if;

    return NEW;
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

CREATE OR REPLACE FUNCTION simmer.set_created_by()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin

    if TG_OP = 'INSERT' then
        new.created_by = auth.uid();
    end if;
    return new;
end;
$function$
;


