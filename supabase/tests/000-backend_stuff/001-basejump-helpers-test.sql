begin;

-- Plan for 4 tests in this file
select plan (4);

-- Create a new Supabase user for testing
-- Create a new Supabase user for testing
select tests.create_supabase_user('test_user', 'test_user@example.com', '1234567890', tests.build_meta_from_identifier('test_user'));

-- Ensure a deterministic profile exists for assertions. Use an upsert so repeated test runs
-- don't fail due to the unique constraint on user_id created by triggers/helpers.
INSERT INTO public.profiles (id, user_id, first_name, last_name)
VALUES (
    '6f7d9962-b6e8-4239-add4-912fec77e2c5',
    tests.get_supabase_uid('test_user'),
    'Test',
    'User'
)
ON CONFLICT (user_id) DO UPDATE SET
    id = EXCLUDED.id,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name;

-- Authenticate as the test user
select tests.authenticate_as('test_user');

-- Test: User was created and can be authenticated
select is(
    auth.uid(),
    tests.get_supabase_uid('test_user'),
    'User was created successfully and can be authenticated.'
);

-- Test: User profile_id is set correctly in app_metadata
select is (
    auth.jwt() -> 'app_metadata' ->> 'profile_id',
    '6f7d9962-b6e8-4239-add4-912fec77e2c5',
    'User profile_id was set correctly into app_metadata.'
);

-- Create a group and assign the test user as owner
insert into public.groups (id, group_name, address, phone, created_by)
values ('d4e8f8c3-3c5b-4f4e-9f7a-1c2e5f6a7b8c', 'Test Group', '123 Test St', '123-456-7890', auth.uid());

-- Clear authentication and re-authenticate as the test user
select tests.clear_authentication();
select tests.authenticate_as('test_user');

-- Test: First group_id in app_metadata.groups matches the created group
select is(
    (auth.jwt() -> 'app_metadata' -> 'groups' -> 0 ->> 'group_id'),
    'd4e8f8c3-3c5b-4f4e-9f7a-1c2e5f6a7b8c',
    'First group_id in app_metadata.groups matches the created group.'
);

-- Test: First group role in app_metadata.groups is owner
select is(
    (auth.jwt() -> 'app_metadata' -> 'groups' -> 0 ->> 'role'),
    'owner',
    'First group role in app_metadata.groups is owner.'
);

-- Finish tests and rollback changes
select * from finish();
rollback;