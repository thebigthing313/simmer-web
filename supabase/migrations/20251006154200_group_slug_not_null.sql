alter table "public"."groups" alter column "short_name" set not null;

CREATE UNIQUE INDEX groups_short_name_key ON public.groups USING btree (short_name);

alter table "public"."groups" add constraint "groups_short_name_key" UNIQUE using index "groups_short_name_key";


