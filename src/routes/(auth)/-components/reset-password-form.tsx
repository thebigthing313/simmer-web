/* eslint-disable react/no-children-prop */
/** biome-ignore-all lint/correctness/noChildrenProp: <tanstack form> */

import { useForm } from '@tanstack/react-form';
import z from 'zod';
import { FormField } from '@/components/blocks/form-field';
import { SubmitButton } from '@/components/blocks/submit-button';
import { PasswordInput } from '@/components/inputs/password-input';
import { PasswordSchema } from '@/simmerbase/schemas/fields';
import { FormLayout } from './form-layout';

interface ResetPasswordFormProps {
	onResetPassword: (newPassword: string) => void;
}

const ResetPasswordSchema = z
	.object({
		password: PasswordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});

export function ResetPasswordForm({ onResetPassword }: ResetPasswordFormProps) {
	const form = useForm({
		validators: { onChange: ResetPasswordSchema },
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		onSubmit: async ({ value }) => {
			onResetPassword(value.password);
		},
	});

	return (
		<FormLayout title="Reset Password" description="Enter your new password">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<div className="grid gap-6">
					<form.Field
						name="password"
						children={(field) => {
							return (
								<FormField
									htmlFor={field.name}
									label="New Password"
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
									label="Confirm New Password"
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
								label="Reset Password"
								isLoading={isSubmitting}
								disabled={!canSubmit}
								className="w-full"
							/>
						)}
					/>
				</div>
			</form>
		</FormLayout>
	);
}
