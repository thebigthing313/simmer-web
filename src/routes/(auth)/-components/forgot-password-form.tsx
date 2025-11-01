/** biome-ignore-all lint/correctness/noChildrenProp: <tanstack form> */

import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import z from 'zod';
import { FormField } from '@/components/blocks/form-field';
import { SubmitButton } from '@/components/blocks/submit-button';
import { TextInput } from '@/components/inputs/text-input';
import { Button } from '@/components/ui/button';
import { EmailSchema } from '@/simmerbase/schemas/fields';
import { FormLayout } from './form-layout';

interface ForgotPasswordFormProps {
	handleSubmit: (email: string) => void;
}

const ForgotPasswordSchema = z.object({
	email: EmailSchema,
});

export function ForgotPasswordForm({ handleSubmit }: ForgotPasswordFormProps) {
	const form = useForm({
		validators: { onChange: ForgotPasswordSchema },
		defaultValues: { email: '' },
		onSubmit: async ({ value }) => handleSubmit(value.email),
	});

	return (
		<FormLayout
			title="Forgot Password"
			description="You will receive an email with a link to reset your password."
		>
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
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<SubmitButton
								label="Send Reset Link"
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
