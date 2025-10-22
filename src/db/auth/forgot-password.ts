import { supabase } from '@/db/client'

/**
 * Sends a password reset email to the specified user using Supabase authentication.
 *
 * @param supabase - The Supabase client instance for database and authentication operations.
 * @param email - The email address of the user requesting a password reset.
 * @returns A promise that resolves with the response data from Supabase if successful.
 * @throws Throws an error if the Supabase request fails or if no data is returned.
 */
export async function forgotPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}
