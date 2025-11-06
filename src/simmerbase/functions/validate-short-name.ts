import { getSupabaseClient } from '../client';

export async function validateShortName(slug: string): Promise<boolean> {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from('groups')
		.select('id')
		.eq('short_name', slug)
		.maybeSingle();
	if (error) throw new Error(`Failed to validate short name: ${error.message}`);
	// return true when available
	return data === null;
}
