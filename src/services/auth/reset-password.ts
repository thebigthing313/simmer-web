import type { SIMMERClient } from '@/services/data/client'

/**
 * Resets the password for the currently authenticated user using the provided Supabase client.
 *
 * @param supabase - An instance of the SIMMERClient (Supabase client) used to perform the password update.
 * @param password - The new password to set for the user.
 * @returns A promise that resolves with the updated user data.
 * @throws Throws an error if the password update fails or if no data is returned.
 */
export async function resetPassword(supabase: SIMMERClient, password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) throw error
  if (!data) throw new Error('An unexpected error occured.')

  return data
}
