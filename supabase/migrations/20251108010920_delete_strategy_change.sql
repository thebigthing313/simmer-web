drop trigger if exists "default_group_to_app_metadata_trigger" on "public"."user_settings";

drop trigger if exists "handle_created_trigger" on "public"."user_settings";

drop trigger if exists "handle_updated_trigger" on "public"."user_settings";

drop policy "delete: none" on "public"."groups";

drop policy "delete: none" on "public"."lookup_states_us";

drop policy "insert: none" on "public"."lookup_states_us";

drop policy "select: anyone" on "public"."lookup_states_us";

drop policy "update: none" on "public"."lookup_states_us";

drop policy "Block unauthorized deletes from profiles" on "public"."profiles";

drop policy "delete: none" on "public"."regions";

drop policy "delete: none" on "public"."user_settings";

drop policy "insert: create own settings" on "public"."user_settings";

drop policy "select: view own settings" on "public"."user_settings";

drop policy "update: own settings" on "public"."user_settings";

drop policy "delete: none" on "public"."group_invites";

drop policy "select: self or group owners" on "public"."group_invites";

drop policy "update: group owners or invitee" on "public"."group_invites";

drop policy "select: group mates" on "public"."group_profiles";

drop policy "update: group owner" on "public"."group_profiles";

drop policy "select: own groups or invites" on "public"."groups";

drop policy "update: group owner" on "public"."groups";

drop policy "select: own and groupmates" on "public"."profiles";

drop policy "update: own or group admin for group dummy profiles" on "public"."profiles";

drop policy "select: group data" on "public"."regions";

drop policy "update: group manager" on "public"."regions";

revoke delete on table "public"."lookup_states_us" from "anon";

revoke insert on table "public"."lookup_states_us" from "anon";

revoke references on table "public"."lookup_states_us" from "anon";

revoke select on table "public"."lookup_states_us" from "anon";

revoke trigger on table "public"."lookup_states_us" from "anon";

revoke truncate on table "public"."lookup_states_us" from "anon";

revoke update on table "public"."lookup_states_us" from "anon";

revoke delete on table "public"."lookup_states_us" from "authenticated";

revoke insert on table "public"."lookup_states_us" from "authenticated";

revoke references on table "public"."lookup_states_us" from "authenticated";

revoke select on table "public"."lookup_states_us" from "authenticated";

revoke trigger on table "public"."lookup_states_us" from "authenticated";

revoke truncate on table "public"."lookup_states_us" from "authenticated";

revoke update on table "public"."lookup_states_us" from "authenticated";

revoke delete on table "public"."lookup_states_us" from "service_role";

revoke insert on table "public"."lookup_states_us" from "service_role";

revoke references on table "public"."lookup_states_us" from "service_role";

revoke select on table "public"."lookup_states_us" from "service_role";

revoke trigger on table "public"."lookup_states_us" from "service_role";

revoke truncate on table "public"."lookup_states_us" from "service_role";

revoke update on table "public"."lookup_states_us" from "service_role";

revoke delete on table "public"."user_settings" from "anon";

revoke insert on table "public"."user_settings" from "anon";

revoke references on table "public"."user_settings" from "anon";

revoke select on table "public"."user_settings" from "anon";

revoke trigger on table "public"."user_settings" from "anon";

revoke truncate on table "public"."user_settings" from "anon";

revoke update on table "public"."user_settings" from "anon";

revoke delete on table "public"."user_settings" from "authenticated";

revoke insert on table "public"."user_settings" from "authenticated";

revoke references on table "public"."user_settings" from "authenticated";

revoke select on table "public"."user_settings" from "authenticated";

revoke trigger on table "public"."user_settings" from "authenticated";

revoke truncate on table "public"."user_settings" from "authenticated";

revoke update on table "public"."user_settings" from "authenticated";

revoke delete on table "public"."user_settings" from "service_role";

revoke insert on table "public"."user_settings" from "service_role";

revoke references on table "public"."user_settings" from "service_role";

revoke select on table "public"."user_settings" from "service_role";

revoke trigger on table "public"."user_settings" from "service_role";

revoke truncate on table "public"."user_settings" from "service_role";

revoke update on table "public"."user_settings" from "service_role";

alter table "public"."group_invites" drop constraint "group_invites_deleted_by_fkey";

alter table "public"."group_profiles" drop constraint "group_profiles_deleted_by_fkey";

alter table "public"."groups" drop constraint "groups_deleted_by_fkey";

alter table "public"."lookup_states_us" drop constraint "lookup_states_us_abbreviation_key";

alter table "public"."lookup_states_us" drop constraint "lookup_states_us_state_name_key";

alter table "public"."profiles" drop constraint "profiles_deleted_by_fkey";

alter table "public"."regions" drop constraint "regions_deleted_by_fkey";

alter table "public"."user_settings" drop constraint "user_settings_created_by_fkey";

alter table "public"."user_settings" drop constraint "user_settings_deleted_by_fkey";

alter table "public"."user_settings" drop constraint "user_settings_updated_by_fkey";

