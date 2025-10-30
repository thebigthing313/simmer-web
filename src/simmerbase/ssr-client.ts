import { createServerClient } from '@supabase/ssr';
import { getCookies, setCookie } from '@tanstack/react-start/server';

export function getSupabaseServerClient() {
	if (
		!process.env.VITE_SUPABASE_URL ||
		!process.env.VITE_SUPABASE_SBPUBLISHABLE_KEY
	) {
		throw new Error(
			'SUPABASE_URL and VITE_SUPABASE_SBPUBLISHABLE_KEY must be set in environment variables',
		);
	}
	return createServerClient(
		process.env.VITE_SUPABASE_URL,
		process.env.VITE_SUPABASE_SBPUBLISHABLE_KEY,
		{
			cookies: {
				getAll() {
					return Object.entries(getCookies()).map(([name, value]) => ({
						name,
						value,
					}));
				},
				setAll(cookies) {
					cookies.forEach((cookie) => {
						setCookie(cookie.name, cookie.value);
					});
				},
			},
		},
	);
}
