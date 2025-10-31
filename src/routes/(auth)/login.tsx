import { useMutation } from '@tanstack/react-query';
import {
	createFileRoute,
	useNavigate,
	useRouter,
} from '@tanstack/react-router';
import { useState } from 'react';
import { signInWithPassword } from '@/simmerbase/auth/sign-in-password';
import { ErrorAlert } from './-components/error-alert';
import { LoginForm } from './-components/login-form';

export const Route = createFileRoute('/(auth)/login')({
	component: RouteComponent,
});

function RouteComponent() {
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const navigate = useNavigate();
	const router = useRouter();
	const login = useMutation({
		mutationFn: signInWithPassword,
		onSettled: async (ctx) => {
			if (ctx?.error) {
				setErrorMsg(ctx.message);
			}

			if (ctx && !ctx.error) {
				await router.invalidate();
				router.navigate({ to: '/' });
			}
		},
	});

	return (
		<>
			{errorMsg && <ErrorAlert errorTitle="Login Error" errorMsg={errorMsg} />}
			<LoginForm
				onEmailLogin={async (email, password) =>
					login.mutate({ data: { email: email, password: password } })
				}
				onForgotPassword={() => navigate({ to: '/forgot-password' })}
			/>
		</>
	);
}
