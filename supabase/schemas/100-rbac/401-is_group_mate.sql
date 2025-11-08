create or replace function public.is_group_mate (p_id uuid, p_type text) returns boolean language sql security definer
set
  search_path='' as $$
  with current_user_id as (
    select auth.uid() as user_id
  ),
  target_user_id as (
    select case
      when p_type = 'user' then p_id
      when p_type = 'profile' then (select user_id from public.profiles where id = p_id)
      else null
    end as user_id
  ),
  my_profile as (
    select id as profile_id from public.profiles where user_id = (select user_id from current_user_id)
  ),
  target_profile as (
    select id as profile_id from public.profiles where user_id = (select user_id from target_user_id)
  )
  select
    (
      -- Case: the provided p_id is a profile id that is an "orphan" (no user) but belongs to a group.
      -- Check whether the current user's profile shares any group with that profile.
      exists (
        select 1
        from public.profiles dp
        join public.group_profiles gp_dp on gp_dp.profile_id = dp.id
        join my_profile mp on true
        join public.group_profiles gp_mp on gp_mp.profile_id = mp.profile_id and gp_mp.group_id = gp_dp.group_id
        where dp.id = p_id and dp.user_id is null
      )
    )
    or
    (
      -- General case: check whether the current user's profile and the target user's/profile's profile
      -- share any group via group_profiles.
      exists (
        select 1
        from public.group_profiles gp1
        join public.group_profiles gp2 on gp1.group_id = gp2.group_id
        join my_profile mp on gp1.profile_id = mp.profile_id
        join target_profile tp on gp2.profile_id = tp.profile_id
        where gp1.profile_id != gp2.profile_id
      )
    );
$$;