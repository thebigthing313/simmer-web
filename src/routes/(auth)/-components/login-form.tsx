/** biome-ignore-all lint/correctness/noChildrenProp: <tanstack form docs> */
/** biome-ignore-all lint/correctness/useUniqueElementIds: <form fields> */

import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import z from 'zod';
import { FormField } from '@/components/blocks/form-field';
import { SubmitButton } from '@/components/blocks/submit-button';
import { PasswordInput } from '@/components/inputs/password-input';
import { TextInput } from '@/components/inputs/text-input';
import { Button } from '@/components/ui/button';
import { EmailSchema, PasswordSchema } from '@/simmerbase/schemas/fields';
import { FormLayout } from './form-layout';

type LoginFormProps = {
	onEmailLogin: (email: string, password: string) => void;
	onForgotPassword: () => void;
};

const LoginSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});

export function LoginForm({ onEmailLogin, onForgotPassword }: LoginFormProps) {
	const form = useForm({
		validators: { onBlur: LoginSchema },
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			onEmailLogin(value.email, value.password);
		},
	});

	return (
		<FormLayout title="Welcome back!" description="Login to your account">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div className="grid gap-6">
					<form.Field
						name="email"
						children={(field) => {
							return (
								<FormField
									htmlFor={field.name}
									label="Email"
									errors={field.state.meta.errors}
								>
									<TextInput
										required
										name={field.name}
										id={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
								</FormField>
							);
						}}
					/>

					<form.Field
						name="password"
						children={(field) => {
							return (
								<FormField
									htmlFor={field.name}
									label="Password"
									errors={field.state.meta.errors}
								>
									<PasswordInput
										required
										id={field.name}
										name={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
								</FormField>
							);
						}}
					/>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<SubmitButton
								label="Login"
								isLoading={isSubmitting}
								disabled={!canSubmit}
								className="w-full"
							/>
						)}
					/>
				</div>
			</form>
			<div className="grid mt-4">
				<Button
					variant="link"
					size="sm"
					className="text-sm underline-offset-4 hover:underline"
					onClick={onForgotPassword}
				>
					Forgot your password?
				</Button>
				<div className="text-center text-sm">
					Don&apos;t have an account?{' '}
					<Link to="/create-account" className="underline underline-offset-4">
						Create one here.
					</Link>
				</div>
			</div>
		</FormLayout>
	);
}
