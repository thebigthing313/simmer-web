begin;

select plan(4);

select has_schema('public', 'Schema public should exist');
select has_schema('auth', 'Schema auth should exist');
select has_schema('storage', 'Schema storage should exist');
select has_schema('simmer', 'Schema simmer should exist');

select * from finish();
rollback;