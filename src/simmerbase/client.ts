import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/simmerbase/supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SBPUBLISHABLE_KEY;

export function getSupabaseBrowserClient() {
	return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
