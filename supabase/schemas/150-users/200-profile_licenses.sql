create table if not exists public.profile_licenses (
    "id" uuid not null default gen_random_uuid() primary key,
    "profile_id" uuid not null references public.profiles(id) on delete restrict,
    "issuing_agency" text not null,
    "license_number" text not null,
    "license_type" text,
    "issue_date" date,
    "expiry_date" date,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid references auth.users(id) on delete restrict,
    "updated_at" timestamp with time zone,
    "updated_by" uuid references auth.users(id) on delete restrict,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid references auth.users(id) on delete restrict,
    constraint expiry_date_after_issue_date
        check (expiry_date is null or issue_date is null or expiry_date > issue_date)
);

create trigger handle_created_trigger
    before insert on public.profile_licenses
    for each row execute function public.set_created_by();

create trigger handle_updated_trigger
    before update on public.profile_licenses
    for each row
    when (old.* is distinct from new.*)
    execute function public.set_updated_record_fields();
