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
    -- If there is no metadata, just skip creating a profile and return.
    if new.raw_user_meta_data is null then
        return new;
    end if;

    v_first := new.raw_user_meta_data ->> 'first_name';
    v_last := new.raw_user_meta_data ->> 'last_name';

    -- If either first or last name is missing/empty, skip inserting a profile.
    if v_first is null or v_last is null or length(trim(both from v_first)) = 0 or length(trim(both from v_last)) = 0 then
        return new;
    end if;

    insert into public.profiles (first_name, last_name, user_id)
    values (v_first, v_last, new.id);

    return new;
end;
$function$
;


