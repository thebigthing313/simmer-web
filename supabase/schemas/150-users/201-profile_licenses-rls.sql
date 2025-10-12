alter table public.profile_licenses enable row level security;

create policy "select: own and groupmates"
    on public.profile_licenses
    for select
    to authenticated
    using (
        profile_id = public.get_user_profile_id()
        or public.is_group_mate(profile_id, 'profile')
    );

create policy "insert: own, or group admin for group dummy profiles"
    on public.profile_licenses
    for insert
    to authenticated
    with check (
        profile_id = public.get_user_profile_id()
        or public.user_has_group_role((select group_id from public.profiles where id = profile_id), 'admin')
    );

create policy "update: own, or group admin for groupmates"
    on public.profile_licenses
    for update
    to authenticated
    using (
        profile_id = public.get_user_profile_id()
        or public.user_has_group_role((select group_id from public.profiles where id = profile_id), 'admin')
    )
    with check (
        profile_id = public.get_user_profile_id()
        or public.user_has_group_role((select group_id from public.profiles where id = profile_id), 'admin')
    );

create policy "delete: none"
    on public.profile_licenses
    for delete
    to public
    using (false);