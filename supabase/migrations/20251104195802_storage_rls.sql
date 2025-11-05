create policy "Users can select avatars"
on storage.objects
for select
to authenticated
using (bucket_id = 'avatars');

CREATE POLICY "Users can insert avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING(
    bucket_id = 'avatars'
    and owner_id = (select auth.uid())::text);


CREATE POLICY "Users can manage delete their own avatar"
ON storage.objects
FOR DELETE TO authenticated
USING(
    bucket_id = 'avatars'
    and owner_id = (select auth.uid())::text);

create policy "Users can select their groups images"
on storage.objects
for select
to authenticated
using (bucket_id = 'group_images' and public.user_is_group_member(((storage.foldername(name))[1])::"uuid"));

CREATE POLICY "Users can insert their own groups images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK(
    bucket_id = 'group_images'
    AND public.user_is_group_member(((storage.foldername(name))[1])::"uuid"));

CREATE POLICY "Users can update their own groups images"
ON storage.objects
FOR UPDATE
TO authenticated
USING(
    bucket_id = 'group_images'
    AND public.user_is_group_member(((storage.foldername(name))[1])::"uuid"));

CREATE POLICY "Users can delete their own groups images"
ON storage.objects
FOR DELETE
TO authenticated
USING(
    bucket_id = 'group_images'
    AND public.user_is_group_member(((storage.foldername(name))[1])::"uuid"));
