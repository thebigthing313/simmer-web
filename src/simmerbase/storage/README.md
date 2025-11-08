# Photo Upload Flow - Implementation Guide

This document describes the photo upload utilities for managing images in Supabase Storage.

## Overview

The storage system provides functions for:
- **Avatar management** (1MB limit, auto-compressed, standardized naming)
- **Group image management** (10MB limit, auto-compressed, custom paths)
- **File deletion** (single or batch operations)
- **Image compression** (dimension-based and size-based)

## Functions

### Avatar Operations

#### `uploadAvatar(file: File, profileId: string): Promise<string>`

Uploads a new avatar image. Files are automatically compressed to meet the 1MB limit.

**Parameters:**
- `file`: The image file to upload
- `profileId`: The user's profile ID

**Returns:** Full path string (e.g., `'avatars/avatar_123.jpg'`)

**Example:**
```typescript
import { uploadAvatar } from '@/simmerbase/storage';

const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  
  try {
    const fullPath = await uploadAvatar(file, 'user-123');
    console.log('Avatar uploaded:', fullPath);
    // fullPath: 'avatars/avatar_user-123.jpg'
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```
---

### Group Image Operations

#### `uploadGroupImage(file: File, groupId: string, fileName: string): Promise<string>`

Uploads a new group image. Files are automatically compressed to meet the 10MB limit.

**Parameters:**
- `file`: The image file to upload
- `groupId`: The group ID
- `fileName`: The file name (e.g., `'banner.jpg'` or `'photo-123.jpg'`)

**Returns:** Full path string (e.g., `'group_images/group-123/banner.jpg'`)

**Example:**
```typescript
import { uploadGroupImage } from '@/simmerbase/storage';

const handleGroupImageUpload = async (file: File, groupId: string) => {
  try {
    const timestamp = Date.now();
    const fileName = `photo-${timestamp}.jpg`;
    const fullPath = await uploadGroupImage(file, groupId, fileName);
    console.log('Group image uploaded:', fullPath);
    // fullPath: 'group_images/group-123/photo-1699123456789.jpg'
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

#### `updateGroupImage(file: File, groupId: string, fileName: string): Promise<string>`

Updates an existing group image. Automatically replaces the old file.

**Parameters:**
- `file`: The new image file
- `groupId`: The group ID
- `fileName`: The file name (e.g., `'banner.jpg'` or `'photo-123.jpg'`)

**Returns:** Full path string (e.g., `'group_images/group-123/banner.jpg'`)

**Example:**
```typescript
import { updateGroupImage } from '@/simmerbase/storage';

const handleBannerUpdate = async (file: File, groupId: string) => {
  try {
    const fullPath = await updateGroupImage(file, groupId, 'banner.jpg');
    console.log('Banner updated:', fullPath);
  } catch (error) {
    console.error('Update failed:', error);
  }
};
```

---

### Delete Operations

#### `deleteFile(fullPath: string): Promise<void>`

Deletes a single file from storage.

**Parameters:**
- `fullPath`: The full path returned from upload (e.g., `'avatars/avatar_123.jpg'`)

**Example:**
```typescript
import { deleteFile } from '@/simmerbase/storage';

const handleDeleteAvatar = async (avatarPath: string) => {
  try {
    await deleteFile(avatarPath);
    console.log('Avatar deleted');
  } catch (error) {
    console.error('Delete failed:', error);
  }
};

// Usage
await deleteFile('avatars/avatar_user-123.jpg');
```

#### `deleteFiles(fullPaths: string[]): Promise<void>`

Deletes multiple files from storage. Automatically groups by bucket for efficiency.

**Parameters:**
- `fullPaths`: Array of full paths to delete

**Example:**
```typescript
import { deleteFiles } from '@/simmerbase/storage';

const handleDeleteMultiple = async (paths: string[]) => {
  try {
    await deleteFiles(paths);
    console.log('Files deleted');
  } catch (error) {
    console.error('Delete failed:', error);
  }
};

// Usage
await deleteFiles([
  'group_images/group-123/photo-1.jpg',
  'group_images/group-123/photo-2.jpg',
  'avatars/avatar_user-456.jpg'
]);
```

---

### Compression Utilities

#### `compressImage(file: File, maxWidth: number, maxHeight: number, quality?: number): Promise<File>`

Compresses an image by dimensions and quality.

**Parameters:**
- `file`: The original file
- `maxWidth`: Maximum width in pixels
- `maxHeight`: Maximum height in pixels
- `quality`: JPEG quality (0-1), default 0.8

**Returns:** Compressed File object

#### `compressImageToSize(file: File, maxSizeBytes: number, maxWidth: number, maxHeight: number, initialQuality?: number): Promise<File>`

Compresses an image to meet a specific file size target. Uses iterative compression.

**Parameters:**
- `file`: The original file
- `maxSizeBytes`: Target file size in bytes
- `maxWidth`: Maximum width in pixels
- `maxHeight`: Maximum height in pixels
- `initialQuality`: Starting JPEG quality (0-1), default 0.9

**Returns:** Compressed File object

**Example:**
```typescript
import { compressImageToSize } from '@/simmerbase/storage';

