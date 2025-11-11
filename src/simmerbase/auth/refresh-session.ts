import { createServerFn } from '@tanstack/react-start';
import { getSupabaseClient } from '../client';

export const refreshSession = createServerFn({ method: 'POST' }).handler(
	async () => {
		const supabase = getSupabaseClient();
		const { error } = await supabase.auth.refreshSession();
		if (error) {
			return { error: true, message: error.message };
		}
	},
);
