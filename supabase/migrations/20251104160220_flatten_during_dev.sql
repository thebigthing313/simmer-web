create extension if not exists "postgis" with schema "extensions";
create schema if not exists "simmer";

create type "public"."group_role" as enum ('owner', 'admin', 'manager', 'collector', 'member');

create type "public"."setting_names" as enum ('user_default_group_id');

create table "public"."group_invites" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "user_id" uuid not null,
    "role" group_role not null,
    "expiration_date" timestamp with time zone,
    "is_accepted" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid
);


alter table "public"."group_invites" enable row level security;

create table "public"."group_profiles" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "profile_id" uuid not null,
    "role" group_role not null,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid,
    "is_active" boolean not null default true
);


alter table "public"."group_profiles" enable row level security;

create table "public"."groups" (
    "id" uuid not null default gen_random_uuid(),
    "group_name" text not null,
    "address" text not null,
    "phone" text not null,
    "short_name" text not null,
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

create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "first_name" text not null,
    "last_name" text not null,
    "user_id" uuid,
    "profile_photo_url" text,
    "avatar_url" text,
    "bio" text,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid
);


alter table "public"."profiles" enable row level security;

create table "public"."regions" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid,
    "region_name" text not null,
    "geom" geometry(MultiPolygon,4326) not null,
    "parent_id" uuid,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid
);


alter table "public"."regions" enable row level security;

create table "public"."user_settings" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "setting_name" setting_names not null,
    "setting_value" text,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid
);


alter table "public"."user_settings" enable row level security;

CREATE UNIQUE INDEX group_invites_group_id_user_id_idx ON public.group_invites USING btree (group_id, user_id);

CREATE UNIQUE INDEX group_invites_pkey ON public.group_invites USING btree (id);

CREATE UNIQUE INDEX group_profiles_group_id_profile_id_role_key ON public.group_profiles USING btree (group_id, profile_id, role);

CREATE UNIQUE INDEX group_profiles_pkey ON public.group_profiles USING btree (id);

CREATE UNIQUE INDEX groups_pkey ON public.groups USING btree (id);

CREATE UNIQUE INDEX groups_short_name_key ON public.groups USING btree (short_name);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);

CREATE UNIQUE INDEX regions_pkey ON public.regions USING btree (id);

CREATE UNIQUE INDEX user_settings_pkey ON public.user_settings USING btree (id);

alter table "public"."group_invites" add constraint "group_invites_pkey" PRIMARY KEY using index "group_invites_pkey";

alter table "public"."group_profiles" add constraint "group_profiles_pkey" PRIMARY KEY using index "group_profiles_pkey";

alter table "public"."groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."regions" add constraint "regions_pkey" PRIMARY KEY using index "regions_pkey";

alter table "public"."user_settings" add constraint "user_settings_pkey" PRIMARY KEY using index "user_settings_pkey";

alter table "public"."group_invites" add constraint "group_invites_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_created_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_deleted_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_invites" validate constraint "group_invites_group_id_fkey";

alter table "public"."group_invites" add constraint "group_invites_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_updated_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."group_invites" validate constraint "group_invites_user_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_created_by_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_deleted_by_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_group_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_group_id_profile_id_role_key" UNIQUE using index "group_profiles_group_id_profile_id_role_key";

alter table "public"."group_profiles" add constraint "group_profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_profile_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_updated_by_fkey";

alter table "public"."groups" add constraint "groups_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."groups" validate constraint "groups_created_by_fkey";

alter table "public"."groups" add constraint "groups_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."groups" validate constraint "groups_deleted_by_fkey";

alter table "public"."groups" add constraint "groups_short_name_key" UNIQUE using index "groups_short_name_key";

alter table "public"."groups" add constraint "groups_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."groups" validate constraint "groups_updated_by_fkey";

alter table "public"."profiles" add constraint "profiles_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_created_by_fkey";

alter table "public"."profiles" add constraint "profiles_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_deleted_by_fkey";

alter table "public"."profiles" add constraint "profiles_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_updated_by_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_key" UNIQUE using index "profiles_user_id_key";

alter table "public"."regions" add constraint "regions_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."regions" validate constraint "regions_created_by_fkey";

alter table "public"."regions" add constraint "regions_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."regions" validate constraint "regions_deleted_by_fkey";

alter table "public"."regions" add constraint "regions_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."regions" validate constraint "regions_group_id_fkey";

alter table "public"."regions" add constraint "regions_parent_check" CHECK ((id <> parent_id)) not valid;

alter table "public"."regions" validate constraint "regions_parent_check";

alter table "public"."regions" add constraint "regions_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES regions(id) ON DELETE SET NULL not valid;

alter table "public"."regions" validate constraint "regions_parent_id_fkey";

alter table "public"."regions" add constraint "regions_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."regions" validate constraint "regions_updated_by_fkey";

