alter table public.groups enable row level security;

create policy "select: non-deleted, unless owner of deleted group"
on public.groups
for select
to authenticated
using (
    deleted_at is null
    or public.user_has_group_role(id, 'owner')
);

create policy "update: group owner"
    on public.groups
    for update
    to authenticated
    using (
        public.user_has_group_role(id, 'owner')
    )
    with check (
        public.user_has_group_role(id, 'owner')
    );

create policy "insert: own"
    on public.groups
        for insert
        to authenticated
        with check (created_by = (SELECT auth.uid()));

create policy "Block unauthorized deletes from group users"
    on public.groups
    for delete
    to public
    using (false);