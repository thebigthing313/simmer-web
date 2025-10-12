create table public.group_invites (
    "id" uuid not null default gen_random_uuid() primary key,
    "group_id" uuid not null references public.groups(id) on delete cascade,
    "user_id" uuid not null references auth.users(id) on delete cascade,
    "role" public.group_role not null,
    "expiration_date" timestamp with time zone,
    "is_accepted" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid references auth.users(id) on delete restrict
);

-- prevent multiple invites for the same user in the same group
create unique index on public.group_invites (group_id, user_id);

create trigger handle_created_trigger
    before insert on public.group_invites
    for each row execute function public.set_created_by();

create or replace function simmer.handle_group_invite_accept()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    -- Only act when an invite flips to accepted
    if TG_OP = 'UPDATE' then
        if NEW.is_accepted and (OLD.is_accepted is distinct from NEW.is_accepted) then
            -- Insert the membership iff it doesn't already exist
            insert into public.group_users (group_id, user_id, role)
            select NEW.group_id, NEW.user_id, NEW.role
            where not exists (
                select 1 from public.group_users
                where group_id = NEW.group_id and user_id = NEW.user_id
            );
        end if;
    end if;

    return NEW;
end;
$$;

create trigger handle_group_invite_accept
    after update on public.group_invites
    for each row
    when (old.is_accepted is distinct from new.is_accepted and new.is_accepted = true)
    execute function simmer.handle_group_invite_accept();