alter table "public"."user_settings" add constraint "user_settings_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."user_settings" validate constraint "user_settings_created_by_fkey";

alter table "public"."user_settings" add constraint "user_settings_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."user_settings" validate constraint "user_settings_deleted_by_fkey";

alter table "public"."user_settings" add constraint "user_settings_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."user_settings" validate constraint "user_settings_updated_by_fkey";

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

grant delete on table "public"."group_invites" to "anon";

grant insert on table "public"."group_invites" to "anon";

grant references on table "public"."group_invites" to "anon";

grant select on table "public"."group_invites" to "anon";

grant trigger on table "public"."group_invites" to "anon";

grant truncate on table "public"."group_invites" to "anon";

grant update on table "public"."group_invites" to "anon";

grant delete on table "public"."group_invites" to "authenticated";

grant insert on table "public"."group_invites" to "authenticated";

grant references on table "public"."group_invites" to "authenticated";

grant select on table "public"."group_invites" to "authenticated";

grant trigger on table "public"."group_invites" to "authenticated";

grant truncate on table "public"."group_invites" to "authenticated";

grant update on table "public"."group_invites" to "authenticated";

grant delete on table "public"."group_invites" to "service_role";

grant insert on table "public"."group_invites" to "service_role";

grant references on table "public"."group_invites" to "service_role";

grant select on table "public"."group_invites" to "service_role";

grant trigger on table "public"."group_invites" to "service_role";

grant truncate on table "public"."group_invites" to "service_role";

grant update on table "public"."group_invites" to "service_role";

grant delete on table "public"."group_profiles" to "anon";

grant insert on table "public"."group_profiles" to "anon";

grant references on table "public"."group_profiles" to "anon";

grant select on table "public"."group_profiles" to "anon";

grant trigger on table "public"."group_profiles" to "anon";

grant truncate on table "public"."group_profiles" to "anon";

grant update on table "public"."group_profiles" to "anon";

grant delete on table "public"."group_profiles" to "authenticated";

grant insert on table "public"."group_profiles" to "authenticated";

grant references on table "public"."group_profiles" to "authenticated";

grant select on table "public"."group_profiles" to "authenticated";

grant trigger on table "public"."group_profiles" to "authenticated";

grant truncate on table "public"."group_profiles" to "authenticated";

grant update on table "public"."group_profiles" to "authenticated";

grant delete on table "public"."group_profiles" to "service_role";

grant insert on table "public"."group_profiles" to "service_role";

grant references on table "public"."group_profiles" to "service_role";

grant select on table "public"."group_profiles" to "service_role";

grant trigger on table "public"."group_profiles" to "service_role";

grant truncate on table "public"."group_profiles" to "service_role";

grant update on table "public"."group_profiles" to "service_role";

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

grant delete on table "public"."regions" to "anon";

grant insert on table "public"."regions" to "anon";

grant references on table "public"."regions" to "anon";

grant select on table "public"."regions" to "anon";

grant trigger on table "public"."regions" to "anon";

grant truncate on table "public"."regions" to "anon";

grant update on table "public"."regions" to "anon";

grant delete on table "public"."regions" to "authenticated";

grant insert on table "public"."regions" to "authenticated";

grant references on table "public"."regions" to "authenticated";

grant select on table "public"."regions" to "authenticated";

grant trigger on table "public"."regions" to "authenticated";

grant truncate on table "public"."regions" to "authenticated";

grant update on table "public"."regions" to "authenticated";

grant delete on table "public"."regions" to "service_role";

grant insert on table "public"."regions" to "service_role";

grant references on table "public"."regions" to "service_role";

grant select on table "public"."regions" to "service_role";

grant trigger on table "public"."regions" to "service_role";

grant truncate on table "public"."regions" to "service_role";

grant update on table "public"."regions" to "service_role";

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

create policy "delete: none"
on "public"."group_invites"
as permissive
for delete
to authenticated
using (false);


create policy "insert: group owners"
on "public"."group_invites"
as permissive
for insert
to authenticated
with check (user_has_group_role(group_id, 'owner'::text));


create policy "select: self or group owners"
on "public"."group_invites"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND ((user_id = ( SELECT auth.uid() AS uid)) OR user_has_group_role(group_id, 'owner'::text))));


create policy "update: group owners or invitee"
on "public"."group_invites"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND (user_has_group_role(group_id, 'owner'::text) OR (user_id = ( SELECT auth.uid() AS uid)))))
with check (((is_accepted IS NOT TRUE) OR (user_id = ( SELECT auth.uid() AS uid))));


create policy "delete: group owners or users"
on "public"."group_profiles"
as permissive
for delete
to authenticated
using (((user_has_group_role(group_id, 'owner'::text) AND (profile_id <> get_user_profile_id())) OR ((profile_id = get_user_profile_id()) AND (NOT user_has_group_role(group_id, 'owner'::text)))));


