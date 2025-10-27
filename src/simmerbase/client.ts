import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/simmerbase/supabase-types';

type SIMMERClient = SupabaseClient<Database>;

/**
 * Factory to create a SIMMER Supabase client. This returns a new client instance.
 * Prefer importing the shared `supabase` singleton below to avoid multiple
 * GoTrueClient instances sharing the same browser storage key.
 */
function createSIMMERClient(url: string, key: string): SIMMERClient {
	return createClient<Database>(url, key, {
		// Use an explicit storage key to avoid conflicts if multiple clients are
		// ever created unintentionally. Prefer the exported singleton instead.
		auth: { storageKey: 'simmer-auth' },
	});
}

// Export a shared supabase client instance created from Vite env vars.
// Import this singleton where possible so only one GoTrueClient is created
// in the same browser context.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase: SIMMERClient = createSIMMERClient(
	supabaseUrl,
	supabaseAnonKey,
);
