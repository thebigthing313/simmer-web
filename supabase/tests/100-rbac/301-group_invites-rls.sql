BEGIN;

-- Plan: 17 tests
SELECT plan(17);

-- Setup as service role to create users/groups/memberships
SELECT tests.authenticate_as_service_role();
-- Clean up any previous runs that created a group named 'rls_group'
DELETE FROM public.group_invites WHERE group_id IN (SELECT id FROM public.groups WHERE group_name = 'rls_group');
DELETE FROM public.group_users WHERE group_id IN (SELECT id FROM public.groups WHERE group_name = 'rls_group');
DELETE FROM public.groups WHERE group_name = 'rls_group';

SELECT tests.create_supabase_user('ownerA', NULL, NULL, tests.build_meta_from_identifier('ownerA'));
SELECT tests.create_supabase_user('inviteeA', NULL, NULL, tests.build_meta_from_identifier('inviteeA'));
SELECT tests.create_supabase_user('otherUser', NULL, NULL, tests.build_meta_from_identifier('otherUser'));

-- Create group and assign ownerA as owner
WITH ins AS (
  INSERT INTO public.groups (group_name, address, phone, short_name, created_by)
  VALUES ('rls_group', 'addr', '000', 'r1', tests.get_supabase_uid('ownerA')) RETURNING id
)
SELECT id FROM ins;

INSERT INTO public.group_users (group_id, user_id, role)
SELECT id, tests.get_supabase_uid('ownerA'), 'owner'::public.group_role
  FROM public.groups WHERE group_name='rls_group'
ON CONFLICT (group_id, user_id, role) DO NOTHING;

-- Clear service role so further operations are tested under auth
SELECT tests.clear_authentication();

-- 1) invitee cannot see invites before being added (no invite exists yet) - expect 0
SELECT tests.authenticate_as('inviteeA');
SELECT is((SELECT count(*) FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')), 0::bigint, 'invitee sees zero invites initially');

-- 2) otherUser cannot see invites for the group
SELECT tests.authenticate_as('otherUser');
SELECT is((SELECT count(*) FROM public.group_invites WHERE group_id = (SELECT id FROM public.groups WHERE group_name='rls_group')), 0::bigint, 'other user sees zero invites');

-- 3) ownerA can insert an invite
SELECT tests.authenticate_as('ownerA');
SELECT lives_ok($$
INSERT INTO public.group_invites (group_id, user_id, role)
  VALUES ((SELECT id FROM public.groups WHERE group_name='rls_group'), tests.get_supabase_uid('inviteeA'), 'member')
$$, 'owner can insert invite');

-- 4) now invitee can see their invite
SELECT tests.authenticate_as('inviteeA');
SELECT is((SELECT count(*) FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')), 1::bigint, 'invitee sees their invite');

-- 5) otherUser still cannot see the invite (not owner or invitee)
SELECT tests.authenticate_as('otherUser');
SELECT is((SELECT count(*) FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')), 0::bigint, 'other user cannot see someone else''s invite');

-- 6) non-owner cannot insert an invite
SELECT tests.authenticate_as('otherUser');
SELECT throws_ok($$
INSERT INTO public.group_invites (group_id, user_id, role)
  VALUES ((SELECT id FROM public.groups WHERE group_name='rls_group'), tests.get_supabase_uid('otherUser'), 'member')
$$, '42501', NULL, 'non-owner cannot insert invite');

-- 7) owner cannot set is_accepted = true on behalf of invitee (should be blocked by with check)
SELECT tests.authenticate_as('ownerA');
SELECT throws_ok($$
UPDATE public.group_invites SET is_accepted = true
  WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, '42501', NULL, 'owner cannot accept invite on behalf of invitee');

-- 8) invitee can accept their invite
SELECT tests.authenticate_as('inviteeA');
SELECT lives_ok($$
UPDATE public.group_invites SET is_accepted = true
  WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, 'invitee can accept their invite');

-- 9) owner can delete the invite
SELECT tests.authenticate_as('ownerA');
SELECT lives_ok($$
DELETE FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, 'owner can delete invite');

-- Recreate invite for further delete test
SELECT tests.authenticate_as_service_role();
INSERT INTO public.group_invites (group_id, user_id, role)
  VALUES ((SELECT id FROM public.groups WHERE group_name='rls_group'), tests.get_supabase_uid('inviteeA'), 'member');
SELECT tests.clear_authentication();

-- 10) invitee can delete their own invite
SELECT tests.authenticate_as('inviteeA');
SELECT lives_ok($$
DELETE FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, 'invitee can delete their invite');

-- 11) owner can update general fields (not accept) e.g. change role
-- Recreate invite
SELECT tests.authenticate_as_service_role();
INSERT INTO public.group_invites (group_id, user_id, role)
  VALUES ((SELECT id FROM public.groups WHERE group_name='rls_group'), tests.get_supabase_uid('inviteeA'), 'member');
SELECT tests.clear_authentication();

SELECT tests.authenticate_as('ownerA');
SELECT lives_ok($$
UPDATE public.group_invites SET role = 'admin'::public.group_role
  WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, 'owner can update non-accepting fields');

-- 12) otherUser attempts to delete invite (should be a no-op); verify as service_role that row still exists
SELECT tests.authenticate_as('otherUser');
SELECT lives_ok($$
DELETE FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, 'non-owner delete attempt did not raise exception');
SELECT tests.authenticate_as_service_role();
SELECT is((SELECT count(*) FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')), 1::bigint, 'invite still exists after unauthorized delete attempt');
SELECT tests.clear_authentication();

-- 13) otherUser attempts to update invite role (should be a no-op); verify as service_role that role is unchanged
SELECT tests.authenticate_as('otherUser');
SELECT lives_ok($$
UPDATE public.group_invites SET role = 'member' WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, 'non-owner update attempt did not raise exception');
SELECT tests.authenticate_as_service_role();
SELECT is((SELECT role::text FROM public.group_invites WHERE user_id = tests.get_supabase_uid('inviteeA')), 'admin', 'invite role unchanged after unauthorized update attempt');
SELECT tests.clear_authentication();

-- 14) Ensure select policy allows group owners to see invites
SELECT tests.authenticate_as('ownerA');
SELECT is((SELECT count(*) FROM public.group_invites WHERE group_id = (SELECT id FROM public.groups WHERE group_name='rls_group')), 1::bigint, 'owner sees invites for their group');

-- 15) Ensure invitee can update other non-accepting fields on their own invite
SELECT tests.authenticate_as('inviteeA');
SELECT lives_ok($$
UPDATE public.group_invites SET expiration_date = now() + interval '1 day'
  WHERE user_id = tests.get_supabase_uid('inviteeA')
$$, 'invitee can update non-accepting fields');

-- 16) Clean up - run as service role to remove created data (left in transaction rollback but keep for clarity)
SELECT tests.authenticate_as_service_role();
DELETE FROM public.group_invites WHERE group_id = (SELECT id FROM public.groups WHERE group_name='rls_group');
DELETE FROM public.group_users WHERE group_id = (SELECT id FROM public.groups WHERE group_name='rls_group');
DELETE FROM public.groups WHERE group_name = 'rls_group';
SELECT tests.clear_authentication();

select * from finish();
rollback;
