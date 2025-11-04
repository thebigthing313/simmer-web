create table if not exists public.profiles (
    "id" uuid not null default gen_random_uuid() primary key,
    "first_name" text not null,
    "last_name" text not null,
    "user_id" uuid references auth.users (id) on delete restrict,
    "avatar_url" text,
    "bio" text,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid references auth.users (id) on delete restrict,
    "updated_at" timestamp with time zone,
    "updated_by" uuid references auth.users (id) on delete restrict,
    "deleted_at" timestamp with time zone,
    "deleted_by" uuid references auth.users (id) on delete restrict,
    unique (user_id)
);

create trigger handle_created_trigger before insert on public.profiles for each row
execute function simmer.set_created_by ();

create trigger handle_updated_trigger before
update on public.profiles for each row when (old.* is distinct from new.*)
execute function public.set_updated_record_fields ();

create function simmer.profile_to_app_metadata () returns trigger language plpgsql security definer
set
    search_path='' as $$
    declare
        v_app_meta jsonb;
        v_user_id uuid;
    begin
        -- Use NEW for insert/update, OLD for delete
        if TG_OP = 'DELETE' then
            v_user_id := OLD.user_id;
        else
            v_user_id := NEW.user_id;
        end if;

        if v_user_id is not null then
            -- Get the current raw_app_meta_data, or default to '{}'
            select coalesce(raw_app_meta_data, '{}'::jsonb) into v_app_meta
            from auth.users
            where id = v_user_id;

            if TG_OP = 'DELETE' then
                -- Remove the profile_id field
                v_app_meta := v_app_meta - 'profile_id';
            else
                -- Update the profile_id field
                v_app_meta := jsonb_set(v_app_meta, '{profile_id}', to_jsonb(NEW.id::text), true);
            end if;

            -- Write new metadata into auth.users(raw_app_meta_data)
            update auth.users
            set raw_app_meta_data = v_app_meta
            where id = v_user_id;
        end if;

        if TG_OP = 'DELETE' then
            return OLD;
        else
            return NEW;
        end if;
    end;
$$;

create trigger profile_to_app_metadata_trigger
after insert
or
update
or delete on public.profiles for each row
execute function simmer.profile_to_app_metadata ();