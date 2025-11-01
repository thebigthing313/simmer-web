drop trigger if exists "handle_created_trigger" on "public"."group_invites";

drop trigger if exists "handle_created_trigger" on "public"."group_profiles";

drop trigger if exists "created_by_trigger" on "public"."groups";

drop trigger if exists "handle_created_trigger" on "public"."profiles";

drop trigger if exists "handle_created_trigger" on "public"."regions";

drop trigger if exists "handle_created_trigger" on "public"."user_settings";

drop function if exists "public"."set_created_by" ();

set
    check_function_bodies=off;

create or replace function simmer.set_created_by () RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER
set
    search_path to '' as $function$
begin

    if TG_OP = 'INSERT' then
        new.created_by = auth.uid();
    end if;
    return new;
end;
$function$;

create trigger handle_created_trigger BEFORE INSERT on public.group_invites for EACH row
execute FUNCTION simmer.set_created_by ();

create trigger handle_created_trigger BEFORE INSERT on public.group_profiles for EACH row
execute FUNCTION simmer.set_created_by ();

create trigger created_by_trigger BEFORE INSERT on public.groups for EACH row
execute FUNCTION simmer.set_created_by ();

create trigger handle_created_trigger BEFORE INSERT on public.profiles for EACH row
execute FUNCTION simmer.set_created_by ();

create trigger handle_created_trigger BEFORE INSERT on public.regions for EACH row
execute FUNCTION simmer.set_created_by ();

create trigger handle_created_trigger BEFORE INSERT on public.user_settings for EACH row
execute FUNCTION simmer.set_created_by ();