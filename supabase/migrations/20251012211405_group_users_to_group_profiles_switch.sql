drop trigger if exists "group_role_to_app_metadata_trigger" on "public"."group_users";

drop trigger if exists "handle_created_trigger" on "public"."group_users";

drop trigger if exists "handle_updated_trigger" on "public"."group_users";

drop policy "delete: group owners or users" on "public"."group_users";

drop policy "insert: group owners" on "public"."group_users";

drop policy "select: group mates" on "public"."group_users";

drop policy "update: group owner" on "public"."group_users";

revoke delete on table "public"."group_users" from "anon";

revoke insert on table "public"."group_users" from "anon";

revoke references on table "public"."group_users" from "anon";

revoke select on table "public"."group_users" from "anon";

revoke trigger on table "public"."group_users" from "anon";

revoke truncate on table "public"."group_users" from "anon";

revoke update on table "public"."group_users" from "anon";

revoke delete on table "public"."group_users" from "authenticated";

revoke insert on table "public"."group_users" from "authenticated";

revoke references on table "public"."group_users" from "authenticated";

revoke select on table "public"."group_users" from "authenticated";

revoke trigger on table "public"."group_users" from "authenticated";

revoke truncate on table "public"."group_users" from "authenticated";

revoke update on table "public"."group_users" from "authenticated";

revoke delete on table "public"."group_users" from "service_role";

revoke insert on table "public"."group_users" from "service_role";

revoke references on table "public"."group_users" from "service_role";

revoke select on table "public"."group_users" from "service_role";

revoke trigger on table "public"."group_users" from "service_role";

revoke truncate on table "public"."group_users" from "service_role";

revoke update on table "public"."group_users" from "service_role";

alter table "public"."group_users" drop constraint "group_users_created_by_fkey";

alter table "public"."group_users" drop constraint "group_users_group_id_fkey";

alter table "public"."group_users" drop constraint "group_users_group_id_user_id_role_key";

alter table "public"."group_users" drop constraint "group_users_updated_by_fkey";

alter table "public"."group_users" drop constraint "group_users_user_id_fkey";

alter table "public"."group_users" drop constraint "group_users_pkey";

drop index if exists "public"."group_users_group_id_user_id_role_key";

drop index if exists "public"."group_users_pkey";

drop table "public"."group_users";

create table "public"."group_profiles" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "profile_id" uuid not null,
    "role" group_role not null,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_at" timestamp with time zone,
    "updated_by" uuid,
    "is_active" boolean not null default true
);


alter table "public"."group_profiles" enable row level security;

CREATE UNIQUE INDEX group_profiles_group_id_profile_id_role_key ON public.group_profiles USING btree (group_id, profile_id, role);

CREATE UNIQUE INDEX group_profiles_pkey ON public.group_profiles USING btree (id);

alter table "public"."group_profiles" add constraint "group_profiles_pkey" PRIMARY KEY using index "group_profiles_pkey";

alter table "public"."group_profiles" add constraint "group_profiles_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_created_by_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_group_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_group_id_profile_id_role_key" UNIQUE using index "group_profiles_group_id_profile_id_role_key";

alter table "public"."group_profiles" add constraint "group_profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_profile_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_updated_by_fkey";

set check_function_bodies = off;

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
        join public.group_profiles gp on dp.group_id = gp.group_id
        join current_user_id cui on gp.profile_id = (select id from public.profiles where user_id = cui.user_id)
        where dp.id = p_id and dp.user_id is null and dp.group_id is not null
      )
    )
    or
    (
      exists (
        select 1
        from public.group_profiles gp1
        join public.group_profiles gp2
          on gp1.group_id = gp2.group_id
        join current_user_id cui on gp1.profile_id = (select id from public.profiles where user_id = cui.user_id)
        join target_user_id tui on gp2.profile_id = (select id from public.profiles where user_id = tui.user_id)
        where gp1.profile_id != gp2.profile_id
      )
    );
$function$
;

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
using (user_is_group_member(group_id));


create policy "update: group owner"
on "public"."group_profiles"
as permissive
for update
to authenticated
using (user_has_group_role(group_id, 'owner'::text))
with check (user_has_group_role(group_id, 'owner'::text));


CREATE TRIGGER group_role_to_app_metadata_trigger AFTER INSERT OR DELETE OR UPDATE ON public.group_profiles FOR EACH ROW EXECUTE FUNCTION simmer.group_role_to_app_metadata();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.group_profiles FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.group_profiles FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();


set check_function_bodies = off;

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


