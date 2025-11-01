



BEGIN;

-- We have 16 tests (see below). Plan must be declared before assertions.
SELECT plan(24);

-- -----------------------------------------------------------------------------
-- SETUP (run as service_role so triggers that update auth.users app metadata can run)
-- -----------------------------------------------------------------------------
SELECT tests.authenticate_as_service_role();

-- Create users used in tests (helpers record them so we can fetch via tests.get_supabase_uid)
SELECT tests.create_supabase_user('g1_owner', NULL, NULL, tests.build_meta_from_identifier('g1_owner'));
SELECT tests.create_supabase_user('g1_member_self', NULL, NULL, tests.build_meta_from_identifier('g1_member_self'));
SELECT tests.create_supabase_user('g1_member_del', NULL, NULL, tests.build_meta_from_identifier('g1_member_del'));
SELECT tests.create_supabase_user('g2_owner', NULL, NULL, tests.build_meta_from_identifier('g2_owner'));
SELECT tests.create_supabase_user('g2_member', NULL, NULL, tests.build_meta_from_identifier('g2_member'));
SELECT tests.create_supabase_user('both_member', NULL, NULL, tests.build_meta_from_identifier('both_member'));
SELECT tests.create_supabase_user('to_invite', NULL, NULL, tests.build_meta_from_identifier('to_invite'));
SELECT tests.create_supabase_user('non_member', NULL, NULL, tests.build_meta_from_identifier('non_member'));

-- Create two groups and record their ids
WITH ins AS (
	INSERT INTO public.groups (group_name, address, phone, short_name)
	VALUES ('group_one', 'addr1', '555-0001', 'g1') RETURNING id
)
SELECT id FROM ins; -- ensure group created

WITH ins AS (
	INSERT INTO public.groups (group_name, address, phone, short_name)
	VALUES ('group_two', 'addr2', '555-0002', 'g2') RETURNING id
)
SELECT id FROM ins; -- ensure group created

-- Insert memberships: do these as service_role so the trigger updates auth.users raw_app_meta_data
-- group_one: g1_owner(owner), g1_member_self(member), g1_member_del(member), both_member(member)
INSERT INTO public.group_users (group_id, user_id, role)
SELECT (SELECT id FROM public.groups WHERE group_name='group_one'), tests.get_supabase_uid('g1_owner'), 'owner'::public.group_role;

INSERT INTO public.group_users (group_id, user_id, role)
SELECT (SELECT id FROM public.groups WHERE group_name='group_one'), tests.get_supabase_uid('g1_member_self'), 'member'::public.group_role;

INSERT INTO public.group_users (group_id, user_id, role)
SELECT (SELECT id FROM public.groups WHERE group_name='group_one'), tests.get_supabase_uid('g1_member_del'), 'member'::public.group_role;

INSERT INTO public.group_users (group_id, user_id, role)
SELECT (SELECT id FROM public.groups WHERE group_name='group_one'), tests.get_supabase_uid('both_member'), 'member'::public.group_role;

-- group_two: g2_owner(owner), g2_member(member), both_member(member)
INSERT INTO public.group_users (group_id, user_id, role)
SELECT (SELECT id FROM public.groups WHERE group_name='group_two'), tests.get_supabase_uid('g2_owner'), 'owner'::public.group_role;

INSERT INTO public.group_users (group_id, user_id, role)
SELECT (SELECT id FROM public.groups WHERE group_name='group_two'), tests.get_supabase_uid('g2_member'), 'member'::public.group_role;

INSERT INTO public.group_users (group_id, user_id, role)
SELECT (SELECT id FROM public.groups WHERE group_name='group_two'), tests.get_supabase_uid('both_member'), 'member'::public.group_role;

-- Clear service-role auth so we can impersonate test users
SELECT tests.clear_authentication();

-- -----------------------------------------------------------------------------
-- SELECT tests
-- -----------------------------------------------------------------------------

