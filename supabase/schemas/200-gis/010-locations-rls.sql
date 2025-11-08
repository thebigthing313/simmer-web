alter table public.locations enable row level security;

create policy "select: group data"
on public.locations
for select
to authenticated
using (public.user_is_group_member (group_id));

create policy "insert: group collector"
on public.locations
for insert
to authenticated
with check (public.user_has_group_role (group_id, 'collector'));

create policy "update: own if collector, all if manager"
on public.locations
for update
to authenticated
using ((public.user_has_group_role (group_id, 'collector') and created_by=(select auth.uid())) or public.user_has_group_role (group_id, 'manager'))
with check ((public.user_has_group_role (group_id, 'collector') and created_by=(select auth.uid())) or public.user_has_group_role (group_id, 'manager'));

create policy "delete: own if collector, all if manager"
on public.locations
for delete
to authenticated
using ((public.user_has_group_role (group_id, 'collector') and created_by=(select auth.uid())) or public.user_has_group_role (group_id, 'manager'));