create table lookup_states_us (
    id uuid primary key default gen_random_uuid(),
    state_name text not null unique,
    abbreviation text not null unique,
    created_at timestamp with time zone default now() not null
);

create policy "select: anyone"
on lookup_states_us
for select
to public
using (true);

create policy "insert: none"
on lookup_states_us
for insert
to public
with check (false);

create policy "update: none"
on lookup_states_us
for update
to public
using (false)
with check (false);

create policy "delete: none"
on lookup_states_us
for delete
to public
using (false);