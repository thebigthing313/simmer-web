create or replace function public.user_is_group_member (group_id uuid) returns boolean language sql
set
  search_path='' security invoker immutable as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' -> 'groups')
    @> jsonb_build_array(jsonb_build_object('group_id', group_id::text)),
    false
  );
$$;

create or replace function public.user_has_group_role (group_id uuid, group_role text) returns boolean language sql
set
  search_path='' security invoker immutable as $$
  select coalesce(
    exists (
      select 1
      from jsonb_array_elements(auth.jwt() -> 'app_metadata' -> 'groups') as group_obj
      where group_obj ->> 'group_id' = group_id::text
        and group_obj ->> 'role' = group_role
    ),
    false
  );
$$;

create or replace function public.get_user_profile_id () returns uuid language sql
set
  search_path='' security invoker immutable as $$
  select (auth.jwt() -> 'app_metadata' ->> 'profile_id')::uuid;
$$;