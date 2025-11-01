/** biome-ignore-all lint/correctness/noChildrenProp: <tanstack form> */
import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import z from 'zod';
import { FormField } from '@/components/blocks/form-field';
import { SubmitButton } from '@/components/blocks/submit-button';
import { PasswordInput } from '@/components/inputs/password-input';
import { TextInput } from '@/components/inputs/text-input';
import { Button } from '@/components/ui/button';
import {
	EmailSchema,
	NameSchema,
	PasswordSchema,
} from '@/simmerbase/schemas/fields';
import { FormLayout } from './form-layout';

type CreateAccountArgs = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};
interface CreateAccountFormProps {
	onCreateAccount: (args: CreateAccountArgs) => void;
}

const CreateAccountSchema = z
	.object({
		email: EmailSchema,
		firstName: NameSchema,
		lastName: NameSchema,
		password: PasswordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});

export function CreateAccountForm({ onCreateAccount }: CreateAccountFormProps) {
	const form = useForm({
		validators: { onChange: CreateAccountSchema },
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			confirmPassword: '',
		},
		onSubmit: ({ value }) => {
			onCreateAccount({
				email: value.email,
				password: value.password,
				firstName: value.firstName,
				lastName: value.lastName,
			});
		},
	});

	return (
		<FormLayout title="Create Account" description="Sign up for a new account">
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
						name="firstName"
						children={(field) => {
							return (
								<FormField
									htmlFor={field.name}
									label="First Name"
									errors={field.state.meta.errors}
								>
									<TextInput
										id={field.name}
										name={field.name}
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
								</FormField>
							);
						}}
					/>
					<form.Field
						name="lastName"
						children={(field) => {
							return (
								<FormField
									htmlFor={field.name}
									label="First Name"
									errors={field.state.meta.errors}
								>
									<TextInput
										id={field.name}
										name={field.name}
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
					<form.Field
						name="confirmPassword"
						children={(field) => {
							return (
								<FormField
									htmlFor={field.name}
									label="Confirm Password"
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
								label="Create Account"
								isLoading={isSubmitting}
								disabled={!canSubmit}
								className="w-full"
							/>
						)}
					/>
					<Button type="button" variant="secondary" asChild>
						<Link to="/login">Back to Login Page</Link>
					</Button>
				</div>
			</form>
		</FormLayout>
	);
}
