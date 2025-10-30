import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { PasswordSchema } from '../schemas/fields';
import { getSupabaseServerClient } from '../ssr-client';

const SignInWithPasswordSchema = z.object({
	email: z.email(),
	password: PasswordSchema,
});

export const signInWithPassword = createServerFn({ method: 'POST' })
	.inputValidator(SignInWithPasswordSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient();

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
