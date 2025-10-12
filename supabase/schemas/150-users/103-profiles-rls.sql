alter table public.profiles enable row level security;

create policy "select: own and groupmates"
    on public.profiles
    for select
    to authenticated
    using (
        user_id = (select auth.uid())
        or public.is_group_mate(id, 'profile')
    );

create policy "insert: own, or group owner for group dummy profiles"
    on public.profiles
    for insert
    to authenticated
    with check (
        (user_id = (select auth.uid()))
        or (public.user_has_group_role(group_id, 'owner') and user_id is null and group_id is not null)
    );


create policy "update: own or group admin for group dummy profiles"
    on public.profiles
    for update
    to authenticated
    using (
        user_id = (select auth.uid())
        or public.user_has_group_role(group_id, 'admin')
    )
    with check (
        user_id = (select auth.uid())
        or public.user_has_group_role(group_id, 'admin')
    );

create policy "Block unauthorized deletes from profiles"
    on public.profiles
    for delete
    to public
    using (false);