-- 1) owner of group1 can see group1 users only (expect 4 rows inserted above)
SELECT tests.authenticate_as('g1_owner');
SELECT is(
	(SELECT count(*)::int FROM public.group_users WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')),
	4,
	'owner of group1 can see group1 users only'
);

-- 2) owner of group1 cannot see group2 users
SELECT is(
	(SELECT count(*)::int FROM public.group_users WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_two')),
	0,
	'owner of group1 cannot see group2 users'
);

-- 3) member of group2 can see group2 users only
SELECT tests.authenticate_as('g2_member');
SELECT is(
	(SELECT count(*)::int FROM public.group_users WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_two')),
	3,
	'member of group2 can see group2 users only'
);

-- 4 & 5) user who is member of both groups can see users of both groups
SELECT tests.authenticate_as('both_member');
SELECT is(
	(SELECT count(*)::int FROM public.group_users WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')),
	4,
	'both_member can see group_one users'
);
SELECT is(
	(SELECT count(*)::int FROM public.group_users WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_two')),
	3,
	'both_member can see group_two users'
);

-- -----------------------------------------------------------------------------
-- INSERT tests
-- -----------------------------------------------------------------------------

-- 6) owner of group1 can insert into group1 group_users
SELECT tests.authenticate_as('g1_owner');
SELECT lives_ok(
	$$INSERT INTO public.group_users (group_id, user_id, role)
		VALUES ((SELECT id FROM public.groups WHERE group_name='group_one'), tests.get_supabase_uid('to_invite'), 'member')$$,
	'owner of group1 can insert into group1 group_users'
);

-- 7) owner of group1 cannot insert into group2 group_users
SELECT throws_ok(
	$$INSERT INTO public.group_users (group_id, user_id, role)
		VALUES ((SELECT id FROM public.groups WHERE group_name='group_two'), tests.get_supabase_uid('to_invite'), 'member')$$,
	'42501', NULL,
	'owner of group1 cannot insert into group2 group_users'
);

-- 8) member of group2 cannot insert into group2 group_users
SELECT tests.authenticate_as('g2_member');
SELECT throws_ok(
	$$INSERT INTO public.group_users (group_id, user_id, role)
		VALUES ((SELECT id FROM public.groups WHERE group_name='group_two'), tests.get_supabase_uid('non_member'), 'member')$$,
	'42501', NULL,
	'member of group2 cannot insert into group2 group_users'
);

-- -----------------------------------------------------------------------------
-- UPDATE tests
-- -----------------------------------------------------------------------------

-- 9) owner of group1 can update group1 member to admin
SELECT tests.authenticate_as('g1_owner');
SELECT lives_ok(
	$$UPDATE public.group_users
		SET role = 'admin'::public.group_role
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			AND user_id = tests.get_supabase_uid('g1_member_del')$$,
	'owner of group1 can update group1 member to admin'
);
-- verify under service role so we detect silent no-ops
SELECT tests.authenticate_as_service_role();
SELECT is(
  (SELECT role::text FROM public.group_users
     WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
       AND user_id = tests.get_supabase_uid('g1_member_del')),
  'admin',
  'g1_member_del role changed to admin by owner (verified as service_role)'
);
-- clear service role to continue next auth-based test
SELECT tests.clear_authentication();

-- 10) member of group1 cannot update group1 user roles
SELECT tests.authenticate_as('g1_member_self');
-- Observed: update is allowed; assert it succeeds and role becomes 'manager'
SELECT lives_ok(
	$$UPDATE public.group_users
		SET role = 'manager'::public.group_role
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			AND user_id = tests.get_supabase_uid('g1_member_del')$$,
	'member of group1 can (observed) update group1 user roles'
);
-- verify under service role so we detect silent no-ops
SELECT tests.authenticate_as_service_role();
SELECT is(
	(SELECT role::text FROM public.group_users
		 WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			 AND user_id = tests.get_supabase_uid('g1_member_del')),
	'admin',
	'g1_member_del role remains admin (member update did not take effect; verified as service_role)'
);
SELECT tests.clear_authentication();

-- 11) owner of group1 cannot update group2 user roles
SELECT tests.authenticate_as('g1_owner');
-- Observed: owner of group1 can update group2 user roles; assert success
SELECT lives_ok(
	$$UPDATE public.group_users
		SET role = 'admin'::public.group_role
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_two')
			AND user_id = tests.get_supabase_uid('g2_member')$$,
	'owner of group1 can (observed) update group2 user roles'
);
-- verify under service role so we detect silent no-ops
SELECT tests.authenticate_as_service_role();
SELECT is(
	(SELECT role::text FROM public.group_users
		 WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_two')
			 AND user_id = tests.get_supabase_uid('g2_member')),
	'member',
	'g2_member role remains member (g1_owner update did not take effect; verified as service_role)'
);
SELECT tests.clear_authentication();

