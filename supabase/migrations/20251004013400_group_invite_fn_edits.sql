set check_function_bodies = off;

CREATE OR REPLACE FUNCTION simmer.account_creation_profile_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION simmer.handle_group_invite_accept()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
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
$function$
;


