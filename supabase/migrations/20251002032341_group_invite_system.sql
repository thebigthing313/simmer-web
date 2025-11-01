create table "public"."group_invites" (
    "id" uuid not null default gen_random_uuid(),
    "group_id" uuid not null,
    "user_id" uuid not null,
    "role" group_role not null,
    "expiration_date" timestamp with time zone,
    "is_accepted" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid
);


alter table "public"."group_invites" enable row level security;

CREATE UNIQUE INDEX group_invites_group_id_user_id_idx ON public.group_invites USING btree (group_id, user_id);

CREATE UNIQUE INDEX group_invites_pkey ON public.group_invites USING btree (id);

alter table "public"."group_invites" add constraint "group_invites_pkey" PRIMARY KEY using index "group_invites_pkey";

alter table "public"."group_invites" add constraint "group_invites_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invites" validate constraint "group_invites_created_by_fkey";

alter table "public"."group_invites" add constraint "group_invites_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_invites" validate constraint "group_invites_group_id_fkey";

alter table "public"."group_invites" add constraint "group_invites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."group_invites" validate constraint "group_invites_user_id_fkey";

grant delete on table "public"."group_invites" to "anon";

grant insert on table "public"."group_invites" to "anon";

grant references on table "public"."group_invites" to "anon";

grant select on table "public"."group_invites" to "anon";

grant trigger on table "public"."group_invites" to "anon";

grant truncate on table "public"."group_invites" to "anon";

grant update on table "public"."group_invites" to "anon";

grant delete on table "public"."group_invites" to "authenticated";

grant insert on table "public"."group_invites" to "authenticated";

grant references on table "public"."group_invites" to "authenticated";

grant select on table "public"."group_invites" to "authenticated";

grant trigger on table "public"."group_invites" to "authenticated";

grant truncate on table "public"."group_invites" to "authenticated";

grant update on table "public"."group_invites" to "authenticated";

grant delete on table "public"."group_invites" to "service_role";

grant insert on table "public"."group_invites" to "service_role";

grant references on table "public"."group_invites" to "service_role";

grant select on table "public"."group_invites" to "service_role";

grant trigger on table "public"."group_invites" to "service_role";

grant truncate on table "public"."group_invites" to "service_role";

grant update on table "public"."group_invites" to "service_role";

create policy "delete: group owners"
on "public"."group_invites"
as permissive
for delete
to authenticated
using ((user_has_group_role(group_id, 'owner'::text) OR (user_id = ( SELECT auth.uid() AS uid))));


create policy "insert: group owners"
on "public"."group_invites"
as permissive
for insert
to authenticated
with check (user_has_group_role(group_id, 'owner'::text));


create policy "select: self or group owners"
on "public"."group_invites"
as permissive
for select
to authenticated
using (((user_id = ( SELECT auth.uid() AS uid)) OR user_has_group_role(group_id, 'owner'::text)));


create policy "update: group owners or invitee"
on "public"."group_invites"
as permissive
for update
to authenticated
using ((user_has_group_role(group_id, 'owner'::text) OR (user_id = ( SELECT auth.uid() AS uid))))
with check (((is_accepted IS NOT TRUE) OR (user_id = ( SELECT auth.uid() AS uid))));



set check_function_bodies = off;

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



CREATE TRIGGER handle_created_trigger BEFORE INSERT ON public.group_invites FOR EACH ROW EXECUTE FUNCTION set_created_by();

CREATE TRIGGER handle_group_invite_accept AFTER UPDATE ON public.group_invites FOR EACH ROW WHEN (((old.is_accepted IS DISTINCT FROM new.is_accepted) AND (new.is_accepted = true))) EXECUTE FUNCTION simmer.handle_group_invite_accept();
