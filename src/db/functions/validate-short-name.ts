import { supabase } from '@/db/client'

export async function validateShortName(slug: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('groups')
    .select('id')
    .eq('short_name', slug)
    .maybeSingle()
  if (error) return false
  // return true when available
  return data === null
}
