alter table public.regions enable row level security;

create policy "select: group data" on public.regions for
select
    to authenticated using (
        deleted_at is null
        and public.user_is_group_member (group_id)
    );

create policy "insert: group manager" on public.regions for insert to authenticated
with
    check (public.user_has_group_role (group_id, 'manager'));

create policy "update: group manager" on public.regions
for update
    to authenticated using (
        deleted_at is null
        and public.user_has_group_role (group_id, 'manager')
    )
with
    check (public.user_has_group_role (group_id, 'manager'));

create policy "delete: none" on public.regions for delete to anon,
authenticated using (false);