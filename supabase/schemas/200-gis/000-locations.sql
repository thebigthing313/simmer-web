create table public.locations (
    id uuid primary key default gen_random_uuid(),
    group_id uuid references groups(id) not null,
    location_name text not null,
    address text,
    geom geometry(Point, 4326) not null,
    notes text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    created_by uuid references auth.users (id) on delete set null,
    updated_by uuid references auth.users (id) on delete set null
);

create trigger handle_created_trigger before insert on public.locations for each row
execute function simmer.set_created_by ();

create trigger handle_updated_trigger before
update on public.locations for each row when (old.* is distinct from new.*)
execute function public.set_updated_record_fields ();

create trigger soft_delete_trigger
before delete on public.locations
for each row
execute function simmer.soft_delete();