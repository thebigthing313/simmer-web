import { createFileRoute } from '@tanstack/react-router';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'sonner';
import type z from 'zod';
import { PhotoUploadDialog } from '@/components/photo-upload-dialog';
import { ButtonGroup } from '@/components/ui/button-group';
import { FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/forms/form-context';
import { groups } from '@/simmerbase/db/collections/groups';
import { useGroupBySlug } from '@/simmerbase/db/hooks/use-group';
import { ZodGroupsRow } from '@/simmerbase/schemas/groups';
import { uploadGroupImage } from '@/simmerbase/storage';

export const Route = createFileRoute('/$groupSlug/settings/')({
	component: () => (
		<ErrorBoundary fallback={<div>Error loading group information.</div>}>
			<Suspense fallback={null}>
				<RouteComponent />
			</Suspense>
		</ErrorBoundary>
	),
	loader: () => {
		return { crumb: 'Group Info' };
	},
});

function RouteComponent() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { group_role, group_id } = Route.useRouteContext();
	const { groupSlug } = Route.useParams();
	const { data } = useGroupBySlug(groupSlug);
	const { id, group_name, address, phone, fax, logo_url, website_url } = data;

	const isOwner = group_role === 'owner';

	const ZodGroupsUpdateForm = ZodGroupsRow.pick({
		id: true,
		group_name: true,
		address: true,
		phone: true,
		fax: true,
		website_url: true,
		logo_url: true,
	});

	const initDefaultValues: z.input<typeof ZodGroupsUpdateForm> = {
		id,
		group_name,
		address,
		phone,
		fax,
		logo_url,
		website_url,
	};
	const [defaultValues, setDefaultValues] = useState(initDefaultValues);

	const form = useAppForm({
		validators: { onSubmit: ZodGroupsUpdateForm },
		defaultValues: defaultValues,
		onSubmit: async ({ value }) => {
			if (value === defaultValues) {
				toast.info('No changes to save.');
				return;
			}

			groups.update(value.id, (draft) => {
				draft.group_name = value.group_name;
				draft.address = value.address;
				draft.phone = value.phone;
				draft.fax = value.fax;
				draft.website_url = value.website_url;
				draft.logo_url = value.logo_url;
			});

			setDefaultValues(value);
			toast.success('Group information updated successfully.');
		},
	});

	async function handleLogoSelect(file: File) {
		const uploadedUrl = await uploadGroupImage(file, group_id);
		groups.update(group_id, (draft) => {
			draft.logo_url = uploadedUrl;
		});
		toast.success('Logo updated successfully.');
		setIsDialogOpen(false);
		setDefaultValues((prev) => ({
			...prev,
			logo_url: uploadedUrl,
		}));
	}

	return (
		<form.AppForm>
			<form.FormWrapper
				className="max-w-lg"
				formLabel="Group Information"
				formDescription="Only group owners are allowed to edit this information."
			>
				<FieldGroup>
					<form.AppField name="group_name">
						{(field) => <field.TextField label="Group Name" />}
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
					<form.AppField name="website_url">
						{(field) => <field.TextField label="Website URL" />}
					</form.AppField>
					<form.AppField name="logo_url">
						{(field) => (
							<field.AvatarField
								label="Logo URL"
								onClick={() => setIsDialogOpen(true)}
							/>
						)}
					</form.AppField>
				</FieldGroup>
				{isOwner && (
					<ButtonGroup className="place-items-end">
						<form.ResetFormButton label="Reset" />
						<form.SubmitFormButton label="Save" />
					</ButtonGroup>
				)}
			</form.FormWrapper>
			<PhotoUploadDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onSubmit={handleLogoSelect}
			/>
		</form.AppForm>
	);
}
