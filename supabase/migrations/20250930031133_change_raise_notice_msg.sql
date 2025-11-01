set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.soft_delete_record(p_record_id uuid, p_table_name text)
 RETURNS void
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
    declare
        v_table_exists boolean;
        v_has_deleted_columns boolean;
        v_record_exists boolean;
    begin
        -- Step 1: Verify the table exists
        select exists (
            select 1
            from information_schema.tables
            where table_schema = 'public' and table_name = p_table_name
        ) into v_table_exists;

        if not v_table_exists then
            raise exception 'Table "%" does not exist in the "public" schema', p_table_name;
        end if;

        -- Step 2: Verify the table has "deleted_at" and "deleted_by" columns
        select exists (
            select 1
            from information_schema.columns
            where table_schema = 'public' and table_name = p_table_name
            and column_name in ('deleted_at', 'deleted_by')
            group by table_name
            having count(*) = 2
        ) into v_has_deleted_columns;

        if not v_has_deleted_columns then
            raise exception 'Table "%" does not have both "deleted_at" and "deleted_by" columns', p_table_name;
        end if;

        -- Step 3: Verify the record exists
        execute format(
            'select exists (select 1 from public.%I where id = $1)',
            p_table_name
        ) using p_record_id into v_record_exists;

        if not v_record_exists then
            raise exception 'Record does not exist in table "%"', p_table_name;
        end if;

        -- Step 4: Perform the soft delete
        execute format(
            'update public.%I set deleted_at = now(), deleted_by = auth.uid() where id = $1',
            p_table_name
        ) using p_record_id;
    end;
$function$
;


