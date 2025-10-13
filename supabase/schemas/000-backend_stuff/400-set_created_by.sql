create or replace function public.set_created_by () returns trigger language plpgsql
set
    search_path = '' security invoker as $$
begin

    if TG_OP = 'UPDATE' then
        new.created_by = auth.uid();
    end if;

    return new;
end;
$$;