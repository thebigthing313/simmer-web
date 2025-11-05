import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { createClientOnlyFn } from '@tanstack/react-start';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field';
import { useAppForm } from '@/forms/form-context';
import { resetPassword } from '@/simmerbase/auth/reset-password';
import { signOut } from '@/simmerbase/auth/sign-out';
import { PasswordSchema } from '@/simmerbase/schemas/fields';
import { ErrorAlert } from './-components/error-alert';
import { FormLayout } from './-components/form-layout';

export const Route = createFileRoute('/(auth)/reset-password')({
	component: RouteComponent,
});

const ResetPasswordSchema = z
	.object({
		password: PasswordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords must match',
		path: ['confirmPassword'],
	});

function RouteComponent() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	// Parse error info from the URL hash (used by Supabase for error redirects)
	const { error, error_code, error_description } = parseHashParams();

	const resetMutation = useMutation({
		mutationFn: resetPassword,
		onSettled: async (ctx) => {
			if (ctx?.error) {
				setErrorMsg(ctx.message);
			} else {
				await signOut();
				setSuccess(true);
			}
		},
	});

	const form = useAppForm({
		validators: { onChange: ResetPasswordSchema },
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		onSubmit: async ({ value }) => {
			resetMutation.mutate({ data: { password: value.password } });
		},
	});

	// If there is an error in the hash, show an error alert
	if (error && error_code && error_description) {
		return (
			<ErrorAlert
				errorTitle={`${error.toUpperCase()}: ${error_code.toUpperCase()}`}
				errorMsg={error_description}
			/>
		);
	}

	return (
		<>
			{/* Show error message if password reset fails */}
			{errorMsg && (
				<ErrorAlert errorTitle="Password Reset Error" errorMsg={errorMsg} />
			)}
			{/* Show success message after password reset */}
			{success && <SuccessfulReset />}
			{/* Show the reset password form if not successful yet */}
			{!success && (
				<FormLayout showReturnToLogin>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<FieldSet>
							<FieldLegend>Reset Password</FieldLegend>
							<FieldDescription>Enter your new password</FieldDescription>
							<FieldGroup>
								<form.AppField name="password">
									{(field) => <field.PasswordField label="New Password" />}
								</form.AppField>
								<form.AppField name="confirmPassword">
									{(field) => (
										<field.PasswordField label="Confirm New Password" />
									)}
								</form.AppField>

								<form.AppForm>
									<form.SubmitFormButton
										label="Reset Password"
										className="w-full"
									/>
								</form.AppForm>
							</FieldGroup>
						</FieldSet>
					</form>
				</FormLayout>
			)}
		</>
	);
}

function SuccessfulReset() {
	return (
		<Alert className="mb-2">
			<CircleCheck />
			<AlertTitle>Password reset successful!</AlertTitle>
			<AlertDescription>
				<Link className="hover:underline" to="/login">
					Click here to return to the login page.
				</Link>
			</AlertDescription>
		</Alert>
	);
}

// Helper to parse error params from the hash fragment (for Supabase error redirects)
const parseHashParams = createClientOnlyFn(() => {
	const hash = window.location.hash.substring(1); // remove the '#'
	const params = new URLSearchParams(hash);
	return {
		error: params.get('error'),
		error_code: params.get('error_code'),
		error_description: params.get('error_description'),
	};
});
