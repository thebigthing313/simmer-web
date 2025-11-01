create schema if not exists "simmer";

create extension if not exists "postgis" with schema "extensions";

create type "public"."group_role" as enum ('owner', 'admin', 'manager', 'collector', 'member');

create type "public"."setting_names" as enum ('user_default_group_id');

create table "public"."group_users" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "user_id" uuid not null,
    "role" group_role not null,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid
);


alter table "public"."group_users" enable row level security;

create table "public"."groups" (
    "id" uuid not null default gen_random_uuid(),
    "group_name" text not null,
    "address" text not null,
    "phone" text not null,
    "short_name" text,
    "fax" text,
    "website_url" text,
    "logo_url" text,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid
);


alter table "public"."groups" enable row level security;

create table "public"."profile_licenses" (
    "id" uuid not null default gen_random_uuid(),
    "profile_id" uuid not null,
    "issuing_agency" text not null,
    "license_number" text not null,
    "license_type" text,
    "issue_date" date,
    "expiry_date" date,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid
);


alter table "public"."profile_licenses" enable row level security;

create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "first_name" text not null,
    "last_name" text not null,
    "user_id" uuid,
    "profile_photo_url" text,
    "avatar_url" text,
    "group_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid
);


alter table "public"."profiles" enable row level security;

create table "public"."user_settings" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "setting_name" setting_names not null,
    "setting_value" text
);


alter table "public"."user_settings" enable row level security;

CREATE UNIQUE INDEX group_users_group_id_user_id_role_key ON public.group_users USING btree (group_id, user_id, role);

CREATE UNIQUE INDEX group_users_pkey ON public.group_users USING btree (id);

CREATE UNIQUE INDEX groups_pkey ON public.groups USING btree (id);

CREATE UNIQUE INDEX profile_licenses_pkey ON public.profile_licenses USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);

CREATE UNIQUE INDEX user_settings_pkey ON public.user_settings USING btree (id);

alter table "public"."group_users" add constraint "group_users_pkey" PRIMARY KEY using index "group_users_pkey";

alter table "public"."groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."profile_licenses" add constraint "profile_licenses_pkey" PRIMARY KEY using index "profile_licenses_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."user_settings" add constraint "user_settings_pkey" PRIMARY KEY using index "user_settings_pkey";

alter table "public"."group_users" add constraint "group_users_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_users" validate constraint "group_users_created_by_fkey";

alter table "public"."group_users" add constraint "group_users_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_users" validate constraint "group_users_group_id_fkey";

alter table "public"."group_users" add constraint "group_users_group_id_user_id_role_key" UNIQUE using index "group_users_group_id_user_id_role_key";

alter table "public"."group_users" add constraint "group_users_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_users" validate constraint "group_users_updated_by_fkey";

alter table "public"."group_users" add constraint "group_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."group_users" validate constraint "group_users_user_id_fkey";

alter table "public"."groups" add constraint "groups_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."groups" validate constraint "groups_created_by_fkey";

alter table "public"."groups" add constraint "groups_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."groups" validate constraint "groups_deleted_by_fkey";

alter table "public"."groups" add constraint "groups_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."groups" validate constraint "groups_updated_by_fkey";

alter table "public"."profile_licenses" add constraint "expiry_date_after_issue_date" CHECK (((expiry_date IS NULL) OR (issue_date IS NULL) OR (expiry_date > issue_date))) not valid;

alter table "public"."profile_licenses" validate constraint "expiry_date_after_issue_date";

alter table "public"."profile_licenses" add constraint "profile_licenses_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profile_licenses" validate constraint "profile_licenses_created_by_fkey";

alter table "public"."profile_licenses" add constraint "profile_licenses_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profile_licenses" validate constraint "profile_licenses_deleted_by_fkey";

alter table "public"."profile_licenses" add constraint "profile_licenses_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE RESTRICT not valid;

alter table "public"."profile_licenses" validate constraint "profile_licenses_profile_id_fkey";

alter table "public"."profile_licenses" add constraint "profile_licenses_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profile_licenses" validate constraint "profile_licenses_updated_by_fkey";

alter table "public"."profiles" add constraint "profiles_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_created_by_fkey";

alter table "public"."profiles" add constraint "profiles_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_deleted_by_fkey";

alter table "public"."profiles" add constraint "profiles_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_group_id_fkey";

alter table "public"."profiles" add constraint "profiles_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_updated_by_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_key" UNIQUE using index "profiles_user_id_key";

