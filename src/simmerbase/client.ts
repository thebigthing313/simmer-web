import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/simmerbase/supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function getSupabaseBrowserClient() {
	return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
