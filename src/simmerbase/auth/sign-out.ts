import { createServerFn } from '@tanstack/react-start';
import { getSupabaseServerClient } from '../ssr-client';

export const signOut = createServerFn().handler(async () => {
	const supabase = getSupabaseServerClient();
	const { error } = await supabase.auth.signOut();

	if (error) {
		return {
			error: true,
			message: error.message,
		};
	}
});
