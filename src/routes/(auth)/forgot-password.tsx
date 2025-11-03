import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod';
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field';
import { useAppForm } from '@/forms/form-context';
import { forgotPassword } from '@/simmerbase/auth/forgot-password';
import { EmailSchema } from '@/simmerbase/schemas/fields';
import { ErrorAlert } from './-components/error-alert';
import { FormLayout } from './-components/form-layout';

export const Route = createFileRoute('/(auth)/forgot-password')({
	component: RouteComponent,
});

function RouteComponent() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const forgotPasswordMutation = useMutation({
		mutationFn: forgotPassword,
		onSettled: (ctx) => {
			if (ctx?.error) {
				setErrorMsg(ctx.message);
			}
		},
	});

	const ForgotPasswordSchema = z.object({
		email: EmailSchema,
	});

	const form = useAppForm({
		validators: { onChange: ForgotPasswordSchema },
		defaultValues: { email: '' },
		onSubmit: async ({ value }) =>
			forgotPasswordMutation.mutate({ data: { email: value.email } }),
	});

	return (
		<>
			{errorMsg && (
				<ErrorAlert errorTitle="Forgot Password Error" errorMsg={errorMsg} />
			)}
			<FormLayout showReturnToLogin>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<FieldSet>
						<FieldLegend>Forgot Password</FieldLegend>
						<FieldDescription>
							You will receive an e-mail with a link to reset your password.
						</FieldDescription>
						<FieldGroup>
							<form.AppField name="email">
								{(field) => <field.TextField label="Email" />}
							</form.AppField>
							<form.AppForm>
								<form.SubmitFormButton
									label="Send Reset Link"
									className="w-full"
								/>
							</form.AppForm>
						</FieldGroup>
					</FieldSet>
				</form>
			</FormLayout>
		</>
	);
}
