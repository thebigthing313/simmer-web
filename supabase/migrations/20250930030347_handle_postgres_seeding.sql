set check_function_bodies = off;

CREATE OR REPLACE FUNCTION simmer.create_group_with_owner()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
        declare
            auth_role text = auth.role();
            auth_uid uuid = auth.uid();
        begin
            if coalesce(auth_role, '') in ('', 'postgres', 'service_role', 'authenticated') then
                if auth_uid is not null then
                    insert into public.group_users (group_id, user_id, role)
                        values (new.id, auth_uid, 'owner');
                end if;
                return null;
            elsif auth_role = 'anon' then
                raise exception 'Unauthorized' using hint = 'Anonymous role. You must authenticate.';
            else
                raise exception 'Unauthorized' using hint = format('Unexpected role: %s', auth_role);
            end if;
            return null;
        end;
    $function$
;


