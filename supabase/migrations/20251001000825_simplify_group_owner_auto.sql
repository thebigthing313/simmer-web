set check_function_bodies = off;

CREATE OR REPLACE FUNCTION simmer.create_group_with_owner()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
        declare
            auth_uid uuid = auth.uid();
        begin
            if auth_uid is not null then
                insert into public.group_users (group_id, user_id, role)
                    values (new.id, auth_uid, 'owner');
            end if;
            return null;
        end;
    $function$
;


