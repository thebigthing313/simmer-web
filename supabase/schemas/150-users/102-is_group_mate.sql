create or replace function public.is_group_mate(p_id uuid, p_type text)
returns boolean
language sql
security definer
set search_path = ''
as $$
  with current_user_id as (
    select auth.uid() as user_id
  ),
  target_user_id as (
    select case
      when p_type = 'user' then p_id
      when p_type = 'profile' then (select user_id from public.profiles where id = p_id)
      else null
    end as user_id
  )
  select
    (
      exists (
        select 1
        from public.profiles dp
        join public.group_users gu on dp.group_id = gu.group_id
        join current_user_id cui on gu.user_id = cui.user_id
        where dp.id = p_id and dp.user_id is null and dp.group_id is not null
      )
    )
    or
    (
      exists (
        select 1
        from public.group_users gu1
        join public.group_users gu2
          on gu1.group_id = gu2.group_id
        join current_user_id cui on gu1.user_id = cui.user_id
        join target_user_id tui on gu2.user_id = tui.user_id
        where gu1.user_id != gu2.user_id
      )
    );
$$;