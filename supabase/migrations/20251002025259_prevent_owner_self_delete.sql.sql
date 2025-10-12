drop policy "delete: group owners or users" on "public"."group_users";

create policy "delete: group owners or users"
on "public"."group_users"
as permissive
for delete
to authenticated
using (((user_has_group_role(group_id, 'owner'::text) AND (user_id <> ( SELECT auth.uid() AS uid))) OR ((user_id = ( SELECT auth.uid() AS uid)) AND (NOT user_has_group_role(group_id, 'owner'::text)))));



