create type "public"."unit_system" as enum ('si', 'metric', 'us_customary');

create type "public"."unit_type" as enum ('weight', 'distance', 'area', 'volume', 'temperature', 'time', 'count');

create table "public"."lookup_states_us" (
    "id" uuid not null default gen_random_uuid(),
    "state_name" text not null,
    "abbreviation" text not null,
    "created_at" timestamp with time zone not null default now()
);


create table "public"."lookup_units" (
    "id" uuid not null default gen_random_uuid(),
    "unit_name" text not null,
    "abbreviation" text not null,
    "unit_type" unit_type not null,
    "unit_system" unit_system not null,
    "base_unit_id" uuid,
    "conversion_factor" numeric not null,
    "conversion_offset" numeric not null default 0.0,
    "created_at" timestamp with time zone not null default now()
);


CREATE UNIQUE INDEX lookup_states_us_abbreviation_key ON public.lookup_states_us USING btree (abbreviation);

CREATE UNIQUE INDEX lookup_states_us_pkey ON public.lookup_states_us USING btree (id);

CREATE UNIQUE INDEX lookup_states_us_state_name_key ON public.lookup_states_us USING btree (state_name);

CREATE UNIQUE INDEX lookup_units_abbreviation_key ON public.lookup_units USING btree (abbreviation);

CREATE UNIQUE INDEX lookup_units_pkey ON public.lookup_units USING btree (id);

CREATE UNIQUE INDEX lookup_units_unit_name_key ON public.lookup_units USING btree (unit_name);

alter table "public"."lookup_states_us" add constraint "lookup_states_us_pkey" PRIMARY KEY using index "lookup_states_us_pkey";

alter table "public"."lookup_units" add constraint "lookup_units_pkey" PRIMARY KEY using index "lookup_units_pkey";

alter table "public"."lookup_states_us" add constraint "lookup_states_us_abbreviation_key" UNIQUE using index "lookup_states_us_abbreviation_key";

alter table "public"."lookup_states_us" add constraint "lookup_states_us_state_name_key" UNIQUE using index "lookup_states_us_state_name_key";

alter table "public"."lookup_units" add constraint "base_unit_self_reference" CHECK ((((base_unit_id = id) AND (conversion_factor = 1.0)) OR (base_unit_id <> id))) not valid;

alter table "public"."lookup_units" validate constraint "base_unit_self_reference";

alter table "public"."lookup_units" add constraint "check_base_unit_conversion" CHECK ((((base_unit_id IS NULL) AND (conversion_factor = 1.0) AND (conversion_offset = 0.0)) OR ((base_unit_id IS NOT NULL) AND (conversion_factor <> 0.0)))) not valid;

alter table "public"."lookup_units" validate constraint "check_base_unit_conversion";

alter table "public"."lookup_units" add constraint "lookup_units_abbreviation_key" UNIQUE using index "lookup_units_abbreviation_key";

alter table "public"."lookup_units" add constraint "lookup_units_base_unit_id_fkey" FOREIGN KEY (base_unit_id) REFERENCES lookup_units(id) not valid;

alter table "public"."lookup_units" validate constraint "lookup_units_base_unit_id_fkey";

alter table "public"."lookup_units" add constraint "lookup_units_unit_name_key" UNIQUE using index "lookup_units_unit_name_key";

grant delete on table "public"."lookup_states_us" to "anon";

grant insert on table "public"."lookup_states_us" to "anon";

grant references on table "public"."lookup_states_us" to "anon";

grant select on table "public"."lookup_states_us" to "anon";

grant trigger on table "public"."lookup_states_us" to "anon";

grant truncate on table "public"."lookup_states_us" to "anon";

grant update on table "public"."lookup_states_us" to "anon";

grant delete on table "public"."lookup_states_us" to "authenticated";

grant insert on table "public"."lookup_states_us" to "authenticated";

grant references on table "public"."lookup_states_us" to "authenticated";

grant select on table "public"."lookup_states_us" to "authenticated";

grant trigger on table "public"."lookup_states_us" to "authenticated";

grant truncate on table "public"."lookup_states_us" to "authenticated";

grant update on table "public"."lookup_states_us" to "authenticated";

grant delete on table "public"."lookup_states_us" to "service_role";

grant insert on table "public"."lookup_states_us" to "service_role";

grant references on table "public"."lookup_states_us" to "service_role";

grant select on table "public"."lookup_states_us" to "service_role";

grant trigger on table "public"."lookup_states_us" to "service_role";

grant truncate on table "public"."lookup_states_us" to "service_role";

grant update on table "public"."lookup_states_us" to "service_role";

grant delete on table "public"."lookup_units" to "anon";

grant insert on table "public"."lookup_units" to "anon";

grant references on table "public"."lookup_units" to "anon";

grant select on table "public"."lookup_units" to "anon";

grant trigger on table "public"."lookup_units" to "anon";

grant truncate on table "public"."lookup_units" to "anon";

grant update on table "public"."lookup_units" to "anon";

grant delete on table "public"."lookup_units" to "authenticated";

grant insert on table "public"."lookup_units" to "authenticated";

grant references on table "public"."lookup_units" to "authenticated";

grant select on table "public"."lookup_units" to "authenticated";

grant trigger on table "public"."lookup_units" to "authenticated";

grant truncate on table "public"."lookup_units" to "authenticated";

grant update on table "public"."lookup_units" to "authenticated";

grant delete on table "public"."lookup_units" to "service_role";

grant insert on table "public"."lookup_units" to "service_role";

grant references on table "public"."lookup_units" to "service_role";

grant select on table "public"."lookup_units" to "service_role";

grant trigger on table "public"."lookup_units" to "service_role";

grant truncate on table "public"."lookup_units" to "service_role";

grant update on table "public"."lookup_units" to "service_role";

create policy "delete: none"
on "public"."lookup_states_us"
as permissive
for delete
to public
using (false);


create policy "insert: none"
on "public"."lookup_states_us"
as permissive
for insert
to public
with check (false);


create policy "select: anyone"
on "public"."lookup_states_us"
as permissive
for select
to public
using (true);


create policy "update: none"
on "public"."lookup_states_us"
as permissive
for update
to public
using (false)
with check (false);


create policy "delete: none"
on "public"."lookup_units"
as permissive
for delete
to public
using (false);


create policy "insert: none"
on "public"."lookup_units"
as permissive
for insert
to public
with check (false);


create policy "select: anyone"
on "public"."lookup_units"
as permissive
for select
to public
using (true);


create policy "update: none"
on "public"."lookup_units"
as permissive
for update
to public
using (false)
with check (false);



