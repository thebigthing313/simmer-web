import { useForm } from '@tanstack/react-form'
import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ZodProfileUpdateType } from '@/db/schemas/profiles'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { TextInput } from '@/components/form-fields/text-input'
import { FieldGroup, FieldLegend, FieldSet } from '@/components/ui/field'
import { NameSchema } from '@/types/form-schemas'
import { buildChangedFields } from '@/lib/utils'
import { ZodProfileUpdate } from '@/db/schemas/profiles'
import { useProfile } from '@/db/hooks/use-profile'

export const Route = createFileRoute('/(user)/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { profile_id } = useRouteContext({ from: '/(user)' })
  const { query, collection } = useProfile(profile_id)
  const profile = query.data[0]

  const defaultValues: ZodProfileUpdateType = {
    first_name: profile.first_name,
    last_name: profile.last_name,
    bio: profile.bio,
    avatar_url: profile.avatar_url,
    profile_photo_url: profile.profile_photo_url,
  }

  const form = useForm({
    validators: {
      onChange: ZodProfileUpdate,
    },
    defaultValues: defaultValues,
    onSubmit: ({ value }) => {
      const changed = buildChangedFields<ZodProfileUpdateType>(
        value,
        defaultValues,
      )
      if (Object.keys(changed).length > 0) {
        collection.update(profile.id, (draft) => {
          Object.assign(draft, changed)
          Object.assign(defaultValues, changed)
        })
        toast.success('Profile updated successfully.')
      } else {
        toast.info('No changes to save.')
      }
    },
  })

  return (
    <div className="flex flex-col gap-2">
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
            <form.Field
              name="bio"
              children={(field) => {
                return (
                  <TextInput
                    id="bio"
                    label="Bio"
                    value={field.state.value ?? ''}
                    errors={field.state.meta.errors}
                    isValid={field.state.meta.isValid}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )
              }}
            />
            <form.Field
              name="profile_photo_url"
              children={(field) => {
                return (
                  <TextInput
                    id="profile_photo_url"
                    label="Profile Photo URL"
                    value={field.state.value ?? ''}
                    errors={field.state.meta.errors}
                    isValid={field.state.meta.isValid}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                )
              }}
            />
            <form.Field
              name="avatar_url"
              children={(field) => {
                return (
                  <TextInput
                    id="avatar_url"
                    label="Avatar URL"
                    value={field.state.value ?? ''}
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
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              label="Save Changes"
              disabled={!canSubmit || isSubmitting}
              className="w-full"
            />
          )}
        />
      </form>
    </div>
  )
}
