import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { getSupabaseClient } from '../client';
import { PasswordSchema } from '../schemas/fields';

const SignInWithPasswordSchema = z.object({
	email: z.email(),
	password: PasswordSchema,
});

export const signInWithPassword = createServerFn({ method: 'POST' })
	.inputValidator(SignInWithPasswordSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseClient();

		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});
		if (error) {
			return {
				error: true,
				message: error.message,
			};
		}
	});