alter table "public"."user_settings" drop constraint "user_settings_user_id_fkey";

alter table "public"."group_invites" drop constraint "group_invites_created_by_fkey";

alter table "public"."group_invites" drop constraint "group_invites_group_id_fkey";

alter table "public"."group_invites" drop constraint "group_invites_updated_by_fkey";

alter table "public"."group_invites" drop constraint "group_invites_user_id_fkey";

alter table "public"."group_profiles" drop constraint "group_profiles_created_by_fkey";

alter table "public"."group_profiles" drop constraint "group_profiles_group_id_fkey";

alter table "public"."group_profiles" drop constraint "group_profiles_profile_id_fkey";

alter table "public"."group_profiles" drop constraint "group_profiles_updated_by_fkey";

drop function if exists "public"."soft_delete_record"(p_record_ids uuid[], p_table_name text);

alter table "public"."lookup_states_us" drop constraint "lookup_states_us_pkey";

alter table "public"."user_settings" drop constraint "user_settings_pkey";

drop index if exists "public"."lookup_states_us_abbreviation_key";

drop index if exists "public"."lookup_states_us_pkey";

drop index if exists "public"."lookup_states_us_state_name_key";

drop index if exists "public"."user_settings_pkey";

drop table "public"."lookup_states_us";

drop table "public"."user_settings";

create table "public"."locations" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "location_name" text not null,
    "address" text,
    "geom" geometry(Point,4326) not null,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "created_by" uuid,
    "updated_by" uuid
);


alter table "public"."locations" enable row level security;

alter table "public"."group_invites" drop column "deleted_at";

alter table "public"."group_invites" drop column "deleted_by";

alter table "public"."group_invites" alter column "expiration_date" set not null;

alter table "public"."group_profiles" drop column "deleted_at";

alter table "public"."group_profiles" drop column "deleted_by";

alter table "public"."groups" drop column "deleted_at";

alter table "public"."groups" drop column "deleted_by";

alter table "public"."profiles" drop column "deleted_at";

alter table "public"."profiles" drop column "deleted_by";

alter table "public"."regions" drop column "deleted_at";

alter table "public"."regions" drop column "deleted_by";

drop type "public"."setting_names";

CREATE UNIQUE INDEX locations_pkey ON public.locations USING btree (id);

alter table "public"."locations" add constraint "locations_pkey" PRIMARY KEY using index "locations_pkey";

alter table "public"."locations" add constraint "locations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."locations" validate constraint "locations_created_by_fkey";

alter table "public"."locations" add constraint "locations_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) not valid;

alter table "public"."locations" validate constraint "locations_group_id_fkey";

alter table "public"."locations" add constraint "locations_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."locations" validate constraint "locations_updated_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."group_invites" validate constraint "group_invites_created_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_group_id_fkey";

alter table "public"."group_invites" add constraint "group_invites_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."group_invites" validate constraint "group_invites_updated_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_user_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_created_by_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_group_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_profile_id_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_updated_by_fkey";

grant delete on table "public"."locations" to "anon";

grant insert on table "public"."locations" to "anon";

grant references on table "public"."locations" to "anon";

grant select on table "public"."locations" to "anon";

grant trigger on table "public"."locations" to "anon";

grant truncate on table "public"."locations" to "anon";

grant update on table "public"."locations" to "anon";

grant delete on table "public"."locations" to "authenticated";

grant insert on table "public"."locations" to "authenticated";

grant references on table "public"."locations" to "authenticated";

grant select on table "public"."locations" to "authenticated";

grant trigger on table "public"."locations" to "authenticated";

grant truncate on table "public"."locations" to "authenticated";

grant update on table "public"."locations" to "authenticated";

grant delete on table "public"."locations" to "service_role";

grant insert on table "public"."locations" to "service_role";

grant references on table "public"."locations" to "service_role";

grant select on table "public"."locations" to "service_role";

grant trigger on table "public"."locations" to "service_role";

grant truncate on table "public"."locations" to "service_role";

grant update on table "public"."locations" to "service_role";

create policy "delete: owners"
on "public"."groups"
as permissive
for delete
to authenticated
using (user_has_group_role(id, 'owner'::text));


create policy "delete: own if collector, all if manager"
on "public"."locations"
as permissive
for delete
to authenticated
using (((user_has_group_role(group_id, 'collector'::text) AND (created_by = ( SELECT auth.uid() AS uid))) OR user_has_group_role(group_id, 'manager'::text)));


create policy "insert: group collector"
on "public"."locations"
as permissive
for insert
to authenticated
with check (user_has_group_role(group_id, 'collector'::text));


create policy "select: group data"
on "public"."locations"
as permissive
for select
to authenticated
using (user_is_group_member(group_id));


create policy "update: own if collector, all if manager"
on "public"."locations"
as permissive
for update
to authenticated
using (((user_has_group_role(group_id, 'collector'::text) AND (created_by = ( SELECT auth.uid() AS uid))) OR user_has_group_role(group_id, 'manager'::text)))
with check (((user_has_group_role(group_id, 'collector'::text) AND (created_by = ( SELECT auth.uid() AS uid))) OR user_has_group_role(group_id, 'manager'::text)));


