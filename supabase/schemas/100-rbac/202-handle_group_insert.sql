create or replace function simmer.create_group_with_owner()
    returns trigger
    language plpgsql
    security definer
    set search_path = ''
    as $function$
        begin
            -- Resolve the creator's profile_id from JWT app_metadata
            -- public.get_user_profile_id() returns (auth.jwt() -> 'app_metadata' ->> 'profile_id')::uuid
            if public.get_user_profile_id() is not null then
                insert into public.group_profiles (group_id, profile_id, role)
                    values (new.id, public.get_user_profile_id(), 'owner');
            end if;
            return null;
        end;
    $function$;

create trigger handle_group_create_owner
    after insert on public.groups
    for each row execute function simmer.create_group_with_owner();