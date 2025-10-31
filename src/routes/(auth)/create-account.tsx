import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { createAccount } from '@/simmerbase/auth/create-account';
import { signOut } from '@/simmerbase/auth/sign-out';
import { CreateAccountForm } from './-components/create-account-form';
import { ErrorAlert } from './-components/error-alert';

export const Route = createFileRoute('/(auth)/create-account')({
	beforeLoad: ({ context }) => {
		const { user_id, profile_id } = context;
		if (user_id && profile_id) {
			throw redirect({ to: '/' });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const createMutation = useMutation({
		mutationFn: createAccount,
		onSettled: async (ctx) => {
			if (ctx?.error) {
				setErrorMsg(ctx.message);
				return;
			}

			await signOut();
			throw redirect({ to: '/confirm-email' });
		},
	});

	return (
		<>
			{errorMsg && (
				<ErrorAlert errorTitle="Account Creation Error" errorMsg={errorMsg} />
			)}
			<CreateAccountForm
				onCreateAccount={(args) =>
					createMutation.mutate({
						data: {
							email: args.email,
							password: args.password,
							firstName: args.firstName,
							lastName: args.lastName,
						},
					})
				}
			/>
		</>
	);
}
