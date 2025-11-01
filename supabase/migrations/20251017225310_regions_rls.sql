drop policy "select: own and groupmates" on "public"."profiles";

alter table "public"."regions" enable row level security;

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
using (user_has_group_role(group_id, 'manager'::text))
with check (user_has_group_role(group_id, 'manager'::text));


create policy "select: own and groupmates"
on "public"."profiles"
as permissive
for select
to authenticated
using (((deleted_at IS NULL) AND ((user_id = ( SELECT auth.uid() AS uid)) OR is_group_mate(id, 'profile'::text))));