alter table "public"."user_settings" add constraint "user_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_settings" validate constraint "user_settings_user_id_fkey";

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

    if TG_OP = 'UPDATE' and new ? 'created_by' then
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
        if new ? 'updated_at' then
            new.updated_at = now();
        end if;
        if new ? 'updated_by' then
            new.updated_by = auth.uid();
        end if;
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

grant delete on table "public"."group_users" to "anon";

grant insert on table "public"."group_users" to "anon";

grant references on table "public"."group_users" to "anon";

grant select on table "public"."group_users" to "anon";

grant trigger on table "public"."group_users" to "anon";

grant truncate on table "public"."group_users" to "anon";

grant update on table "public"."group_users" to "anon";

grant delete on table "public"."group_users" to "authenticated";

grant insert on table "public"."group_users" to "authenticated";

grant references on table "public"."group_users" to "authenticated";

grant select on table "public"."group_users" to "authenticated";

grant trigger on table "public"."group_users" to "authenticated";

grant truncate on table "public"."group_users" to "authenticated";

grant update on table "public"."group_users" to "authenticated";

grant delete on table "public"."group_users" to "service_role";

grant insert on table "public"."group_users" to "service_role";

grant references on table "public"."group_users" to "service_role";

grant select on table "public"."group_users" to "service_role";

grant trigger on table "public"."group_users" to "service_role";

grant truncate on table "public"."group_users" to "service_role";

grant update on table "public"."group_users" to "service_role";

grant delete on table "public"."groups" to "anon";

grant insert on table "public"."groups" to "anon";

grant references on table "public"."groups" to "anon";

grant select on table "public"."groups" to "anon";

grant trigger on table "public"."groups" to "anon";

grant truncate on table "public"."groups" to "anon";

grant update on table "public"."groups" to "anon";

grant delete on table "public"."groups" to "authenticated";

grant insert on table "public"."groups" to "authenticated";

grant references on table "public"."groups" to "authenticated";

grant select on table "public"."groups" to "authenticated";

grant trigger on table "public"."groups" to "authenticated";

grant truncate on table "public"."groups" to "authenticated";

grant update on table "public"."groups" to "authenticated";

grant delete on table "public"."groups" to "service_role";

grant insert on table "public"."groups" to "service_role";

grant references on table "public"."groups" to "service_role";

grant select on table "public"."groups" to "service_role";

grant trigger on table "public"."groups" to "service_role";

grant truncate on table "public"."groups" to "service_role";

grant update on table "public"."groups" to "service_role";

grant delete on table "public"."profile_licenses" to "anon";

grant insert on table "public"."profile_licenses" to "anon";

grant references on table "public"."profile_licenses" to "anon";

grant select on table "public"."profile_licenses" to "anon";

grant trigger on table "public"."profile_licenses" to "anon";

grant truncate on table "public"."profile_licenses" to "anon";

grant update on table "public"."profile_licenses" to "anon";

grant delete on table "public"."profile_licenses" to "authenticated";

grant insert on table "public"."profile_licenses" to "authenticated";

grant references on table "public"."profile_licenses" to "authenticated";

grant select on table "public"."profile_licenses" to "authenticated";

grant trigger on table "public"."profile_licenses" to "authenticated";

grant truncate on table "public"."profile_licenses" to "authenticated";

grant update on table "public"."profile_licenses" to "authenticated";

grant delete on table "public"."profile_licenses" to "service_role";

grant insert on table "public"."profile_licenses" to "service_role";

grant references on table "public"."profile_licenses" to "service_role";

grant select on table "public"."profile_licenses" to "service_role";

grant trigger on table "public"."profile_licenses" to "service_role";

grant truncate on table "public"."profile_licenses" to "service_role";

grant update on table "public"."profile_licenses" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."user_settings" to "anon";

grant insert on table "public"."user_settings" to "anon";

grant references on table "public"."user_settings" to "anon";

grant select on table "public"."user_settings" to "anon";

grant trigger on table "public"."user_settings" to "anon";

grant truncate on table "public"."user_settings" to "anon";

grant update on table "public"."user_settings" to "anon";

grant delete on table "public"."user_settings" to "authenticated";

grant insert on table "public"."user_settings" to "authenticated";

grant references on table "public"."user_settings" to "authenticated";

grant select on table "public"."user_settings" to "authenticated";

grant trigger on table "public"."user_settings" to "authenticated";

grant truncate on table "public"."user_settings" to "authenticated";

grant update on table "public"."user_settings" to "authenticated";

grant delete on table "public"."user_settings" to "service_role";

grant insert on table "public"."user_settings" to "service_role";

grant references on table "public"."user_settings" to "service_role";

grant select on table "public"."user_settings" to "service_role";

grant trigger on table "public"."user_settings" to "service_role";

grant truncate on table "public"."user_settings" to "service_role";

