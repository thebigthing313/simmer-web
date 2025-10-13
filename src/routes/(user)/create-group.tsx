import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { groupsCollection } from '@/collections/groups'
import z from 'zod'
import { GroupNameSchema, PhoneNumberSchema } from '@/types/form-schemas'
import { useForm } from '@tanstack/react-form'
import { TextInput } from '@/components/form-fields/text-input'
import { AddressInput } from '@/components/form-fields/address-input'
import { PhoneInput } from '@/components/form-fields/phone-input'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { toast } from 'sonner'

export const Route = createFileRoute('/(user)/create-group')({
  beforeLoad: async ({ context }) => {
    const { auth } = context
    if (!auth.user_id) {
      throw redirect({ to: '/login' })
    }

    return { user_id: auth.user_id }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { supabase, queryClient, auth, profile_id, user_id } =
    Route.useRouteContext()
  const groups = groupsCollection(supabase, queryClient, user_id, profile_id)
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

  const CreateGroupSchema = z.object({
    groupName: GroupNameSchema,
    address: z
      .string()
      .min(5, 'Address must be at least 5 characters long')
      .max(100, 'Address cannot exceed 100 characters'),
    phone: PhoneNumberSchema,
    shortName: ShortNameSchema,
  })

  const form = useForm({
    validators: { onSubmitAsync: CreateGroupSchema },
    defaultValues: {
      groupName: '',
      address: '',
      phone: '',
      shortName: '',
    },
    onSubmit: async ({ value }) => {
      //use new tanstack db mutation
      const transaction = groups.insert(
        {
          id: crypto.randomUUID().toString(),
          group_name: value.groupName,
          address: value.address,
          phone: value.phone,
          short_name: value.shortName,
        },
        { optimistic: false },
      )
      //await persist
      try {
        await transaction.isPersisted.promise
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Failed to create group: ${error.message}`)
        } else {
          toast.error(`Failed to create group: ${String(error)}`)
        }
      }

      //refresh session for new claims
      await auth.refresh()
      //navigate if yes
      navigate({ to: '/$groupSlug', params: { groupSlug: value.shortName } })
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
          name="groupName"
          children={(field) => {
            return (
              <TextInput
                id="groupName"
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
          validators={{ onBlurAsync: ShortNameSchema }}
          name="shortName"
          children={(field) => {
            return (
              <TextInput
                id="shortName"
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
