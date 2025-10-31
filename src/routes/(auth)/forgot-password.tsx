import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { forgotPassword } from '@/simmerbase/auth/forgot-password';
import { ErrorAlert } from './-components/error-alert';
import { ForgotPasswordForm } from './-components/forgot-password-form';

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

	return (
		<>
			{errorMsg && (
				<ErrorAlert errorTitle="Forgot Password Error" errorMsg={errorMsg} />
			)}
			<ForgotPasswordForm
				handleSubmit={(email: string) =>
					forgotPasswordMutation.mutate({ data: { email: email } })
				}
			/>
		</>
	);
}
