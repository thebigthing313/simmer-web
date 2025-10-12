alter table public.group_users
    enable row level security;

create policy "select: group mates"
    on public.group_users
    for select
    to authenticated
    using (
        public.user_is_group_member(group_id)
    );

create policy "insert: group owners"
    on public.group_users
    for insert
    to authenticated
    with check (public.user_has_group_role(group_id, 'owner'));

create policy "update: group owner"
    on public.group_users
    for update
    to authenticated
    using (
        public.user_has_group_role(group_id, 'owner')
    )
    with check (
        public.user_has_group_role(group_id, 'owner')
    );

create policy "delete: group owners or users"
    on public.group_users
    for delete
    to authenticated
    using (
        -- owners may delete other users (but not themselves)
        (public.user_has_group_role(group_id, 'owner') and user_id <> (select auth.uid()))
        -- non-owners (regular members) may delete their own membership, owners are excluded by the first clause
        or (user_id = (select auth.uid()) and not public.user_has_group_role(group_id, 'owner'))
    );