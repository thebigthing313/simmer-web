create type public.group_role as enum(
    'owner',
    'admin',
    'manager',
    'collector',
    'member'
);

create table public.group_profiles (
    id uuid not null default gen_random_uuid() primary key,
    group_id uuid not null references public.groups (id) on delete restrict,
    profile_id uuid not null references public.profiles (id) on delete restrict,
    role public.group_role not null,
    created_at timestamp with time zone not null default now(),
    created_by uuid references auth.users (id) on delete set null,
    updated_at timestamp with time zone,
    updated_by uuid references auth.users (id) on delete set null,
    is_active boolean not null default true,
    unique (group_id, profile_id, role)
);

create trigger handle_created_trigger before insert on public.group_profiles for each row
execute function simmer.set_created_by ();

create trigger handle_updated_trigger before
update on public.group_profiles for each row when (old.* is distinct from new.*)
execute function public.set_updated_record_fields ();

create or replace function simmer.group_role_to_app_metadata () returns trigger language plpgsql security definer
set
    search_path='' as $$
    declare
        v_app_meta jsonb;
        v_groups jsonb;
        v_group_obj jsonb;
        v_user_id uuid;
        v_profile_id uuid;
        v_group_id text;
        v_role text;
    begin
        -- Use NEW for insert/update, OLD for delete
        if TG_OP = 'DELETE' then
            v_profile_id := OLD.profile_id;
            v_group_id := OLD.group_id::text;
            v_role := OLD.role::text;
        else
            v_profile_id := NEW.profile_id;
            v_group_id := NEW.group_id::text;
            v_role := NEW.role::text;
        end if;

        -- Resolve profile -> user mapping
        select user_id
        into v_user_id
        from public.profiles
        where id = v_profile_id;

        -- If there's no linked auth.user, nothing to do
        if v_user_id is null then
            if TG_OP = 'DELETE' then
                return OLD;
            else
                return NEW;
            end if;
        end if;

        -- Fetch current raw_app_meta_data or default to '{}'
        select coalesce(raw_app_meta_data, '{}'::jsonb)
        into v_app_meta
        from auth.users
        where id = v_user_id;

        -- Extract or initialize the groups array
        v_groups := coalesce(v_app_meta->'groups', '[]'::jsonb);

        -- Remove any existing entry for this group_id
        v_groups := (
            select jsonb_agg(elem)
            from jsonb_array_elements(v_groups) elem
            where elem->>'group_id' != v_group_id
        );
        if v_groups is null then
            v_groups := '[]'::jsonb;
        end if;

        -- Only add the new group object for insert/update
        if TG_OP != 'DELETE' then
            v_group_obj := jsonb_build_object(
                'group_id', v_group_id,
                'role', v_role
            );
            v_groups := v_groups || v_group_obj;
        end if;

        -- Update the groups array in app_meta
        v_app_meta := jsonb_set(v_app_meta, '{groups}', v_groups, true);

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

create trigger group_role_to_app_metadata_trigger
after insert
or
update
or delete on public.group_profiles for each row
execute function simmer.group_role_to_app_metadata ();

create trigger soft_delete_trigger
before delete on public.group_profiles
for each row
execute function simmer.soft_delete();