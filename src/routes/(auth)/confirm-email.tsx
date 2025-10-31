import { createFileRoute, Link } from '@tanstack/react-router';
import { FormLayout } from './-components/form-layout';

export const Route = createFileRoute('/(auth)/confirm-email')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<FormLayout
			title="Thank you for joining SIMMER!"
			description="Please check your email to verify your account."
		>
			<div className="flex w-full justify-center">
				<Link className="hover:underline" to="/login">
					Return to Login Page
				</Link>
			</div>
		</FormLayout>
	);
}
