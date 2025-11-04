import { createClientOnlyFn } from '@tanstack/react-start';
import { getSupabaseClient } from '../client';
import { compressImageToSize } from './compress-image';

/**
 * Uploads an image to the group_images bucket.
 * Files are compressed to meet 10MB bucket limit.
 *
 * @param file - The image file to upload
 * @param groupId - The group ID
 * @param fileName - The file name (e.g., 'banner.jpg' or 'photo-123.jpg')
 * @returns Promise<string> - The full path of the uploaded file (e.g., 'group_images/group-id/banner.jpg')
 * @throws Error if upload fails
 */
export const uploadGroupImage = createClientOnlyFn(
	async (file: File, groupId: string, fileName: string): Promise<string> => {
		const supabase = getSupabaseClient();

		// Build the path: groupId/fileName
		const path = `${groupId}/${fileName}`;

		// Compress image to meet 10MB size limit
		const maxSizeBytes = 10 * 1024 * 1024; // 10MB
		const compressedFile = await compressImageToSize(
			file,
			maxSizeBytes,
			2048, // maxWidth for larger images
			2048, // maxHeight for larger images
		);

		// Upload the file
		const { data, error } = await supabase.storage
			.from('group_images')
			.upload(path, compressedFile, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error) {
			throw new Error(`Group image upload failed: ${error.message}`);
		}

		if (!data) {
			throw new Error('Group image upload failed: No data returned');
		}

		// Return full path
		return `group_images/${data.path}`;
	},
);
