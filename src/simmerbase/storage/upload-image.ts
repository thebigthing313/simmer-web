import { createClientOnlyFn } from '@tanstack/react-start';
import { getSupabaseClient } from '../client';
import { compressImage } from './compress-image';

/**
 * Uploads a photo file to Supabase storage and returns the public URL.
 * @param file - The file to upload.
 * @param bucket - The storage bucket name.
 * @param fileName - Optional custom file name.
 * @returns Promise<string> - The public URL of the uploaded file.
 */
export const uploadPhoto = createClientOnlyFn(
	async (
		file: File,
		bucket: 'logos' | 'avatars' = 'logos',
		fileName?: string,
	) => {
		const supabase = getSupabaseClient();
		let maxWidth: number, maxHeight: number;
		switch (bucket) {
			case 'logos':
				maxWidth = 300;
				maxHeight = 300;
				break;
			case 'avatars':
				maxWidth = 300;
				maxHeight = 300;
				break;
			default:
				maxWidth = 800;
				maxHeight = 800;
		}

		const compressedFile = await compressImage(file, maxWidth, maxHeight, 0.8);

		// Generate a unique path
		const filePath = fileName || `${Date.now()}-${compressedFile.name}`;

		// Upload the file
		const { error } = await supabase.storage
			.from(bucket)
			.upload(filePath, compressedFile, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error) {
			throw new Error(`Upload failed: ${error.message}`);
		}

		// Get the public URL
		const { data: urlData } = supabase.storage
			.from(bucket)
			.getPublicUrl(filePath);

		return urlData.publicUrl;
	},
);
