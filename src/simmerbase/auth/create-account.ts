import { redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { getSupabaseServerClient } from '../ssr-client';

export type CreateAccountArgs = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

const CreateAccountSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	redirectTo: z.url(),
});

export const createAccount = createServerFn({ method: 'POST' })
	.inputValidator(CreateAccountSchema)
	.handler(async ({ data }) => {
		const { email, password, firstName, lastName } = data;
		const supabase = getSupabaseServerClient();

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

		if (error) throw error;

		throw redirect({ to: '/confirm-email' });
	});
