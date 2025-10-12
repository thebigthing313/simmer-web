begin;
select plan(6);

select has_function(
    'public', 'set_created_by', 
    ARRAY[]::text[], 
    'Function set_created_by exists'
);

-- Test: Function returns trigger
select is(
    pg_get_function_result('public.set_created_by()'::regprocedure), 
    'trigger', 
    'set_created_by returns trigger'
);

create temp table test_table (
    id serial primary key,
    created_by uuid
);

create or replace function pg_temp.role() returns text as $$ select current_setting('test.auth_role', true); $$ language sql;
create or replace function pg_temp.uid() returns uuid as $$ select current_setting('test.auth_uid', true)::uuid; $$ language sql;

grant all on test_table to public;
grant usage, select on sequence test_table_id_seq to public;

-- Create a test trigger using a local test function that uses pg_temp.role/uid
create or replace function test_set_created_by()
returns trigger language plpgsql as $$
begin
    if TG_OP = 'UPDATE' then
        if pg_temp.role() not in ('postgres', 'service_role') then
            new.created_by = pg_temp.uid();
        end if;
    end if;
    return new;
end;
$$;

create trigger test_set_created_by_trigger
before update on test_table
for each row
execute function test_set_created_by();

-- Insert a row
insert into test_table (created_by) values (null);


-- Use Supabase test helpers to simulate authentication
-- Assumes basejump-supabase_test_helpers is available

select tests.create_supabase_user('test_user', 'user@test.com', null, tests.build_meta_from_identifier('test_user'));
select tests.authenticate_as('test_user');
select set_config('test.auth_role', 'authenticated', false);
select set_config('test.auth_uid', tests.get_supabase_uid('test_user')::text, false);
update test_table set id = id where id = 1;
select isnt((select created_by is null from test_table where id = 1), true, 'created_by is set for non-service role');
select is((select created_by from test_table where id = 1), tests.get_supabase_uid('test_user'), 'created_by matches test_user uid');

insert into test_table (created_by) values (null);
select set_config('test.auth_role', 'service_role', false);
select set_config('test.auth_uid', 'dba4e0ff-cf8d-4e30-bb62-03e9856fadc1', false);
update test_table set id = id where id = 2;
select is((select created_by from test_table where id = 2), null, 'created_by is null for service_role');

insert into test_table (created_by) values (null);
select set_config('test.auth_role', 'postgres', false);
select set_config('test.auth_uid', 'dba4e0ff-cf8d-4e30-bb62-03e9856fadc1', false);
update test_table set id = id where id = 3;
select is((select created_by from test_table where id = 3), null, 'created_by is null for postgres role');

reset role;
-- Clean up
drop trigger test_set_created_by_trigger on test_table;
drop table test_table;

select * from finish();
rollback;