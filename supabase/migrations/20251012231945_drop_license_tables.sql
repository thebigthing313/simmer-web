drop trigger if exists "handle_created_trigger" on "public"."profile_licenses";

drop trigger if exists "handle_updated_trigger" on "public"."profile_licenses";

drop policy "delete: none" on "public"."profile_licenses";

drop policy "insert: own, or group admin for group dummy profiles" on "public"."profile_licenses";

drop policy "select: own and groupmates" on "public"."profile_licenses";

drop policy "update: own, or group admin for groupmates" on "public"."profile_licenses";

revoke delete on table "public"."profile_licenses" from "anon";

revoke insert on table "public"."profile_licenses" from "anon";

revoke references on table "public"."profile_licenses" from "anon";

revoke select on table "public"."profile_licenses" from "anon";

revoke trigger on table "public"."profile_licenses" from "anon";

revoke truncate on table "public"."profile_licenses" from "anon";

revoke update on table "public"."profile_licenses" from "anon";

revoke delete on table "public"."profile_licenses" from "authenticated";

revoke insert on table "public"."profile_licenses" from "authenticated";

revoke references on table "public"."profile_licenses" from "authenticated";

revoke select on table "public"."profile_licenses" from "authenticated";

revoke trigger on table "public"."profile_licenses" from "authenticated";

revoke truncate on table "public"."profile_licenses" from "authenticated";

revoke update on table "public"."profile_licenses" from "authenticated";

revoke delete on table "public"."profile_licenses" from "service_role";

revoke insert on table "public"."profile_licenses" from "service_role";

revoke references on table "public"."profile_licenses" from "service_role";

revoke select on table "public"."profile_licenses" from "service_role";

revoke trigger on table "public"."profile_licenses" from "service_role";

revoke truncate on table "public"."profile_licenses" from "service_role";

revoke update on table "public"."profile_licenses" from "service_role";

alter table "public"."profile_licenses" drop constraint "expiry_date_after_issue_date";

alter table "public"."profile_licenses" drop constraint "profile_licenses_created_by_fkey";

alter table "public"."profile_licenses" drop constraint "profile_licenses_deleted_by_fkey";

alter table "public"."profile_licenses" drop constraint "profile_licenses_profile_id_fkey";

alter table "public"."profile_licenses" drop constraint "profile_licenses_updated_by_fkey";

alter table "public"."profile_licenses" drop constraint "profile_licenses_pkey";

drop index if exists "public"."profile_licenses_pkey";

drop table "public"."profile_licenses";


