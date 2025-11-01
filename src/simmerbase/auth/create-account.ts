import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { getSupabaseClient } from '../client';
import { PasswordSchema } from '../schemas/fields';

export type CreateAccountArgs = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

const CreateAccountSchema = z.object({
	email: z.email(),
	password: PasswordSchema,
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});

export const createAccount = createServerFn({ method: 'POST' })
	.inputValidator(CreateAccountSchema)
	.handler(async ({ data }) => {
		const { email, password, firstName, lastName } = data;
		const supabase = getSupabaseClient();

		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					first_name: firstName,
					last_name: lastName,
				},
			},
		});

		if (error) {
			return {
				error: true,
				message: error.message,
			};
		}
	});
