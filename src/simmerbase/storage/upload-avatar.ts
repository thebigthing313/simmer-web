import { createClientOnlyFn } from '@tanstack/react-start';
import { getSupabaseClient } from '../client';
import { compressImageToSize } from './compress-image';

/**
 * Uploads an avatar image to Supabase storage.
 * Files are compressed to meet 1MB limit and named as avatar_[profile_id].[ext]
 *
 * @param file - The image file to upload
 * @param profileId - The user's profile ID
 * @returns Promise<string> - The full path of the uploaded file (e.g., 'avatars/avatar_123.jpg')
 * @throws Error if upload fails
 */
export const uploadAvatar = createClientOnlyFn(
	async (file: File): Promise<string> => {
		const supabase = getSupabaseClient();

		// Compress image to meet 1MB size limit
		const maxSizeBytes = 1 * 1024 * 1024; // 1MB
		const compressedFile = await compressImageToSize(
			file,
			maxSizeBytes,
			300, // maxWidth
			300, // maxHeight
		);

		// Extract file extension
		const fileExt = file.name.split('.').pop() || 'jpg';
		const fileName = `${crypto.randomUUID()}.${fileExt}`;

		// Upload the file
		const { data, error } = await supabase.storage
			.from('avatars')
			.upload(fileName, compressedFile);
		if (error) {
			throw new Error(`Avatar upload failed: ${error.message}`);
		}

		if (!data) {
			throw new Error('Avatar upload failed: No data returned');
		}

		// Return full path
		return `avatars/${data.path}`;
	},
);
