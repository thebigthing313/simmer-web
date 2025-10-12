begin;

-- Plan for 5 tests: group creation, RLS, update, and audit fields
select plan(5);

-- Set search_path to include test_overrides schema for testing
alter function public.set_updated_record_fields() SET search_path = test_overrides, public, pg_temp, pg_catalog;

-- Create a test user who will be the group admin
select tests.create_supabase_user('group_admin', NULL, NULL, tests.build_meta_from_identifier('group_admin'));

insert into public.groups
    (id, group_name, address, phone, created_by)
values
    ('6f7d9962-b6e8-4239-add4-912fec77e2c5', 'Group A', 'Address A', '123-456-7890', tests.get_supabase_uid('group_admin'));

-- Test 1: Ensure group_admin is automatically added as owner in group_users on group creation
select is (
    (select group_id from public.group_users where 
        group_id = '6f7d9962-b6e8-4239-add4-912fec77e2c5' and
        user_id = tests.get_supabase_uid('group_admin') and
        role = 'owner'
), '6f7d9962-b6e8-4239-add4-912fec77e2c5', 
    'group_admin is automatically added as owner in group_users on group creation'
);

-- Authenticate as group_admin for RLS tests
select tests.authenticate_as('group_admin');

-- Test 2: RLS function user_has_group_role returns true for group_admin
select is (
    (select public.user_has_group_role('6f7d9962-b6e8-4239-add4-912fec77e2c5', 'owner')),
    true,
    'RLS function user_has_group_role works for group_admin'
);

-- Freeze time to ensure audit fields are predictable
select tests.freeze_time('2024-01-01 12:00:00+00');

-- Update group name as group_admin
update public.groups
set group_name = 'Group A Updated'
where group_name = 'Group A';

-- Test 3: Group name is updated successfully by group_admin
select is(
    (select group_name from public.groups where group_name = 'Group A Updated'),
    'Group A Updated',
    'Group name updated successfully by group_admin'
);

-- Test 4: updated_at field is set to frozen time after update
select is (
    to_char((select updated_at from public.groups where group_name = 'Group A Updated'), 'YYYY-MM-DD HH24:MI:SS+00'),
    '2024-01-01 12:00:00+00',
    'updated_at is correctly set to frozen time'
);

-- Test 5: updated_by field is set to group_admin after update
select is (
    (select updated_by from public.groups where group_name = 'Group A Updated'),
    tests.get_supabase_uid('group_admin'),
    'updated_by is correctly set to group_admin'
);

select * from finish();
rollback;