import { createFileRoute } from '@tanstack/react-router';
import { H2, P } from '@/components/typography';
import { FormLayout } from './-components/form-layout';

export const Route = createFileRoute('/(auth)/confirm-email')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<FormLayout showReturnToLogin>
			<H2>Thank you for joining SIMMER!</H2>
			<P>Please check your email to verify your account.</P>
		</FormLayout>
	);
}
