insert into
    storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
values
    ('avatars', 'avatars', true, ARRAY['image/*'], 3145728),
    ('group_images', 'group_images', true, ARRAY['image/*'], 10485760)
on conflict (id) do nothing;