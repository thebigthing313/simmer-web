import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { profilesCollection } from '@/collections/profiles'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { TextInput } from '@/components/form-fields/text-input'
import { FieldSet, FieldLegend, FieldGroup } from '@/components/ui/field'
import { selectProfilesSchema } from '@/types/db-schemas'
import { NameSchema } from '@/types/form-schemas'
import { eq } from '@tanstack/db'
import { useLiveQuery } from '@tanstack/react-db'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

export const Route = createFileRoute('/(user)/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { supabase, queryClient, profile_id } = useRouteContext({
    from: '/(user)',
  })
  const profiles = profilesCollection(supabase, queryClient)
  const { data } = useLiveQuery((q) =>
    q
      .from({ profile: profiles })
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
      profiles.update(profile_id, (profile) => {
        profile.first_name = value.first_name
        profile.last_name = value.last_name
        profile.bio = value.bio
        profile.avatar_url = value.avatar_url
        profile.profile_photo_url = value.profile_photo_url
      })
      toast.success('Profile updated successfully')
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
