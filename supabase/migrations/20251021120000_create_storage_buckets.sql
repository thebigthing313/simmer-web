-- Create storage buckets for photos
insert into
    storage.buckets (id, name, public)
values
    ('logos', 'logos', true),
    ('avatars', 'avatars', true),
    ('profile_photos', 'profile_photos', true)
on conflict (id) do nothing;

-- RLS policies for storage.objects
-- Allow authenticated users to upload to their own folders or public buckets
-- For logos: allow all authenticated users to upload (since groups can have logos)
create policy "Allow authenticated users to upload logos" on storage.objects for INSERT
with
    check (
        bucket_id='logos'
        and auth.role ()='authenticated'
    );

-- For avatars: allow users to upload to their own avatar folder
create policy "Allow users to upload their own avatars" on storage.objects for INSERT
with
    check (
        bucket_id='avatars'
        and auth.role ()='authenticated'
        and (storage.foldername (name)) [1]=auth.uid ()::text
    );

-- For profile_photos: allow users to upload to their own profile photos folder
create policy "Allow users to upload their own profile photos" on storage.objects for INSERT
with
    check (
        bucket_id='profile_photos'
        and auth.role ()='authenticated'
        and (storage.foldername (name)) [1]=auth.uid ()::text
    );

-- Allow public read access for all buckets
create policy "Allow public read access" on storage.objects for
select
    using (
        bucket_id in ('logos', 'avatars', 'profile_photos')
    );

-- Allow users to delete their own uploads
create policy "Allow users to delete their own uploads" on storage.objects for DELETE using (
    bucket_id in ('avatars', 'profile_photos')
    and auth.role ()='authenticated'
    and (storage.foldername (name)) [1]=auth.uid ()::text
);

-- For logos, allow group owners or admins to delete
-- This might need more complex logic, but for now, allow authenticated users
create policy "Allow authenticated users to delete logos" on storage.objects for DELETE using (
    bucket_id='logos'
    and auth.role ()='authenticated'
);