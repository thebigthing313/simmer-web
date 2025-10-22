set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.set_created_by()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin

    if TG_OP = 'INSERT' then
        new.created_by = auth.uid();
    end if;
    return new;
end;
$function$
;


