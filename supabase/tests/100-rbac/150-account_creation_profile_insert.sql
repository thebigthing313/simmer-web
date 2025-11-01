-- Wrap tests in a transaction so we can rollback at the end and not persist test data.
BEGIN;

-- Plan the number of tests we will run.
SELECT plan(4);

-- Cleanup any leftovers if present (should not fail if nothing to delete).
SELECT lives_ok(
  'DELETE FROM public.profiles WHERE user_id = CAST(''00000000-0000-0000-0000-000000000001'' AS uuid)',
  'cleanup profiles'
);

SELECT lives_ok(
  'DELETE FROM auth.users WHERE id = CAST(''00000000-0000-0000-0000-000000000001'' AS uuid)',
  'cleanup auth.users'
);

-- Insert a test user into auth.users. This uses minimal common columns; adjust if your schema differs.
SELECT lives_ok($$
INSERT INTO auth.users (id, aud, role, email, raw_user_meta_data, email_confirmed_at, created_at)
VALUES (
  CAST('00000000-0000-0000-0000-000000000001' AS uuid),
  'authenticated',
  'authenticated',
  'test-user@example.com',
  jsonb_build_object('first_name','Test','last_name','User'),
  now(), now()
)
$$, 'insert test user into auth.users');

-- Check that the trigger created a profile for the new user
SELECT isnt_empty(
  'SELECT id FROM public.profiles WHERE user_id = ''00000000-0000-0000-0000-000000000001''::uuid',
  'profile created for new auth user'
);

SELECT * FROM finish();

ROLLBACK;