import z from 'zod'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ZodGroupInsertType, ZodGroupRowType } from '@/db/schemas/groups'
import { groupsCollection } from '@/db/collections'
import { GroupNameSchema, PhoneNumberSchema } from '@/types/form-schemas'
import { TextInput } from '@/components/form-fields/text-input'
import { AddressInput } from '@/components/form-fields/address-input'
import { PhoneInput } from '@/components/form-fields/phone-input'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { ZodGroupInsert } from '@/db/schemas/groups'

export const Route = createFileRoute('/(user)/create-group')({
  beforeLoad: ({ context }) => {
    const { auth } = context
    if (!auth.user_id) {
      throw redirect({ to: '/login' })
    }

    return { user_id: auth.user_id }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { supabase, auth } = Route.useRouteContext()
  const groups = groupsCollection
  const navigate = useNavigate()

  // local validator that uses route context; allow override via prop
  async function validateShortName(slug: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('groups')
      .select('id')
      .eq('short_name', slug)
      .maybeSingle()
    if (error) return false
    // return true when available
    return data === null
  }

  const ShortNameSchema = z
    .string()
    .min(1, 'Short name is required')
    .max(15, 'Short name cannot exceed 15 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Short name may only contain lowercase letters, numbers, and hyphens',
    )
    .refine(async (slug: string) => validateShortName(slug), {
      message: 'Short name is already taken',
    })

  const emptyFormValues: ZodGroupInsertType = {
    group_name: '',
    address: '',
    phone: '',
    short_name: '',
    fax: null,
    website_url: null,
    logo_url: null,
  }

  const form = useForm({
    validators: { onSubmit: ZodGroupInsert },
    defaultValues: emptyFormValues,
    onSubmit: async ({ value }) => {
      const insertValue = value as ZodGroupRowType
      const transaction = groups.insert(insertValue, { optimistic: false })
      try {
        await transaction.isPersisted.promise
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Failed to create group: ${error.message}`)
        } else {
          toast.error(`Failed to create group: ${String(error)}`)
        }
      }
      await auth.refresh()
      navigate({ to: '/$groupSlug', params: { groupSlug: value.short_name } })
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
      <div className="grid gap-2">
        <form.Field
          validators={{ onChange: GroupNameSchema }}
          name="group_name"
          children={(field) => {
            return (
              <TextInput
                required
                id="group_name"
                label="Group Name"
                placeholder="Enter group name"
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                isValid={field.state.meta.isDirty && field.state.meta.isValid}
              />
            )
          }}
        />
        <form.Field
          name="address"
          children={(field) => {
            return (
              <AddressInput
                required
                id="address"
                label="Address"
                placeholder="Enter address"
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )
          }}
        />
        <form.Field
          validators={{ onBlur: PhoneNumberSchema }}
          name="phone"
          children={(field) => {
            return (
              <PhoneInput
                required
                id="phone"
                label="Phone"
                placeholder="Enter phone number"
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(stored) => field.handleChange(stored)}
                onBlur={() => field.handleBlur()}
              />
            )
          }}
        />
        <form.Field
          validators={{ onBlur: PhoneNumberSchema }}
          name="fax"
          children={(field) => {
            return (
              <PhoneInput
                id="fax"
                label="Fax"
                placeholder="Enter fax number"
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(stored) => field.handleChange(stored)}
                onBlur={() => field.handleBlur()}
              />
            )
          }}
        />
        <form.Field
          validators={{ onBlurAsync: ShortNameSchema }}
          name="short_name"
          children={(field) => {
            return (
              <TextInput
                required
                id="short_name"
                label="Short Name"
                description="This short name will be used in URLs to access the group data."
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => field.handleBlur()}
                isValid={field.state.meta.isDirty && field.state.meta.isValid}
                isLoading={
                  field.state.meta.isDirty && field.state.meta.isValidating
                }
              />
            )
          }}
        />
        <form.Field
          validators={{ onBlurAsync: ShortNameSchema }}
          name="website_url"
          children={(field) => {
            return (
              <TextInput
                id="website_url"
                label="Website URL"
                value={field.state.value ?? ''}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={() => field.handleBlur()}
                isValid={field.state.meta.isDirty && field.state.meta.isValid}
                isLoading={
                  field.state.meta.isDirty && field.state.meta.isValidating
                }
              />
            )
          }}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <SubmitButton
              label="Create Account"
              isLoading={isSubmitting}
              disabled={!canSubmit}
              className="w-full"
            />
          )}
        />
      </div>
    </form>
  )
}
