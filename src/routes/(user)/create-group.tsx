import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import z from 'zod';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field';
import { useAppForm } from '@/forms/form-context';
import { group_profiles } from '@/simmerbase/db/collections/group_profiles';
import { groups } from '@/simmerbase/db/collections/groups';
import { validateShortName } from '@/simmerbase/functions/validate-short-name';
import type { ZodGroupsRowType } from '@/simmerbase/schemas/groups';

export const Route = createFileRoute('/(user)/create-group')({
	component: RouteComponent,
});

const defaultValues: ZodGroupsRowType = {
	id: '',
	address: '',
	group_name: '',
	phone: '',
	short_name: '',
	fax: '',
	logo_url: '',
	website_url: '',
};

const ShortNameSchema = z
	.string()
	.min(2, 'Short name must be at least 2 characters')
	.max(15, 'Short name cannot exceed 15 characters')
	.regex(
		/^[a-z0-9-]+$/,
		'Short name may only contain lowercase letters, numbers, and hyphens',
	)
	.refine(async (slug: string) => validateShortName(slug), {
		message: 'Short name is already taken',
	});

function RouteComponent() {
	console.log('Group Collection IsReady:', groups.isReady());
	console.log('Group Collection State:', groups.state);
	const navigate = useNavigate();
	const form = useAppForm({
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			const insertValue = {
				...value,
				id: crypto.randomUUID(),
			};
			const tx = groups.insert(insertValue, { optimistic: false });
			try {
				await tx.isPersisted.promise;
				await groups.utils.refetch();
				await group_profiles.utils.refetch();
				navigate({
					to: '/$groupSlug',
					params: { groupSlug: insertValue.short_name },
				});
			} catch (error) {
				console.error('Failed to create group', error);
				toast.error(
					`Failed to create group. Error: ${(error as Error).message}`,
				);
			}
		},
	});

	return (
		<Card className="max-w-lg">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<CardContent>
					<FieldSet>
						<FieldLegend>Create Group</FieldLegend>
						<FieldDescription>
							You will automatically be assigned as the owner of the group.
						</FieldDescription>
						<FieldGroup>
							<form.AppField name="group_name">
								{(field) => <field.TextField label="Group Name" />}
							</form.AppField>
							<form.AppField
								name="short_name"
								validators={{
									onBlurAsync: ShortNameSchema,
								}}
							>
								{(field) => (
									<field.TextField
										label="Short Name"
										description="This will be used as the part of the URL to your group page."
										showValid={
											field.state.meta.isDirty && field.state.meta.isValid
										}
									/>
								)}
							</form.AppField>
							<form.AppField name="address">
								{(field) => <field.TextField label="Address" />}
							</form.AppField>
							<form.AppField name="phone">
								{(field) => <field.PhoneField label="Phone" />}
							</form.AppField>
							<form.AppField name="fax">
								{(field) => <field.PhoneField label="Fax" showExt={false} />}
							</form.AppField>
						</FieldGroup>
						<form.AppField name="website_url">
							{(field) => <field.TextField label="Website URL" />}
						</form.AppField>
					</FieldSet>
				</CardContent>
				<CardFooter className="flex justify-end gap-2 mt-4">
					<form.AppForm>
						<form.ResetFormButton />
						<form.SubmitFormButton label="Create Group" />
					</form.AppForm>
				</CardFooter>
			</form>
		</Card>
	);
}
