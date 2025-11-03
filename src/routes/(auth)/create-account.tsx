import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod';
import { FieldDescription, FieldLegend, FieldSet } from '@/components/ui/field';
import { useAppForm } from '@/forms/form-context';
import { NameFieldGroupFields } from '@/forms/name-field-group';
import { createAccount } from '@/simmerbase/auth/create-account';
import { signOut } from '@/simmerbase/auth/sign-out';
import {
	EmailSchema,
	NameSchema,
	PasswordSchema,
} from '@/simmerbase/schemas/fields';
import { ErrorAlert } from './-components/error-alert';
import { FormLayout } from './-components/form-layout';

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

	const CreateAccountSchema = z
		.object({
			email: EmailSchema,
			fullName: z.object({ firstName: NameSchema, lastName: NameSchema }),
			password: PasswordSchema,
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords must match',
			path: ['confirmPassword'],
		});

	const form = useAppForm({
		validators: { onChange: CreateAccountSchema },
		defaultValues: {
			email: '',
			fullName: {
				firstName: '',
				lastName: '',
			},
			password: '',
			confirmPassword: '',
		},
		onSubmit: ({ value }) => {
			createMutation.mutate({
				data: {
					email: value.email,
					password: value.password,
					firstName: value.fullName.firstName,
					lastName: value.fullName.lastName,
				},
			});
		},
	});

	return (
		<>
			{errorMsg && (
				<ErrorAlert errorTitle="Account Creation Error" errorMsg={errorMsg} />
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
						<FieldLegend>Create Account</FieldLegend>
						<FieldDescription>Sign up for a new account</FieldDescription>
						<form.AppField name="email">
							{(field) => <field.TextField label="Email" />}
						</form.AppField>
						<form.AppForm>
							<NameFieldGroupFields form={form} fields="fullName" />
						</form.AppForm>
						<form.AppField name="password">
							{(field) => <field.PasswordField label="Password" />}
						</form.AppField>
						<form.AppField name="confirmPassword">
							{(field) => <field.PasswordField label="Confirm Password" />}
						</form.AppField>
						<form.AppForm>
							<form.SubmitFormButton
								label="Create New Account"
								className="w-full"
							/>
						</form.AppForm>
					</FieldSet>
					<div className="grid gap-6"></div>
				</form>
			</FormLayout>
		</>
	);
}
