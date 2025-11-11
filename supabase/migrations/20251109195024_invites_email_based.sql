drop policy "delete: none" on "public"."group_invites";

drop policy "select: self or group owners" on "public"."group_invites";

drop policy "update: group owners or invitee" on "public"."group_invites";

drop policy "select: own groups or invites" on "public"."groups";

alter table "public"."group_invites" drop constraint "group_invites_user_id_fkey";

drop index if exists "public"."group_invites_group_id_user_id_idx";

alter table "public"."group_invites" drop column "user_id";

alter table "public"."group_invites" add column "user_email" text not null;

CREATE UNIQUE INDEX group_invites_group_id_user_email_idx ON public.group_invites USING btree (group_id, user_email);

set check_function_bodies = off;

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
            where p.user_id = auth.uid()
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


  create policy "delete: none"
  on "public"."group_invites"
  as permissive
  for delete
  to authenticated
using ((((user_email = ( SELECT auth.email() AS email)) OR public.user_has_group_role(group_id, 'owner'::text)) AND (is_accepted = false)));



  create policy "select: self or group owners"
  on "public"."group_invites"
  as permissive
  for select
  to authenticated
using (((user_email = ( SELECT auth.email() AS email)) OR public.user_has_group_role(group_id, 'owner'::text)));



  create policy "update: group owners or invitee"
  on "public"."group_invites"
  as permissive
  for update
  to authenticated
using ((public.user_has_group_role(group_id, 'owner'::text) OR (user_email = ( SELECT auth.email() AS email))))
with check (((is_accepted IS NOT TRUE) OR (user_email = ( SELECT auth.email() AS email))));



  create policy "select: own groups or invites"
  on "public"."groups"
  as permissive
  for select
  to authenticated
using (((created_by = ( SELECT auth.uid() AS uid)) OR public.user_is_group_member(id) OR (EXISTS ( SELECT 1
   FROM public.group_invites gi
  WHERE ((gi.group_id = groups.id) AND (gi.user_email = ( SELECT auth.email() AS email)) AND (gi.is_accepted = false) AND (gi.expiration_date > now()))))));



