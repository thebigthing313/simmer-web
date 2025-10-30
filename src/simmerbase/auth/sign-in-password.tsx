import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { getSupabaseServerClient } from '../ssr-client';

const SignInWithPasswordSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
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
