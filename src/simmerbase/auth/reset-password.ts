import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { getSupabaseClient } from '../client';
import { PasswordSchema } from '../schemas/fields';

const ResetPasswordSchema = z.object({
	password: PasswordSchema,
});

export const resetPassword = createServerFn({ method: 'POST' })
	.inputValidator(ResetPasswordSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseClient();
		const { error } = await supabase.auth.updateUser({
			password: data.password,
		});

		if (error) {
			return {
				error: true,
				message: error.message,
			};
		}
	});
