alter type "public"."unit_system" rename to "unit_system__old_version_to_be_dropped";

create type "public"."unit_system" as enum ('si', 'imperial', 'us_customary');

alter table "public"."lookup_units" alter column unit_system type "public"."unit_system" using unit_system::text::"public"."unit_system";

drop type "public"."unit_system__old_version_to_be_dropped";

alter table "public"."lookup_states_us" enable row level security;

alter table "public"."lookup_units" enable row level security;