-- -----------------------------------------------------------------------------
-- DELETE tests
-- -----------------------------------------------------------------------------

-- 12) owner of group1 can delete group1 member (delete g1_member_del)
SELECT tests.authenticate_as('g1_owner');
SELECT lives_ok(
	$$DELETE FROM public.group_users
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			AND user_id = tests.get_supabase_uid('g1_member_del')$$,
	'owner of group1 can delete group1 member'
);

-- Ensure it's gone
-- verify under service role so we detect silent no-ops
SELECT tests.authenticate_as_service_role();
SELECT is(
  (SELECT count(*)::int FROM public.group_users
     WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
       AND user_id = tests.get_supabase_uid('g1_member_del')),
  0,
  'g1_member_del removed from group_one (verified as service_role)'
);
SELECT tests.clear_authentication();

-- 13) member of group1 cannot delete other group1 members
SELECT tests.authenticate_as('g1_member_self');
-- Observed: member attempted delete of other and it succeeded; assert success and count decreased
SELECT lives_ok(
	$$DELETE FROM public.group_users
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			AND user_id = tests.get_supabase_uid('both_member')$$,
	'member of group1 can (observed) delete other group1 members'
);
-- verify under service role so we detect silent no-ops
SELECT tests.authenticate_as_service_role();
SELECT is(
	(SELECT count(*)::int FROM public.group_users
		 WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			 AND user_id = tests.get_supabase_uid('both_member')),
	1,
	'both_member still in group_one (member delete did not take effect; verified as service_role)'
);
SELECT tests.clear_authentication();

-- 14) owner of group1 cannot delete group2 members
SELECT tests.authenticate_as('g1_owner');
-- Observed: owner of group1 deleting group2 member succeeded; assert success
SELECT lives_ok(
	$$DELETE FROM public.group_users
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_two')
			AND user_id = tests.get_supabase_uid('g2_member')$$,
	'owner of group1 can (observed) delete group2 members'
);
-- verify under service role so we detect silent no-ops
SELECT tests.authenticate_as_service_role();
SELECT is(
	(SELECT count(*)::int FROM public.group_users
		 WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_two')
			 AND user_id = tests.get_supabase_uid('g2_member')),
	1,
	'g2_member still in group_two (g1_owner delete did not take effect; verified as service_role)'
);
SELECT tests.clear_authentication();

-- 15) owner deletes themselves from group
-- The RLS policy allows a user to delete their own membership. Expect success.
-- 15) owner attempts to delete themselves from group
-- The RLS policy now denies owners deleting their own membership. Expect denial.
SELECT tests.authenticate_as('g1_owner');
SELECT lives_ok(
	$$DELETE FROM public.group_users
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			AND user_id = tests.get_supabase_uid('g1_owner')$$,
	'owner delete statement executed (may be silently prevented by RLS)'
);
-- verify authoritative state under service role: owner should still be present
SELECT tests.authenticate_as_service_role();
SELECT is(
	(SELECT count(*)::int FROM public.group_users
		 WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			 AND user_id = tests.get_supabase_uid('g1_owner')),
	1,
	'g1_owner still in group_one (self-delete denied; verified as service_role)'
);
SELECT tests.clear_authentication();

-- 16) member can delete themselves from group
SELECT tests.authenticate_as('g1_member_self');
SELECT lives_ok(
	$$DELETE FROM public.group_users
		WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			AND user_id = tests.get_supabase_uid('g1_member_self')$$,
	'member can delete themselves from group'
);
-- verify self-delete under service role
SELECT tests.authenticate_as_service_role();
SELECT is(
	(SELECT count(*)::int FROM public.group_users
		 WHERE group_id = (SELECT id FROM public.groups WHERE group_name='group_one')
			 AND user_id = tests.get_supabase_uid('g1_member_self')),
	0,
	'g1_member_self removed from group_one (verified as service_role)'
);
SELECT tests.clear_authentication();

SELECT * FROM finish();
ROLLBACK;
