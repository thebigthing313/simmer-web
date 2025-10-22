create table if not exists public.regions (
    id uuid primary key default gen_random_uuid(),
    group_id uuid references public.groups (id) on delete cascade,
    region_name text not null,
    geom geometry (MultiPolygon, 4326) not null,
    parent_id uuid references public.regions (id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    created_by uuid references auth.users (id) on delete set null,
    updated_by uuid references auth.users (id) on delete set null,
    deleted_at timestamptz,
    deleted_by uuid references auth.users (id) on delete set null,
    constraint regions_parent_check check (id<>parent_id)
);

create trigger handle_created_trigger before insert on public.regions for each row
execute function simmer.set_created_by ();

create trigger handle_updated_trigger before
update on public.regions for each row when (old.* is distinct from new.*)
execute function public.set_updated_record_fields ();