/**
 * Storage utilities for managing files in Supabase Storage
 */

// Compression utilities
export { compressImage, compressImageToSize } from './compress-image';
// Delete operations
export { deleteFile, deleteFiles } from './delete-image';
export { updateAvatar } from './update-avatar';
export { updateGroupImage } from './update-group-image';
// Avatar operations
export { uploadAvatar } from './upload-avatar';
// Group image operations
export { uploadGroupImage } from './upload-group-image';

// Legacy upload (keep for backwards compatibility)
export { uploadPhoto } from './upload-image';
