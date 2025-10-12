-- install tests utilities
-- install pgtap extension for testing
create extension if not exists pgtap with schema extensions;
/*
---------------------
---- install dbdev ----
----------------------
Requires:
  - pg_tle: https://github.com/aws/pg_tle
  - pgsql-http: https://github.com/pramsey/pgsql-http
*/
create extension if not exists http with schema extensions;
create extension if not exists pg_tle;
drop extension if exists "supabase-dbdev";
select pgtle.uninstall_extension_if_exists('supabase-dbdev');
select
    pgtle.install_extension(
        'supabase-dbdev',
        resp.contents ->> 'version',
        'PostgreSQL package manager',
        resp.contents ->> 'sql'
    )
from http(
    (
        'GET',
        'https://api.database.dev/rest/v1/'
        || 'package_versions?select=sql,version'
        || '&package_name=eq.supabase-dbdev'
        || '&order=version.desc'
        || '&limit=1',
        array[
            ('apiKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYndtbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMDczNzIsImV4cCI6MTk5NTY4MzM3Mn0.z2CN0mvO2No8wSi46Gw59DFGCTJrzM0AQKsu_5k134s')::http_header
        ],
        null,
        null
    )
) x,
lateral (
    select
        ((row_to_json(x) -> 'content') #>> '{}')::json -> 0
) resp(contents);
create extension "supabase-dbdev";
select dbdev.install('supabase-dbdev');
drop extension if exists "supabase-dbdev";
create extension "supabase-dbdev";
-- Install test helpers
select dbdev.install('basejump-supabase_test_helpers');
create extension if not exists "basejump-supabase_test_helpers" version '0.0.6';

-- Helper: build pretty JSON metadata (first_name, last_name) from an identifier
-- Usage: SELECT tests.build_meta_from_identifier('some_identifier');
-- The function splits on underscores or camelCase and returns jsonb like
-- { "first_name": "Some", "last_name": "Identifier" }
-- This avoids repeating JSON literals in tests and ensures consistent formatting.
CREATE OR REPLACE FUNCTION tests.build_meta_from_identifier(identifier text)
RETURNS jsonb AS $$
DECLARE
    normalized text;
    parts text[];
    first text;
    last text;
BEGIN
    IF identifier IS NULL THEN
        RETURN jsonb_build_object('first_name', NULL, 'last_name', NULL);
    END IF;

    -- If underscore-separated, prefer that split
    IF identifier LIKE '%\_%' THEN
        parts := regexp_split_to_array(identifier, '_');
    ELSE
        -- Insert spaces before camelCase boundaries, then split on whitespace
        normalized := regexp_replace(identifier, '([a-z0-9])([A-Z])', '\1 \2', 'g');
        parts := regexp_split_to_array(normalized, '\s+');
    END IF;

    -- Normalize and pretty-case the parts
    IF array_length(parts, 1) >= 1 THEN
        first := initcap(lower(parts[1]));
    ELSE
        first := initcap(lower(identifier));
    END IF;

    IF array_length(parts, 1) >= 2 THEN
        last := initcap(lower(parts[2]));
    ELSE
        -- If there's only one word, duplicate it as last name to keep tests simple
        last := first;
    END IF;

    RETURN jsonb_build_object('first_name', first, 'last_name', last);
END;
$$ LANGUAGE plpgsql VOLATILE;

-- Document required metadata for profile-creating trigger
COMMENT ON FUNCTION tests.build_meta_from_identifier(text) IS
    'Test helper: builds jsonb metadata {first_name,last_name} from an identifier (splits on _ or camelCase). Tests that create users for the auth.users trigger should pass this metadata so profile creation succeeds.';

-- Verify setup with a no-op test
begin;
select plan(1);
select ok(true, 'Pre-test hook completed successfully');
select * from finish();
rollback;