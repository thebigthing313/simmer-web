import { createClientOnlyFn } from '@tanstack/react-start';
import { getSupabaseClient } from '../client';

/**
 * Parses a full path to extract bucket and file path.
 *
 * @param fullPath - The full path (e.g., 'avatars/avatar_123.jpg' or 'group_images/group-id/banner.jpg')
 * @returns Object with bucket and path
 */
function parseFullPath(fullPath: string): { bucket: string; path: string } {
	const parts = fullPath.split('/');
	if (parts.length < 2) {
		throw new Error('Invalid full path format. Expected format: bucket/path');
	}

	const bucket = parts[0];
	const path = parts.slice(1).join('/');

	return { bucket, path };
}

/**
 * Deletes a file from Supabase storage.
 *
 * @param fullPath - The full path of the file to delete (e.g., 'avatars/avatar_123.jpg')
 * @returns Promise<void>
 * @throws Error if deletion fails
 */
export const deleteFile = createClientOnlyFn(
	async (fullPath: string): Promise<void> => {
		const supabase = getSupabaseClient();

		const { bucket, path } = parseFullPath(fullPath);

		const { error } = await supabase.storage.from(bucket).remove([path]);

		if (error) {
			throw new Error(`File deletion failed: ${error.message}`);
		}
	},
);

/**
 * Deletes multiple files from Supabase storage.
 *
 * @param fullPaths - Array of full paths to delete
 * @returns Promise<void>
 * @throws Error if deletion fails
 */
export const deleteFiles = createClientOnlyFn(
	async (fullPaths: string[]): Promise<void> => {
		const supabase = getSupabaseClient();

		// Group files by bucket
		const filesByBucket: Record<string, string[]> = {};

		for (const fullPath of fullPaths) {
			const { bucket, path } = parseFullPath(fullPath);
			if (!filesByBucket[bucket]) {
				filesByBucket[bucket] = [];
			}
			filesByBucket[bucket].push(path);
		}

		// Delete files for each bucket
		const deletePromises = Object.entries(filesByBucket).map(
			async ([bucket, paths]) => {
				const { error } = await supabase.storage.from(bucket).remove(paths);

				if (error) {
					throw new Error(
						`File deletion failed for bucket ${bucket}: ${error.message}`,
					);
				}
			},
		);

		await Promise.all(deletePromises);
	},
);
