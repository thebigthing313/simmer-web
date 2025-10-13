/* eslint-disable react/no-children-prop */
import { NameSchema } from '@repo/shared-types/form-schemas'
import { Update } from '@repo/supabase/db/data-types'
import { profileByIdQueryOptions } from '@repo/supabase/db/profiles'
import { TextInput } from '@repo/ui/form-fields/text-input'
import { useForm } from '@tanstack/react-form'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { FieldSet, FieldLegend, FieldGroup } from '@repo/ui/components/field'
import z from 'zod'
import { SubmitButton } from '@repo/ui/form-fields/submit-button'
import { selectProfilesSchema } from '@/types/db-schemas'
import { useLiveQuery } from 'node_modules/@tanstack/react-db/dist/esm/useLiveQuery'
import { eq } from '@tanstack/db'
import { profilesCollection } from '@/collections/profiles'

type ProfileUpdate = Update<'profiles'>
// (parameter) data: {
//     avatar_url?: string | null | undefined;
//     created_at?: string | undefined;
//     created_by?: string | null | undefined;
//     deleted_at?: string | null | undefined;
//     deleted_by?: string | null | undefined;
//     first_name?: string | undefined;
//     group_id?: string | null | undefined;
//     id?: string | undefined;
//     last_name?: string | undefined;
//     profile_photo_url?: string | null | undefined;
//     updated_at?: string | null | undefined;
//     updated_by?: string | null | undefined;
//     user_id?: string | null | undefined;

interface ProfileFormProps {
  onUpdateProfile: (data: ProfileUpdate, id: string) => void
}

export function ProfileForm({ onUpdateProfile }: ProfileFormProps) {
  const { supabase, queryClient, profile_id } = useRouteContext({
    from: '/(user)',
  })
  const { data } = useLiveQuery((q) =>
    q
      .from({ profile: profilesCollection(supabase, queryClient) })
      .where(({ profile }) => eq(profile.id, profile_id)),
  )

  const profile = data[0]

  const defaultValues = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    bio: profile.bio,
    avatar_url: profile.avatar_url,
    profile_photo_url: profile.profile_photo_url,
  }

  const form = useForm({
    validators: { onSubmitAsync: selectProfilesSchema },
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      const profile: ProfileUpdate = {
        first_name: value.first_name,
        last_name: value.last_name,
        bio: value.bio,
        avatar_url: value.avatar_url,
        profile_photo_url: value.profile_photo_url,
      }
      onUpdateProfile(profile, profile_id)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldSet>
        <FieldLegend className="flex flex-row gap-2" variant="legend">
          <span>Profile Information</span>
        </FieldLegend>
        <FieldGroup className="@container/field-group flex flex-col gap-2">
          <form.Field
            validators={{ onChange: NameSchema }}
            name="first_name"
            children={(field) => {
              return (
                <TextInput
                  id="first_name"
                  label="First Name"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  isValid={field.state.meta.isValid}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )
            }}
          />
          <form.Field
            validators={{ onChange: NameSchema }}
            name="last_name"
            children={(field) => {
              return (
                <TextInput
                  id="last_name"
                  label="Last Name"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  isValid={field.state.meta.isValid}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )
            }}
          />
        </FieldGroup>
      </FieldSet>
      <form.Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isDefaultValue,
        ]}
        children={([canSubmit, isSubmitting, isDefaultValue]) => (
          <SubmitButton
            label="Save Changes"
            isLoading={isSubmitting}
            disabled={!canSubmit || isDefaultValue}
            className="w-full"
          />
        )}
      />
    </form>
  )
}
