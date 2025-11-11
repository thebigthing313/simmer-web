alter table public.groups enable row level security;

create policy "select: own groups or invites"
on public.groups
for select
to authenticated
using (
    created_by=(select auth.uid ())
    or
    public.user_is_group_member (id)
    or exists (
        select 1
        from public.group_invites gi
        where
            gi.group_id=groups.id
            and
            gi.user_email=(select auth.email ())
            and
            gi.is_accepted=false
            and
            gi.expiration_date>now()
    )
);

create policy "insert: own"
on public.groups
for insert
to authenticated
with check (created_by=(select auth.uid ()));

create policy "update: group owner"
on public.groups
for update
to authenticated
using (public.user_has_group_role (id, 'owner'))
with check (public.user_has_group_role (id, 'owner'));

create policy "delete: owners"
on public.groups
for delete
to authenticated
using (public.user_has_group_role (id, 'owner'));