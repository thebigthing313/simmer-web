import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/simmerbase/supabase-types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: { storageKey: 'simmer-auth' },
});
