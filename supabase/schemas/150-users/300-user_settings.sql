create type public.setting_names as enum('user_default_group_id');

create table public.user_settings (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    setting_name public.setting_names not null,
    setting_value text,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid references auth.users (id) on delete restrict,
    "updated_at" timestamp with time zone,
    "updated_by" uuid references auth.users (id) on delete restrict,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid references auth.users (id) on delete restrict
);

create trigger handle_created_trigger before insert on public.user_settings for each row
execute function simmer.set_created_by ();

create trigger handle_updated_trigger before
update on public.user_settings for each row when (old.* is distinct from new.*)
execute function public.set_updated_record_fields ();

create or replace function simmer.default_group_to_app_metadata () returns trigger language plpgsql security definer
set
    search_path='' as $$
    declare
        v_app_meta jsonb;
        v_user_id uuid;
        v_default_group text;
    begin
        -- Use NEW for insert/update, OLD for delete
        if TG_OP = 'DELETE' then
            v_user_id := OLD.user_id;
            if OLD.setting_name = 'user_default_group_id' then
                v_default_group := null;
            else
                return OLD;
            end if;
        else
            v_user_id := NEW.user_id;
            if NEW.setting_name = 'user_default_group_id' then
                v_default_group := NEW.setting_value;
            else
                return NEW;
            end if;
        end if;

        -- Fetch current raw_app_meta_data or default to '{}'
        select coalesce(raw_app_meta_data, '{}'::jsonb)
        into v_app_meta
        from auth.users
        where id = v_user_id;

        -- Set or remove the default_group field
        if TG_OP = 'DELETE' or v_default_group is null then
            v_app_meta := v_app_meta - 'default_group';
        else
            v_app_meta := jsonb_set(v_app_meta, '{default_group}', to_jsonb(v_default_group), true);
        end if;

        -- Write back to auth.users
        update auth.users
        set raw_app_meta_data = v_app_meta
        where id = v_user_id;

        if TG_OP = 'DELETE' then
            return OLD;
        else
            return NEW;
        end if;
    end;
$$;

create trigger default_group_to_app_metadata_trigger
after insert
or
update
or delete on public.user_settings for each row
execute function simmer.default_group_to_app_metadata ();