create policy "delete: own or group admin for dummy profiles"
on "public"."profiles"
as permissive
for delete
to authenticated
using (((user_id = ( SELECT auth.uid() AS uid)) OR (EXISTS ( SELECT 1
   FROM group_profiles gp
  WHERE ((gp.profile_id = profiles.id) AND user_has_group_role(gp.group_id, 'admin'::text))))));


create policy "delete: group manager"
on "public"."regions"
as permissive
for delete
to authenticated
using (user_has_group_role(group_id, 'manager'::text));


create policy "delete: none"
on "public"."group_invites"
as permissive
for delete
to authenticated
using ((((user_id = ( SELECT auth.uid() AS uid)) OR user_has_group_role(group_id, 'owner'::text)) AND (is_accepted = false)));


create policy "select: self or group owners"
on "public"."group_invites"
as permissive
for select
to authenticated
using (((user_id = ( SELECT auth.uid() AS uid)) OR user_has_group_role(group_id, 'owner'::text)));


create policy "update: group owners or invitee"
on "public"."group_invites"
as permissive
for update
to authenticated
using ((user_has_group_role(group_id, 'owner'::text) OR (user_id = ( SELECT auth.uid() AS uid))))
with check (((is_accepted IS NOT TRUE) OR (user_id = ( SELECT auth.uid() AS uid))));


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


create policy "select: own groups or invites"
on "public"."groups"
as permissive
for select
to authenticated
using (((created_by = ( SELECT auth.uid() AS uid)) OR user_is_group_member(id) OR (EXISTS ( SELECT 1
   FROM group_invites gi
  WHERE ((gi.group_id = groups.id) AND (gi.user_id = ( SELECT auth.uid() AS uid)) AND (gi.is_accepted = false) AND (gi.expiration_date > now()))))));


create policy "update: group owner"
on "public"."groups"
as permissive
for update
to authenticated
using (user_has_group_role(id, 'owner'::text))
with check (user_has_group_role(id, 'owner'::text));


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
using (((user_id = ( SELECT auth.uid() AS uid)) OR (EXISTS ( SELECT 1
   FROM group_profiles gp
  WHERE ((gp.profile_id = profiles.id) AND user_has_group_role(gp.group_id, 'admin'::text))))))
with check (((user_id = ( SELECT auth.uid() AS uid)) OR (EXISTS ( SELECT 1
   FROM group_profiles gp
  WHERE ((gp.profile_id = profiles.id) AND user_has_group_role(gp.group_id, 'admin'::text))))));


create policy "select: group data"
on "public"."regions"
as permissive
for select
to authenticated
using (user_is_group_member(group_id));


create policy "update: group manager"
on "public"."regions"
as permissive
for update
to authenticated
using (user_has_group_role(group_id, 'manager'::text))
with check (user_has_group_role(group_id, 'manager'::text));

drop function if exists "simmer"."default_group_to_app_metadata"();

create table "simmer"."deleted_data" (
    "id" uuid not null default gen_random_uuid(),
    "deleted_at" timestamp with time zone not null default now(),
    "original_table" text not null,
    "original_id" uuid not null,
    "data" jsonb not null
);


CREATE UNIQUE INDEX deleted_data_pkey ON simmer.deleted_data USING btree (id);

alter table "simmer"."deleted_data" add constraint "deleted_data_pkey" PRIMARY KEY using index "deleted_data_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION simmer.soft_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  begin
    insert into simmer.deleted_data (original_table, original_id, data)
    values (TG_TABLE_NAME, OLD.id, row_to_json(OLD)::jsonb);
    return null;
  end;
$function$
;


CREATE TRIGGER soft_delete_trigger BEFORE DELETE ON public.group_invites FOR EACH ROW EXECUTE FUNCTION simmer.soft_delete();

CREATE TRIGGER soft_delete_trigger BEFORE DELETE ON public.group_profiles FOR EACH ROW EXECUTE FUNCTION simmer.soft_delete();

CREATE TRIGGER soft_delete_trigger BEFORE DELETE ON public.groups FOR EACH ROW EXECUTE FUNCTION simmer.soft_delete();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.locations FOR EACH ROW EXECUTE FUNCTION simmer.set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.locations FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER soft_delete_trigger BEFORE DELETE ON public.locations FOR EACH ROW EXECUTE FUNCTION simmer.soft_delete();

CREATE TRIGGER soft_delete_trigger BEFORE DELETE ON public.lookup_units FOR EACH ROW EXECUTE FUNCTION simmer.soft_delete();

CREATE TRIGGER soft_delete_trigger BEFORE DELETE ON public.profiles FOR EACH ROW EXECUTE FUNCTION simmer.soft_delete();

CREATE TRIGGER soft_delete_trigger BEFORE DELETE ON public.regions FOR EACH ROW EXECUTE FUNCTION simmer.soft_delete();