const compressToThumbnail = async (file: File) => {
  // Compress to 500KB
  const compressed = await compressImageToSize(
    file,
    500 * 1024, // 500KB
    200,        // max width
    200         // max height
  );
  return compressed;
};
```

---

## Complete Upload Flow Examples

### Avatar Upload with Preview

```typescript
import { uploadAvatar } from '@/simmerbase/storage';
import { useState } from 'react';

function AvatarUploadForm({ userId }: { userId: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    setPreview(URL.createObjectURL(file));

    // Upload
    setUploading(true);
    try {
      const fullPath = await uploadAvatar(file, userId);
      console.log('Avatar uploaded:', fullPath);
      // Save fullPath to your database
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {preview && <img src={preview} alt="Preview" />}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

### Group Image Gallery with Delete

```typescript
import { uploadGroupImage, deleteFile } from '@/simmerbase/storage';

interface GroupImage {
  id: string;
  fullPath: string;
  url: string;
}

function GroupImageGallery({ groupId }: { groupId: string }) {
  const [images, setImages] = useState<GroupImage[]>([]);

  const handleUpload = async (file: File) => {
    const timestamp = Date.now();
    const fileName = `image-${timestamp}.jpg`;
    const fullPath = await uploadGroupImage(file, groupId, fileName);
    
    // Add to gallery
    const newImage = {
      id: timestamp.toString(),
      fullPath,
      url: `https://your-supabase-project.supabase.co/storage/v1/object/public/${fullPath}`
    };
    setImages([...images, newImage]);
  };

  const handleDelete = async (image: GroupImage) => {
    await deleteFile(image.fullPath);
    setImages(images.filter(img => img.id !== image.id));
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} 
      />
      <div className="gallery">
        {images.map(image => (
          <div key={image.id}>
            <img src={image.url} alt="" />
            <button onClick={() => handleDelete(image)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Storage Bucket Configuration

The storage buckets are configured in `supabase/seed/000 - storage_buckets.sql`:

- **avatars**: 3MB limit (enforced at 1MB by compression), public access
- **group_images**: 10MB limit, public access with group membership check

### Security

- **Avatars**: Users can only manage their own avatars (checked by `owner_id`)
- **Group Images**: Users must be group members to upload/update/delete images

---

## Technical Details

### File Naming Convention

- **Avatars**: `avatar_[profile_id].[ext]` (e.g., `avatar_user-123.jpg`)
- **Group Images**: Custom paths, typically `[group_id]/[filename].[ext]`

### Compression Strategy

1. **Avatar compression** (1MB target):
   - Resize to max 300x300px
   - Iterative quality reduction (starting at 0.9)
   - If needed, further dimension reduction

2. **Group image compression** (10MB target):
   - Resize to max 2048x2048px
   - Iterative quality reduction (starting at 0.9)
   - If needed, further dimension reduction

### File Format Handling

- Images with transparency → PNG format
- Images without transparency → JPEG format (better compression)

### Return Values

All upload/update functions return the **full path** in the format:
- `bucket/path` (e.g., `'avatars/avatar_123.jpg'`)

This full path can be:
1. Stored in your database
2. Used to construct public URLs
3. Passed directly to `deleteFile()`

---

## Error Handling

All functions throw errors on failure. Always wrap calls in try-catch:

```typescript
try {
  const fullPath = await uploadAvatar(file, userId);
  // Success
} catch (error) {
  if (error instanceof Error) {
    console.error('Upload failed:', error.message);
    // Show error to user
  }
}
```

---

## Migration from Legacy Code

If you're using the old `uploadPhoto` function:

**Old:**
```typescript
const url = await uploadPhoto(file, 'avatars', 'custom-name.jpg');
```

**New:**
```typescript
const fullPath = await uploadAvatar(file, userId);
// or for group images:
const fullPath = await uploadGroupImage(file, groupId, 'banner.jpg');
```

The new functions:
- ✅ Return full paths instead of public URLs
- ✅ Enforce size limits through smart compression
- ✅ Use standardized naming conventions
- ✅ Provide separate upload/update operations
- ✅ Are more type-safe and focused
