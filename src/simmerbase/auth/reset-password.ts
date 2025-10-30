import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { PasswordSchema } from '../schemas/fields';
import { getSupabaseServerClient } from '../ssr-client';

const ResetPasswordSchema = z.object({
	password: PasswordSchema,
});

export const resetPassword = createServerFn({ method: 'POST' })
	.inputValidator(ResetPasswordSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseServerClient();
		const { error } = await supabase.auth.updateUser({
			password: data.password,
		});

		if (error) throw error;

		return data;
	});
