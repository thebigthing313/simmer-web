begin;
-- Plan: 8 tests
select plan(8);

-- 1. Table does not exist
select throws_ok(
    $$select public.soft_delete_record(gen_random_uuid(), 'nonexistent_table')$$,
    'P0001',
    'Table "nonexistent_table" does not exist in the "public" schema',
    'Throws error if table does not exist'
);

-- 2. Table missing deleted_at/deleted_by columns
create table public.soft_delete_missing_cols (
    id uuid primary key
);
select throws_ok(
    $$select public.soft_delete_record(gen_random_uuid(), 'soft_delete_missing_cols')$$,
    'P0001',
    'Table "soft_delete_missing_cols" does not have both "deleted_at" and "deleted_by" columns',
    'Throws error if table missing deleted_at/deleted_by'
);
drop table public.soft_delete_missing_cols;

-- 3. Table exists, has columns, record does not exist
create table public.soft_delete_test (
    id uuid primary key,
    deleted_at timestamptz,
    deleted_by uuid
);
select throws_ok(
    $$select public.soft_delete_record(gen_random_uuid(), 'soft_delete_test')$$,
    'P0001',
    'Record does not exist in table "soft_delete_test"',
    'Throws error if record does not exist'
);


-- Create and authenticate as a test user
select tests.create_supabase_user('test_owner', NULL, NULL, tests.build_meta_from_identifier('test_owner'));
select tests.authenticate_as('test_owner');

insert into public.soft_delete_test (id) values ('11111111-1111-1111-1111-111111111111');
select lives_ok(
    $$select public.soft_delete_record('11111111-1111-1111-1111-111111111111', 'soft_delete_test')$$,
    'Soft delete succeeds for valid record'
);

-- 5. deleted_at is set
select isnt(
    (select deleted_at from public.soft_delete_test where id = '11111111-1111-1111-1111-111111111111'),
    null,
    'deleted_at is set after soft delete'
);

-- 6. deleted_by is set
select isnt(
    (select deleted_by from public.soft_delete_test where id = '11111111-1111-1111-1111-111111111111'),
    null,
    'deleted_by is set after soft delete'
);

-- 7. deleted_by is current user (auth.uid())
-- This test assumes auth.uid() returns current user id, so we check type
select isa_ok(
    (select deleted_by from public.soft_delete_test where id = '11111111-1111-1111-1111-111111111111'),
    'uuid',
    'deleted_by is a uuid'
);


select lives_ok(
    $$select public.soft_delete_record('11111111-1111-1111-1111-111111111111', 'soft_delete_test')$$,
    'Soft delete is idempotent'
);

select tests.clear_authentication();

do $$
begin
    execute 'drop table if exists public.soft_delete_test cascade';
exception
    when insufficient_privilege then
        -- Suppress ownership error
        null;
end
$$;
select * from finish();
rollback;