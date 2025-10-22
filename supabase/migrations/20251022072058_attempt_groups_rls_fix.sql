drop policy "select: own group memberships or invites" on "public"."groups";

create policy "select: own groups or invites"
on "public"."groups"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND ((created_by = ( SELECT auth.uid() AS uid)) OR user_is_group_member(id) OR (EXISTS ( SELECT 1
   FROM group_invites gi
  WHERE ((gi.group_id = gi.id) AND (gi.user_id = ( SELECT auth.uid() AS uid)) AND (gi.is_accepted = false) AND (gi.expiration_date > now())))))));



set check_function_bodies = off;

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


