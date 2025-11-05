import { createClient } from '@supabase/supabase-js';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
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

		const supabaseUrl = process.env.SUPABASE_URL;
		const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

		const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

		const { data: user, error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			return {
				error: true,
				message: error.message,
			};
		}

		if (!user?.user?.id) {
			return {
				error: true,
				message: 'Account creation failed: No user ID returned',
			};
		}

		const { error: profileError } = await supabase
			.from('profiles')
			.insert({
				id: crypto.randomUUID(),
				user_id: user.user.id,
				first_name: firstName,
				last_name: lastName,
			})
			.select()
			.single();

		if (profileError) {
			return {
				error: true,
				message: `Profile creation failed: ${profileError.message}`,
			};
		}
	});
