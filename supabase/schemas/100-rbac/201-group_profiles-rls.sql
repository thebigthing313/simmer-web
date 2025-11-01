alter table public.group_profiles enable row level security;

create policy "select: group mates" on public.group_profiles for
select
    to authenticated using (
        deleted_at is null
        and public.user_is_group_member (group_id)
    );

create policy "insert: group owners" on public.group_profiles for insert to authenticated
with
    check (public.user_has_group_role (group_id, 'owner'));

create policy "update: group owner" on public.group_profiles
for update
    to authenticated using (
        deleted_at is null
        and public.user_has_group_role (group_id, 'owner')
    )
with
    check (public.user_has_group_role (group_id, 'owner'));

create policy "delete: group owners or users" on public.group_profiles for delete to authenticated using (
    -- owners may delete other profiles (but not themselves)
    (
        public.user_has_group_role (group_id, 'owner')
        and profile_id<>public.get_user_profile_id ()
    )
    -- non-owners (regular members) may delete their own membership, owners are excluded by the first clause
    or (
        profile_id=public.get_user_profile_id ()
        and not public.user_has_group_role (group_id, 'owner')
    )
);