grant update on table "public"."user_settings" to "service_role";

create policy "delete: group owners or users"
on "public"."group_users"
as permissive
for delete
to authenticated
using (((user_has_group_role(group_id, 'owner'::text) AND (user_id <> ( SELECT auth.uid() AS uid))) OR (user_id = ( SELECT auth.uid() AS uid))));


create policy "insert: group owners"
on "public"."group_users"
as permissive
for insert
to authenticated
with check (user_has_group_role(group_id, 'owner'::text));


create policy "select: group mates"
on "public"."group_users"
as permissive
for select
to authenticated
using (user_is_group_member(group_id));


create policy "update: group owner"
on "public"."group_users"
as permissive
for update
to authenticated
using (user_has_group_role(group_id, 'owner'::text))
with check (user_has_group_role(group_id, 'owner'::text));


create policy "Block unauthorized deletes from group users"
on "public"."groups"
as permissive
for delete
to public
using (false);


create policy "insert: own"
on "public"."groups"
as permissive
for insert
to authenticated
with check ((created_by = ( SELECT auth.uid() AS uid)));


create policy "select: non-deleted, unless owner of deleted group"
on "public"."groups"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) OR user_has_group_role(id, 'owner'::text)));


create policy "update: group owner"
on "public"."groups"
as permissive
for update
to authenticated
using (user_has_group_role(id, 'owner'::text))
with check (user_has_group_role(id, 'owner'::text));


create policy "delete: none"
on "public"."profile_licenses"
as permissive
for delete
to public
using (false);


create policy "insert: own, or group admin for group dummy profiles"
on "public"."profile_licenses"
as permissive
for insert
to authenticated
with check (((profile_id = get_user_profile_id()) OR user_has_group_role(( SELECT profiles.group_id
   FROM profiles
  WHERE (profiles.id = profile_licenses.profile_id)), 'admin'::text)));


create policy "select: own and groupmates"
on "public"."profile_licenses"
as permissive
for select
to authenticated
using (((profile_id = get_user_profile_id()) OR is_group_mate(profile_id, 'profile'::text)));


create policy "update: own, or group admin for groupmates"
on "public"."profile_licenses"
as permissive
for update
to authenticated
using (((profile_id = get_user_profile_id()) OR user_has_group_role(( SELECT profiles.group_id
   FROM profiles
  WHERE (profiles.id = profile_licenses.profile_id)), 'admin'::text)))
with check (((profile_id = get_user_profile_id()) OR user_has_group_role(( SELECT profiles.group_id
   FROM profiles
  WHERE (profiles.id = profile_licenses.profile_id)), 'admin'::text)));


create policy "Block unauthorized deletes from profiles"
on "public"."profiles"
as permissive
for delete
to public
using (false);


create policy "insert: own, or group owner for group dummy profiles"
on "public"."profiles"
as permissive
for insert
to authenticated
with check (((user_id = ( SELECT auth.uid() AS uid)) OR (user_has_group_role(group_id, 'owner'::text) AND (user_id IS NULL) AND (group_id IS NOT NULL))));


create policy "select: own and groupmates"
on "public"."profiles"
as permissive
for select
to authenticated
using (((user_id = ( SELECT auth.uid() AS uid)) OR is_group_mate(id, 'profile'::text)));


create policy "update: own or group admin for group dummy profiles"
on "public"."profiles"
as permissive
for update
to authenticated
using (((user_id = ( SELECT auth.uid() AS uid)) OR user_has_group_role(group_id, 'admin'::text)))
with check (((user_id = ( SELECT auth.uid() AS uid)) OR user_has_group_role(group_id, 'admin'::text)));


create policy "Users can delete their own settings"
on "public"."user_settings"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can insert their own settings"
on "public"."user_settings"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can update their own settings"
on "public"."user_settings"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can view their own settings"
on "public"."user_settings"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));

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

CREATE TRIGGER group_role_to_app_metadata_trigger AFTER INSERT OR DELETE OR UPDATE ON public.group_users FOR EACH ROW EXECUTE FUNCTION simmer.group_role_to_app_metadata();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.group_users FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.group_users FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_group_create_owner AFTER INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION simmer.create_group_with_owner();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.groups FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.profile_licenses FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.profile_licenses FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.profiles FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER profile_to_app_metadata_trigger AFTER INSERT OR DELETE OR UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION simmer.profile_to_app_metadata();

CREATE TRIGGER default_group_to_app_metadata_trigger AFTER INSERT OR DELETE OR UPDATE ON public.user_settings FOR EACH ROW EXECUTE FUNCTION simmer.default_group_to_app_metadata();
