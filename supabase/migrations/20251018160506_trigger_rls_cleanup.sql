drop policy "delete: group owners" on "public"."group_invites";

drop policy "Block unauthorized deletes from group users" on "public"."groups";

drop policy "select: non-deleted, unless owner of deleted group" on "public"."groups";

drop policy "Users can delete their own settings" on "public"."user_settings";

drop policy "Users can insert their own settings" on "public"."user_settings";

drop policy "Users can update their own settings" on "public"."user_settings";

drop policy "Users can view their own settings" on "public"."user_settings";

drop policy "select: self or group owners" on "public"."group_invites";

drop policy "update: group owners or invitee" on "public"."group_invites";

drop policy "select: group mates" on "public"."group_profiles";

drop policy "update: group owner" on "public"."group_profiles";

drop policy "update: group owner" on "public"."groups";

drop policy "update: own or group admin for group dummy profiles" on "public"."profiles";

drop policy "update: group manager" on "public"."regions";

alter table "public"."group_invites" add column "deleted_at" timestamp with time zone;

alter table "public"."group_invites" add column "deleted_by" uuid;

alter table "public"."group_invites" add column "updated_at" timestamp with time zone;

alter table "public"."group_invites" add column "updated_by" uuid;

alter table "public"."group_profiles" add column "deleted_at" timestamp with time zone;

alter table "public"."group_profiles" add column "deleted_by" uuid;

alter table "public"."user_settings" add column "created_at" timestamp with time zone not null default now();

alter table "public"."user_settings" add column "created_by" uuid;

alter table "public"."user_settings" add column "deleted_at" timestamp with time zone;

alter table "public"."user_settings" add column "deleted_by" uuid;

alter table "public"."user_settings" add column "updated_at" timestamp with time zone;

alter table "public"."user_settings" add column "updated_by" uuid;

alter table "public"."group_invites" add constraint "group_invites_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_deleted_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_updated_by_fkey";

alter table "public"."group_profiles" add constraint "group_profiles_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_profiles" validate constraint "group_profiles_deleted_by_fkey";

alter table "public"."user_settings" add constraint "user_settings_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."user_settings" validate constraint "user_settings_created_by_fkey";

alter table "public"."user_settings" add constraint "user_settings_deleted_by_fkey" FOREIGN KEY (deleted_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."user_settings" validate constraint "user_settings_deleted_by_fkey";

alter table "public"."user_settings" add constraint "user_settings_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."user_settings" validate constraint "user_settings_updated_by_fkey";

create policy "delete: none"
on "public"."group_invites"
as permissive
for delete
to authenticated
using (false);


create policy "delete: none"
on "public"."groups"
as permissive
for delete
to public
using (false);


create policy "select: own group memberships or invites"
on "public"."groups"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND (user_is_group_member(id) OR (EXISTS ( SELECT 1
   FROM group_invites gi
  WHERE ((gi.group_id = gi.id) AND (gi.user_id = ( SELECT auth.uid() AS uid)) AND (gi.is_accepted = false) AND (gi.expiration_date > now())))))));


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


create policy "update: group owner"
on "public"."groups"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND (user_is_group_member(id) OR (EXISTS ( SELECT 1
   FROM group_invites gi
  WHERE ((gi.group_id = gi.id) AND (gi.user_id = ( SELECT auth.uid() AS uid)) AND (gi.is_accepted = false) AND (gi.expiration_date > now())))))))
with check (user_has_group_role(id, 'owner'::text));


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


create policy "update: group manager"
on "public"."regions"
as permissive
for update
to authenticated
using (((deleted_at IS NULL) AND user_has_group_role(group_id, 'manager'::text)))
with check (user_has_group_role(group_id, 'manager'::text));


CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.group_invites FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();

CREATE TRIGGER created_by_trigger BEFORE INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.user_settings FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_updated_trigger BEFORE UPDATE ON public.user_settings FOR EACH ROW WHEN ((old.* IS DISTINCT FROM new.*)) EXECUTE FUNCTION set_updated_record_fields();


