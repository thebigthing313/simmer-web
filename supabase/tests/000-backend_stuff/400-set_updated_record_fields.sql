begin;
select plan(6);

-- Setup: create a temp table to test the trigger
create temp table test_table (
    id serial primary key,
    updated_at timestamptz,
    updated_by uuid
);

-- Create a mock auth function for testing
create or replace function pg_temp.role() returns text as $$
    select current_setting('test.auth_role', true);
$$ language sql;

create or replace function pg_temp.uid() returns uuid as $$
    select current_setting('test.auth_uid', true)::uuid;
$$ language sql;

-- Attach the trigger to the temp table
create or replace function test_set_updated_record_fields()
returns trigger language plpgsql as $$
begin
    if TG_OP = 'UPDATE' then
        if pg_temp.role() not in ('postgres', 'service_role') then
            new.updated_at = now();
            new.updated_by = pg_temp.uid();
        end if;
    end if;
    return new;
end;
$$;

create trigger test_set_updated_record_fields_trg
before update on test_table
for each row execute function test_set_updated_record_fields();

-- Insert a row
insert into test_table default values;

-- Test: role is not 'postgres' or 'service_role', updated_at and updated_by should be set
select set_config('test.auth_role', 'authenticated', false);
select set_config('test.auth_uid', '11111111-1111-1111-1111-111111111111', false);
update test_table set id = id where id = 1;
select isnt((select updated_at is null from test_table where id = 1), true, 'updated_at is set for non-service role');
select is((select updated_by from test_table where id = 1), '11111111-1111-1111-1111-111111111111'::uuid, 'updated_by is set for non-service role');

-- Test: role is 'postgres', updated_at and updated_by should not be set
insert into test_table default values;
select set_config('test.auth_role', 'postgres', false);
select set_config('test.auth_uid', '22222222-2222-2222-2222-222222222222', false);
update test_table set id = id where id = 2;
select is((select updated_at from test_table where id = 2), null, 'updated_at not set for postgres role');
select is((select updated_by from test_table where id = 2), null, 'updated_by not set for postgres role');

-- Test: role is 'service_role', updated_at and updated_by should not be set
insert into test_table default values;
select set_config('test.auth_role', 'service_role', false);
select set_config('test.auth_uid', '33333333-3333-3333-3333-333333333333', false);
update test_table set id = id where id = 3;
select is((select updated_at from test_table where id = 3), null, 'updated_at not set for service_role');
select is((select updated_by from test_table where id = 3), null, 'updated_by not set for service_role');

select * from finish();
rollback;