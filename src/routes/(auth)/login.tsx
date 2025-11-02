/** biome-ignore-all lint/correctness/noChildrenProp: <Tanstack Form docs> */
import { useMutation } from '@tanstack/react-query';
import {
	createFileRoute,
	Link,
	useNavigate,
	useRouter,
} from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppForm } from '@/forms/form-context';
import { signInWithPassword } from '@/simmerbase/auth/sign-in-password';
import { EmailSchema, PasswordSchema } from '@/simmerbase/schemas/fields';
import { ErrorAlert } from './-components/error-alert';
import { FormLayout } from './-components/form-layout';

export const Route = createFileRoute('/(auth)/login')({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const router = useRouter();
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const login = useMutation({
		mutationFn: signInWithPassword,
		onSettled: async (ctx) => {
			if (ctx?.error) {
				setErrorMsg(ctx.message);
				return;
			}

			await router.invalidate();
			router.navigate({ to: '/' });
		},
	});

	const form = useAppForm({
		defaultValues: {
			email: '',
			password: '',
		},
		onSubmit: async ({ value }) => {
			login.mutate({ data: { email: value.email, password: value.password } });
		},
	});

	return (
		<>
			{errorMsg && <ErrorAlert errorTitle="Login Error" errorMsg={errorMsg} />}
			<FormLayout title="Welcome back!" description="Login to your account">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div className="grid gap-6">
						<form.AppField
							validators={{ onBlur: EmailSchema }}
							name="email"
							children={(field) => <field.TextField label="Email" />}
						/>

						<form.AppField
							validators={{ onChange: PasswordSchema }}
							name="password"
							children={(field) => <field.PasswordField label="Password" />}
						/>
						<form.AppForm>
							<form.SubmitFormButton label="Login" className="w-full" />
						</form.AppForm>
					</div>
				</form>
				<div className="grid mt-4">
					<Button
						variant="link"
						size="sm"
						className="text-sm underline-offset-4 hover:underline"
						onClick={() => navigate({ to: '/forgot-password' })}
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
		</>
	);
}
