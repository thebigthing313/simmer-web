import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PhotoUploadDialog } from '@/components/photo-upload-dialog';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field';
import { useAppForm } from '@/forms/form-context';
import { NameFieldGroupFields } from '@/forms/name-field-group';
import { buildChangeSet } from '@/lib/utils';
import { profiles } from '@/simmerbase/db/collections/profiles';
import { useProfile } from '@/simmerbase/db/hooks/use-profile';
import {
	type ZodProfilesRowType,
	ZodProfilesUpdate,
	type ZodProfilesUpdateType,
} from '@/simmerbase/schemas/profiles';
import { uploadAvatar } from '@/simmerbase/storage';

export const Route = createFileRoute('/(user)/profile')({
	component: RouteComponent,
	loader: async () => {
		await profiles.preload();
	},
});

const initDefaultValues: ZodProfilesRowType = {
	id: '',
	user_id: '',
	first_name: '',
	last_name: '',
	bio: '',
	avatar_url: null,
};

function RouteComponent() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [defaultValues, setDefaultValues] =
		useState<ZodProfilesRowType>(initDefaultValues);
	const { profile_id } = Route.useRouteContext();
	const { data } = useProfile(profile_id);

	useEffect(() => {
		if (data) {
			setDefaultValues({
				id: data.id,
				user_id: data.user_id,
				first_name: data.first_name,
				last_name: data.last_name,
				bio: data.bio ?? '',
				avatar_url: data.avatar_url,
			});
		}
	}, [data]);

	const form = useAppForm({
		defaultValues: defaultValues,
		onSubmit: ({ value }) => {
			if (value === defaultValues) {
				toast.info('No changes to save.');
			} else {
				const changes = ZodProfilesUpdate.parse(
					buildChangeSet<ZodProfilesUpdateType>(defaultValues, value),
				);

				// Update using Immer-style mutations (mutate the draft, don't return a new object)
				profiles.update(profile_id, (draft) => {
					// Mutate the draft directly for each changed field
					for (const [key, value] of Object.entries(changes)) {
						// biome-ignore lint/suspicious/noExplicitAny: Dynamic property assignment
						(draft as any)[key] = value;
					}
					// Don't return anything - Immer tracks the mutations
				});

				toast.success('Changes saved successfully.');
				setDefaultValues(value);
			}
		},
	});

	async function handleAvatarSelect(file: File) {
		const uploadedUrl = await uploadAvatar(file);
		profiles.update(profile_id, (draft) => {
			draft.avatar_url = uploadedUrl;
		});
		toast.success('Avatar updated successfully.');
		setIsDialogOpen(false);
		setDefaultValues((prev) => ({
			...prev,
			avatar_url: uploadedUrl,
		}));
	}

	return (
		<Card className="max-w-xl">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<CardContent>
					<FieldSet>
						<FieldLegend>Profile</FieldLegend>
						<FieldDescription>
							Update your profile information.
						</FieldDescription>
						<FieldGroup>
							<form.AppForm>
								<NameFieldGroupFields
									form={form}
									fields={{ firstName: 'first_name', lastName: 'last_name' }}
								/>
							</form.AppForm>

							<form.AppField name="avatar_url">
								{(field) => (
									<field.AvatarField
										label="Avatar"
										onClick={() => setIsDialogOpen(true)}
									/>
								)}
							</form.AppField>
							<form.AppField name="bio">
								{(field) => (
									<field.StyledTextField
										label="Bio"
										description="This will be displayed on your profile."
									/>
								)}
							</form.AppField>
						</FieldGroup>
					</FieldSet>
				</CardContent>
				<CardFooter className="flex justify-end gap-2 mt-4">
					<form.AppForm>
						<form.ResetFormButton />
						<form.SubmitFormButton label="Save Changes" />
					</form.AppForm>
				</CardFooter>
			</form>
			<PhotoUploadDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onSubmit={handleAvatarSelect}
			/>
		</Card>
	);
}
