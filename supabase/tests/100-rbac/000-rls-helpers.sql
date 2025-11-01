begin;
select plan(8);

select tests.create_supabase_user('GroupOneOwner', NULL, NULL, tests.build_meta_from_identifier('GroupOneOwner'));
select tests.create_supabase_user('GroupOneMember', NULL, NULL, tests.build_meta_from_identifier('GroupOneMember'));
select tests.create_supabase_user('GroupTwoOwner', NULL, NULL, tests.build_meta_from_identifier('GroupTwoOwner'));
select tests.create_supabase_user('GroupTwoMember', NULL, NULL, tests.build_meta_from_identifier('GroupTwoMember'));

insert into public.groups(id, group_name, address, phone, created_by)
values ('11111111-1111-1111-1111-111111111111', 'Group One', '123 Main St', '555-1234', tests.get_supabase_uid('GroupOneOwner')),
       ('22222222-2222-2222-2222-222222222222', 'Group Two', '456 Elm St', '555-5678', tests.get_supabase_uid('GroupTwoOwner'));

insert into public.group_users(group_id, user_id, role)
values ('11111111-1111-1111-1111-111111111111', tests.get_supabase_uid('GroupOneMember'), 'member'),
       ('22222222-2222-2222-2222-222222222222', tests.get_supabase_uid('GroupTwoMember'), 'member');

-- Authenticate as GroupOneOwner and check app_metadata
select tests.authenticate_as('GroupOneOwner');
select is(public.user_is_group_member('11111111-1111-1111-1111-111111111111'), true, 'GroupOneOwner is member of Group One');
select is(public.user_has_group_role('11111111-1111-1111-1111-111111111111', 'owner'), true, 'GroupOneOwner is owner of Group One');

-- Authenticate as GroupOneMember and check app_metadata
select tests.authenticate_as('GroupOneMember');
select is(public.user_is_group_member('11111111-1111-1111-1111-111111111111'), true, 'GroupOneMember is member of Group One');
select is(public.user_has_group_role('11111111-1111-1111-1111-111111111111', 'owner'), false, 'GroupOneMember is not owner of Group One');

-- Authenticate as GroupTwoOwner and check that they are not in Group One
select tests.authenticate_as('GroupTwoOwner');
select is(public.user_is_group_member('11111111-1111-1111-1111-111111111111'), false, 'GroupTwoOwner is not member of Group One');
select is(public.user_has_group_role('11111111-1111-1111-1111-111111111111', 'owner'), false, 'GroupTwoOwner is not owner of Group One');

-- Authenticate as GroupTwoMember and check that they are not in Group One
select tests.authenticate_as('GroupTwoMember');
select is(public.user_is_group_member('11111111-1111-1111-1111-111111111111'), false, 'GroupTwoMember is not member of Group One');
select is(public.user_has_group_role('11111111-1111-1111-1111-111111111111', 'owner'), false, 'GroupTwoMember is not owner of Group One');

select * from finish();
rollback;