import { getSupabaseClient } from '../client';

export function getSupabaseUrl(path: string) {
	const pathParts = path.split('/');
	const bucketName = pathParts[0];
	const filePath = pathParts.slice(1).join('/');

	const supabase = getSupabaseClient();
	const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
	return data.publicUrl;
}
