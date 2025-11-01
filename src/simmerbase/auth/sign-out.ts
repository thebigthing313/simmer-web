import { createServerFn } from '@tanstack/react-start';
import { getSupabaseClient } from '../client';

export const signOut = createServerFn().handler(async () => {
	const supabase = getSupabaseClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		return {
			error: true,
			message: error.message,
		};
	}
});
