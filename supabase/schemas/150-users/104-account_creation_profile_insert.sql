create or replace function simmer.account_creation_profile_insert()
returns trigger
language plpgsql
set search_path = ''
security definer
as $$
declare
    v_first text;
    v_last text;
begin
    if new.raw_user_meta_data is null then
        raise exception 'account_creation_profile_insert: missing raw_user_meta_data for user %', new.id;
    end if;

    v_first := new.raw_user_meta_data ->> 'first_name';
    v_last := new.raw_user_meta_data ->> 'last_name';

    if v_first is null or v_last is null or length(trim(both from v_first)) = 0 or length(trim(both from v_last)) = 0 then
        raise exception 'account_creation_profile_insert: first_name or last_name missing for user %', new.id;
    end if;

    insert into public.profiles (first_name, last_name, user_id)
    values (v_first, v_last, new.id);

    return new;
end;
$$;

create trigger account_creation_profile_insert_trigger
after insert on auth.users
for each row
execute procedure simmer.account_creation_profile_insert();
