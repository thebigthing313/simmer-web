alter table public.user_settings enable row level security;

create policy "Users can view their own settings"
    on public.user_settings
    for select
    to authenticated
    using ((SELECT auth.uid()) = user_id);

create policy "Users can insert their own settings"
    on public.user_settings
    for insert
    to authenticated
    with check ((SELECT auth.uid()) = user_id);

create policy "Users can update their own settings"
    on public.user_settings
    for update
    to authenticated
    using ((SELECT auth.uid()) = user_id)
    with check ((SELECT auth.uid()) = user_id);

create policy "Users can delete their own settings"
    on public.user_settings
    for delete
    to authenticated
    using ((SELECT auth.uid()) = user_id);