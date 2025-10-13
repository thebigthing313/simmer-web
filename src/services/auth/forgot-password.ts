import type { SIMMERClient } from '@/services/data/client'

/**
 * Sends a password reset email to the specified user using Supabase authentication.
 *
 * @param supabase - The Supabase client instance for database and authentication operations.
 * @param email - The email address of the user requesting a password reset.
 * @returns A promise that resolves with the response data from Supabase if successful.
 * @throws Throws an error if the Supabase request fails or if no data is returned.
 */
export async function forgotPassword(supabase: SIMMERClient, email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
  if (!data) throw new Error('An expected error occurred. Please try again.')
  return data
}
