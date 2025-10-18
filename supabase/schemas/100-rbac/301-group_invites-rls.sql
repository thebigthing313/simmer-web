alter table public.group_invites enable row level security;

create policy "select: self or group owners" on public.group_invites for
select
    to authenticated using (
        deleted_at is null
        and (
            user_id=(
                select
                    auth.uid ()
            )
            or public.user_has_group_role (group_id, 'owner')
        )
    );

create policy "insert: group owners" on public.group_invites for insert to authenticated
with
    check (public.user_has_group_role (group_id, 'owner'));

-- Allow owners to update general fields, and allow the invitee to update their own invite.
-- But prevent owners from setting is_accepted = true on behalf of the invitee.
create policy "update: group owners or invitee" on public.group_invites
for update
    to authenticated using (
        deleted_at is null
        and (
            public.user_has_group_role (group_id, 'owner')
            or user_id=(
                select
                    auth.uid ()
            )
        )
    )
with
    check (
        -- permit updates where the new state is NOT accepting the invite,
        -- or the requester is the invitee (they may accept)
        (is_accepted is not true)
        or (
            user_id=(
                select
                    auth.uid ()
            )
        )
    );

create policy "delete: none" on public.group_invites for delete to authenticated using (false);
