import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { createIsomorphicFn } from '@tanstack/react-start';
import { getCookies, setCookie } from '@tanstack/react-start/server';
import type { Database } from '@/simmerbase/supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SBPUBLISHABLE_KEY;

export const getSupabaseBrowserClient = () => {
	return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
};

export const getSupabaseServerClient = () => {
	if (
		!process.env.VITE_SUPABASE_URL ||
		!process.env.VITE_SUPABASE_SBPUBLISHABLE_KEY
	) {
		throw new Error(
			'SUPABASE_URL and VITE_SUPABASE_SBPUBLISHABLE_KEY must be set in environment variables',
		);
	}
	return createServerClient<Database>(
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
};

export const getSupabaseClient = createIsomorphicFn()
	.server(() => getSupabaseServerClient())
	.client(() => getSupabaseBrowserClient());
