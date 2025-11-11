
  create policy "Users can delete their own groups images"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'group_images'::text) AND public.user_is_group_member(((storage.foldername(name))[1])::uuid)));



  create policy "Users can insert avatars"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check ((bucket_id = 'avatars'::text));



  create policy "Users can insert their own groups images"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'group_images'::text) AND public.user_is_group_member(((storage.foldername(name))[1])::uuid)));



  create policy "Users can manage delete their own avatar"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'avatars'::text) AND (owner_id = (( SELECT auth.uid() AS uid))::text)));



  create policy "Users can select avatars"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using ((bucket_id = 'avatars'::text));



  create policy "Users can select their groups images"
  on "storage"."objects"
  as permissive
  for select
  to authenticated
using (((bucket_id = 'group_images'::text) AND public.user_is_group_member(((storage.foldername(name))[1])::uuid)));



  create policy "Users can update their own avatar"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'avatars'::text) AND (owner_id = (( SELECT auth.uid() AS uid))::text)));



  create policy "Users can update their own groups images"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'group_images'::text) AND public.user_is_group_member(((storage.foldername(name))[1])::uuid)));



