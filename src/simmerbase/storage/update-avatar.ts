import { createClientOnlyFn } from '@tanstack/react-start';
import { getSupabaseClient } from '../client';
import { compressImageToSize } from './compress-image';

/**
 * Updates an existing avatar image in Supabase storage.
 * Files are compressed to meet 1MB limit and named as avatar_[profile_id].[ext]
 *
 * @param file - The new image file to upload
 * @param profileId - The user's profile ID
 * @returns Promise<string> - The full path of the uploaded file (e.g., 'avatars/avatar_123.jpg')
 * @throws Error if upload fails
 */
export const updateAvatar = createClientOnlyFn(
	async (file: File, profileId: string): Promise<string> => {
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
		const fileName = `avatar_${profileId}.${fileExt}`;

		// Upload the file with upsert to replace existing
		const { data, error } = await supabase.storage
			.from('avatars')
			.upload(fileName, compressedFile, {
				cacheControl: '3600',
				upsert: true, // Replace existing file
			});

		if (error) {
			throw new Error(`Avatar update failed: ${error.message}`);
		}

		if (!data) {
			throw new Error('Avatar update failed: No data returned');
		}

		// Return full path
		return `avatars/${data.path}`;
	},
);
