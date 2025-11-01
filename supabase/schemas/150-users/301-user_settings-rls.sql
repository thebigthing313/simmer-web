alter table public.user_settings enable row level security;

create policy "select: view own settings" on public.user_settings for
select
    to authenticated using (
        deleted_at is null
        and (
            select
                auth.uid ()
        )=user_id
    );

create policy "insert: create own settings" on public.user_settings for insert to authenticated
with
    check (
        (
            select
                auth.uid ()
        )=user_id
    );

create policy "update: own settings" on public.user_settings
for update
    to authenticated using (
        deleted_at is null
        and (
            (
                select
                    auth.uid ()
            )=user_id
        )
    )
with
    check (
        (
            select
                auth.uid ()
        )=user_id
    );

create policy "delete: none" on public.user_settings for delete to authenticated using (false);