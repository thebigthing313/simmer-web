insert into
    storage.buckets (id, name, public, allowed_mime_types, max_file_size)
values
    ('avatars', 'avatars', true, ARRAY['image/*'], 3145728),
    ('group_images', 'group_images', true, ARRAY['image/*'], 10485760)
on conflict (id) do nothing;

CREATE POLICY "Users can manage their own avatars 1oj01fe_0"
ON "storage"."objects"
FOR INSERT
TO "authenticated"
WITH CHECK
    ((("bucket_id" = 'avatars'::"text")
    AND ("owner_id" = (( SELECT "auth"."uid"() AS "uid"))::"text")));



CREATE POLICY "Users can manage their own avatars 1oj01fe_1"
ON "storage"."objects"
FOR UPDATE
TO "authenticated"
USING
    ((("bucket_id" = 'avatars'::"text")
    AND ("owner_id" = (( SELECT "auth"."uid"() AS "uid"))::"text")));


CREATE POLICY "Users can manage their own avatars 1oj01fe_2"
ON "storage"."objects"
FOR DELETE TO "authenticated"
USING
    ((("bucket_id" = 'avatars'::"text")
    AND ("owner_id" = (( SELECT "auth"."uid"() AS "uid"))::"text")));

CREATE POLICY "Users can manage their own groups images 1qwv6t4_0"
ON "storage"."objects"
FOR INSERT
TO "authenticated"
WITH CHECK
    ((("bucket_id" = 'group_images'::"text")
    AND "public"."user_is_group_member"((("storage"."foldername"("name"))[1])::"uuid")));

CREATE POLICY "Users can manage their own groups images 1qwv6t4_1"
ON "storage"."objects"
FOR UPDATE
TO "authenticated"
USING
    ((("bucket_id" = 'group_images'::"text")
    AND "public"."user_is_group_member"((("storage"."foldername"("name"))[1])::"uuid")));

CREATE POLICY "Users can manage their own groups images 1qwv6t4_2"
ON "storage"."objects"
FOR DELETE
TO "authenticated"
USING
    ((("bucket_id" = 'group_images'::"text")
    AND "public"."user_is_group_member"((("storage"."foldername"("name"))[1])::"uuid")));
