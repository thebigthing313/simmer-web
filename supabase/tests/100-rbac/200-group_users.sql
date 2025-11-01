begin;

-- Plan: 14 tests (adjust if you add more)
SELECT plan(14);

SELECT has_type('public', 'group_role', 'group_role type exists');

SELECT has_table('public', 'group_users', 'group_users table exists');

SELECT col_type_is('public', 'group_users', 'id', 'uuid', 'id is uuid');
SELECT col_type_is('public', 'group_users', 'group_id', 'uuid', 'group_id is uuid');
SELECT col_type_is('public', 'group_users', 'user_id', 'uuid', 'user_id is uuid');
SELECT col_type_is('public', 'group_users', 'role', 'group_role', 'role is group_role');
SELECT col_type_is('public', 'group_users', 'created_at', 'timestamp with time zone', 'created_at is timestamptz');
SELECT col_type_is('public', 'group_users', 'created_by', 'uuid', 'created_by is uuid');
SELECT col_type_is('public', 'group_users', 'updated_at', 'timestamp with time zone', 'updated_at is timestamptz');
SELECT col_type_is('public', 'group_users', 'updated_by', 'uuid', 'updated_by is uuid');

SELECT col_is_unique('public', 'group_users', ARRAY['group_id', 'user_id', 'role'], 'unique constraint on group_id, user_id, role');

SELECT has_trigger('public', 'group_users', 'handle_created_trigger', 'handle_created_trigger exists');
SELECT has_trigger('public', 'group_users', 'handle_updated_trigger', 'handle_updated_trigger exists');
SELECT has_trigger('public', 'group_users', 'group_role_to_app_metadata_trigger', 'group_role_to_app_metadata_trigger exists');

SELECT * FROM finish();
rollback;