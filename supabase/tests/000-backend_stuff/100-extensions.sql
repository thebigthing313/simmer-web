begin;

-- Plan for 2 tests (adjust if you want to check ownership)
select plan(2);

-- 1. The "extensions" schema should exist
select has_schema('extensions', 'Schema "extensions" should exist');

-- 2. The "postgis" extension should exist in the "extensions" schema
select has_extension('extensions', 'postgis', 'Extension "postgis" should exist in schema "extensions"');

select * from finish();
rollback;