create policy "insert: group owners"
on "public"."group_profiles"
as permissive
for insert
to authenticated
with check (user_has_group_role(group_id, 'owner'::text));


create policy "select: group mates"
on "public"."group_profiles"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND user_is_group_member(group_id)));


create policy "update: group owner"
on "public"."group_profiles"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND user_has_group_role(group_id, 'owner'::text)))
with check (user_has_group_role(group_id, 'owner'::text));


create policy "delete: none"
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


create policy "select: own groups or invites"
on "public"."groups"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND ((created_by = ( SELECT auth.uid() AS uid)) OR user_is_group_member(id) OR (EXISTS ( SELECT 1
   FROM group_invites gi
  WHERE ((gi.group_id = groups.id) AND (gi.user_id = ( SELECT auth.uid() AS uid)) AND (gi.is_accepted = false) AND (gi.expiration_date > now())))))));


create policy "update: group owner"
on "public"."groups"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND (user_is_group_member(id) OR (EXISTS ( SELECT 1
   FROM group_invites gi
  WHERE ((gi.group_id = gi.id) AND (gi.user_id = ( SELECT auth.uid() AS uid)) AND (gi.is_accepted = false) AND (gi.expiration_date > now())))))))
with check (user_has_group_role(id, 'owner'::text));


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
with check (((user_id = ( SELECT auth.uid() AS uid)) OR ((user_id IS NULL) AND (EXISTS ( SELECT 1
   FROM group_profiles gp
  WHERE ((gp.profile_id = get_user_profile_id()) AND (gp.role = 'owner'::group_role)))))));


create policy "select: own and groupmates"
on "public"."profiles"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND ((user_id = ( SELECT auth.uid() AS uid)) OR is_group_mate(id, 'profile'::text))));


create policy "update: own or group admin for group dummy profiles"
on "public"."profiles"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND ((user_id = ( SELECT auth.uid() AS uid)) OR (EXISTS ( SELECT 1
   FROM group_profiles gp
  WHERE ((gp.profile_id = profiles.id) AND user_has_group_role(gp.group_id, 'admin'::text)))))))
with check (((user_id = ( SELECT auth.uid() AS uid)) OR (EXISTS ( SELECT 1
   FROM group_profiles gp
  WHERE ((gp.profile_id = profiles.id) AND user_has_group_role(gp.group_id, 'admin'::text))))));


create policy "delete: none"
on "public"."regions"
as permissive
for delete
to anon, authenticated
using (false);


create policy "insert: group manager"
on "public"."regions"
as permissive
for insert
to authenticated
with check (user_has_group_role(group_id, 'manager'::text));


create policy "select: group data"
on "public"."regions"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND user_is_group_member(group_id)));


create policy "update: group manager"
on "public"."regions"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND user_has_group_role(group_id, 'manager'::text)))
with check (user_has_group_role(group_id, 'manager'::text));


create policy "delete: none"
on "public"."user_settings"
as permissive
for delete
to authenticated
using (false);


create policy "insert: create own settings"
on "public"."user_settings"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "select: view own settings"
on "public"."user_settings"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND (( SELECT auth.uid() AS uid) = user_id)));


create policy "update: own settings"
on "public"."user_settings"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND (( SELECT auth.uid() AS uid) = user_id)))
with check ((( SELECT auth.uid() AS uid) = user_id));







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


CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.group_invites FOR EACH ROW EXECUTE FUNCTION simmer.set_created_by();

CREATE TRIGGER handle_group_invite_accept AFTER UPDATE ON public.group_invites FOR EACH ROW WHEN (((old.is_accepted IS DISTINCT FROM new.is_accepted) AND (new.is_accepted = true))) EXECUTE FUNCTION simmer.handle_group_invite_accept();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.group_invites FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER group_role_to_app_metadata_trigger AFTER INSERT OR DELETE OR UPDATE ON public.group_profiles FOR EACH ROW EXECUTE FUNCTION simmer.group_role_to_app_metadata();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.group_profiles FOR EACH ROW EXECUTE FUNCTION simmer.set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.group_profiles FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER created_by_trigger BEFORE INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION simmer.set_created_by();

CREATE TRIGGER handle_group_create_owner AFTER INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION simmer.create_group_with_owner();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.groups FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION simmer.set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.profiles FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER profile_to_app_metadata_trigger AFTER INSERT OR DELETE OR UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION simmer.profile_to_app_metadata();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.regions FOR EACH ROW EXECUTE FUNCTION simmer.set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.regions FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER default_group_to_app_metadata_trigger AFTER INSERT OR DELETE OR UPDATE ON public.user_settings FOR EACH ROW EXECUTE FUNCTION simmer.default_group_to_app_metadata();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.user_settings FOR EACH ROW EXECUTE FUNCTION simmer.set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.user_settings FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();