import { supabase } from '@/simmerbase/client';

export type CreateAccountArgs = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

/**
 * Creates a new user account via Supabase authentication.
 *
 * Signs up a user with the provided email and password and stores the
 * first and last name as user metadata (keys: `first_name`, `last_name`).
 * Throws on any Supabase error or if sign-up completes without a created user.
 *
 * @param args - The account creation arguments.
 * @param args.supabase - An initialized Supabase client with auth capabilities.
 * @param args.email - The email address to register.
 * @param args.password - The password for the new account.
 * @param args.firstName - The user's first name (saved as `first_name` metadata).
 * @param args.lastName - The user's last name (saved as `last_name` metadata).
 *
 * @throws {Error} When Supabase returns an error during sign-up.
 * @throws {Error} When sign-up succeeds but no user is present in the response.
 *
 * @returns A promise that resolves when account creation completes (void).
 */
export async function createAccount({
	email,
	password,
	firstName,
	lastName,
}: CreateAccountArgs): Promise<void> {
	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: {
				first_name: firstName,
				last_name: lastName,
			},
		},
	});

	if (error) throw error;
	if (!data.user)
		throw new Error('Account creation failed for an unknown reason');
}
