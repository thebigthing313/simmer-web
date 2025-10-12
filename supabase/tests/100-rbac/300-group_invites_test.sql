
begin;

select plan(16);
-- Basic schema assertions
SELECT has_table('public', 'group_invites', 'group_invites table exists');

SELECT col_type_is('public', 'group_invites', 'id', 'uuid', 'id is uuid');
SELECT col_type_is('public', 'group_invites', 'group_id', 'uuid', 'group_id is uuid');
SELECT col_type_is('public', 'group_invites', 'user_id', 'uuid', 'user_id is uuid');
SELECT col_type_is('public', 'group_invites', 'role', 'group_role', 'role is group_role');
SELECT col_type_is('public', 'group_invites', 'expiration_date', 'timestamp with time zone', 'expiration_date is timestamptz');
SELECT col_type_is('public', 'group_invites', 'is_accepted', 'boolean', 'is_accepted is boolean');
SELECT col_type_is('public', 'group_invites', 'created_at', 'timestamp with time zone', 'created_at is timestamptz');
SELECT col_type_is('public', 'group_invites', 'created_by', 'uuid', 'created_by is uuid');

-- There should be an index covering (group_id, user_id)
SELECT is_indexed('public', 'group_invites', ARRAY['group_id','user_id'], 'index on (group_id, user_id) exists');

-- Trigger and function existence
SELECT has_trigger('public', 'group_invites', 'handle_created_trigger', 'handle_created_trigger exists');
SELECT has_function('simmer', 'handle_group_invite_accept', ARRAY[]::text[], 'simmer.handle_group_invite_accept exists');
SELECT has_trigger('public', 'group_invites', 'handle_group_invite_accept', 'handle_group_invite_accept trigger exists');

-- Behaviour tests: inserting an invite, uniqueness, and accepting it creates a group_user

-- Setup test users
select tests.create_supabase_user('gi_owner', 'gi_owner@example.com', NULL, tests.build_meta_from_identifier('gi_owner'));
select tests.create_supabase_user('gi_invitee', 'gi_invitee@example.com', NULL, tests.build_meta_from_identifier('gi_invitee'));

-- Use service role for setup (bypass RLS)
select tests.authenticate_as_service_role();

-- Insert a group owned by gi_owner
insert into public.groups (group_name, address, phone, created_by)
values ('GI Test Group', 'Addr', '000', tests.get_supabase_uid('gi_owner'));

-- Insert initial invite
insert into public.group_invites (group_id, user_id, role)
values (
	(select id from public.groups where group_name = 'GI Test Group' limit 1),
	tests.get_supabase_uid('gi_invitee'),
	'member'
);

-- Attempting to insert a duplicate invite for same group/user should fail with unique violation
SELECT throws_ok(
$$insert into public.group_invites (group_id, user_id, role)
	values (
		(select id from public.groups where group_name = 'GI Test Group' limit 1),
		tests.get_supabase_uid('gi_invitee'),
		'member'
	)$$,
'23505', NULL,
'duplicate invite for same group/user raises unique violation'
);

-- Ensure no membership exists yet
SELECT is(
	(select count(*) from public.group_users where group_id = (select id from public.groups where group_name = 'GI Test Group' limit 1) and user_id = tests.get_supabase_uid('gi_invitee')),
	0::bigint,
	'no group_users membership exists before accepting invite'
);

-- Accept the invite (this should trigger the simmer.handle_group_invite_accept trigger and insert into group_users)
update public.group_invites set is_accepted = true
where group_id = (select id from public.groups where group_name = 'GI Test Group' limit 1)
  and user_id = tests.get_supabase_uid('gi_invitee');

-- Verify a group_users row was created
SELECT is(
	(select count(*) from public.group_users where group_id = (select id from public.groups where group_name = 'GI Test Group' limit 1) and user_id = tests.get_supabase_uid('gi_invitee')),
	1::bigint,
	'accepting invite created group_users membership'
);

select * from finish();
rollback;

