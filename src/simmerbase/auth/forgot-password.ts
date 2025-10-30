import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { supabase } from '@/simmerbase/client';

export async function forgotPassword2(email: string): Promise<void> {}

const ForgottenPasswordSchema = z.object({
	email: z.email(),
});

export const forgotPassword = createServerFn({ method: 'POST' })
	.inputValidator(ForgottenPasswordSchema)
	.handler(async ({ data }) => {
		const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});

		if (error) {
			return { error: true, message: error.message };
		}
	});
