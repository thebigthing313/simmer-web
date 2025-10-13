import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase-types'

export type SIMMERClient = SupabaseClient<Database>
/**
 * Creates and returns a SIMMERDatabase client instance using the provided Supabase URL and API key.
 *
 * @param url - The Supabase project URL.
 * @param key - The Supabase API key.
 * @returns A configured instance of SIMMERDatabase for interacting with the database.
 */
export function createSIMMERClient(url: string, key: string): SIMMERClient {
  const supabase = createClient<Database>(url, key)
  return supabase
}
