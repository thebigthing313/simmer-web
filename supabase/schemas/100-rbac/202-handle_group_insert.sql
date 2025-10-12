create or replace function simmer.create_group_with_owner()
    returns trigger
    language plpgsql
    security definer
    set search_path = ''
    as $function$
        begin
            if new.created_by is not null then
                insert into public.group_users (group_id, user_id, role)
                    values (new.id, new.created_by, 'owner');
            end if;
            return null;
        end;
    $function$;

create trigger handle_group_create_owner
    after insert on public.groups
    for each row execute function simmer.create_group_with_owner();