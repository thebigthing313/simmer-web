alter table public.profiles enable row level security;

create policy "select: own and groupmates"
on public.profiles
for select
to authenticated
using (
    user_id=(select auth.uid())
    or
    public.is_group_mate (id, 'profile')   
);

create policy "insert: own, or group owner for group dummy profiles"
on public.profiles
for insert
to authenticated
with check (
    (user_id=(select auth.uid ()))
    -- Allow creating a "dummy" (user_id IS NULL) profile only if the caller is an owner of at least one group.
    -- The actual association to a specific group must be created via `public.group_profiles`, whose RLS
    -- enforces owner checks on insert.
    or (
    user_id is null
        and exists (
            select 1
            from public.group_profiles gp
            where gp.profile_id=public.get_user_profile_id ()
            and gp.role='owner'
        )
    )
);

create policy "update: own or group admin for group dummy profiles"
on public.profiles
for update
to authenticated
using (
    user_id=(select auth.uid ())
    or exists (
        select 1
        from public.group_profiles gp
        where gp.profile_id=public.profiles.id
        and public.user_has_group_role (gp.group_id, 'admin')
        )
    )
with check (
    user_id=(select auth.uid ())
    or exists (
        select 1
        from public.group_profiles gp
        where gp.profile_id=public.profiles.id
        and public.user_has_group_role (gp.group_id, 'admin')
    )
);

create policy "delete: own or group admin for dummy profiles"
on public.profiles
for delete
to authenticated
using (
    user_id=(select auth.uid ())
    or exists (
        select 1
        from public.group_profiles gp
        where gp.profile_id=public.profiles.id
        and public.user_has_group_role (gp.group_id, 'admin')
        )
);