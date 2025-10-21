import z from 'zod'
import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { ZodGroupInsertType, ZodGroupRowType } from '@/db/schemas/groups'
import {
  groupProfilesCollection,
  groupsCollection,
} from '@/db/collections/collections'
import {
  AddressSchema,
  GroupNameSchema,
  PhoneNumberSchema,
  URLSchema,
} from '@/types/form-schemas'
import { TextInput } from '@/components/form-fields/text-input'
import { AddressInput } from '@/components/form-fields/address-input'
import { PhoneInput } from '@/components/form-fields/phone-input'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { ZodGroupInsert } from '@/db/schemas/groups'
import { FormErrorAlert } from '@/components/blocks/form-error-alert'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle, XCircle } from 'lucide-react'
import { InputHTMLAttributes } from 'react'
import { PhotoInput } from '@/components/form-fields/photo-input'

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
  const group_profiles = groupProfilesCollection
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
    fax: undefined,
    website_url: undefined,
    logo_url: undefined,
  }

  const form = useForm({
    validators: { onSubmit: ZodGroupInsert },
    defaultValues: emptyFormValues,
    onSubmit: ({ value }) => {
      toast.info('Attempting to create group...')
      // const insertValue = value as ZodGroupRowType
      // const transaction = groups.insert(insertValue, { optimistic: false })
      // try {
      //   await transaction.isPersisted.promise
      // } catch (error: unknown) {
      //   if (error instanceof Error) {
      //     toast.error(`Failed to create group: ${error.message}`)
      //   } else {
      //     toast.error(`Failed to create group: ${String(error)}`)
      //   }
      // }
      // groups.utils.refetch()
      // group_profiles.utils.refetch()
      // await auth.refresh()
      // navigate({ to: '/$groupSlug', params: { groupSlug: value.short_name } })
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
        {form.state.errors.length > 0 && (
          <FormErrorAlert errors={form.state.errors} />
        )}
        <form.Field
          validators={{ onChange: GroupNameSchema }}
          name="group_name"
          children={(field) => {
            return (
              <TextInput
                id="group_name"
                label="Group Name"
                placeholder="Enter group name"
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                isValid={
                  field.state.meta.isPristine || field.state.meta.isValid
                }
              />
            )
          }}
        />
        <form.Field
          validators={{ onChange: AddressSchema }}
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
                isValid={
                  field.state.meta.isPristine || field.state.meta.isValid
                }
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
          validators={{ onBlur: PhoneNumberSchema.optional() }}
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
          validators={{ onChangeAsync: ShortNameSchema }}
          asyncDebounceMs={300}
          name="short_name"
          children={(field) => {
            return (
              <ShortNameField
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                isValid={
                  field.state.meta.isPristine || field.state.meta.isValid
                }
                isLoading={
                  field.state.meta.isDirty && field.state.meta.isValidating
                }
                isAvailable={
                  field.state.meta.isDirty && field.state.meta.isValid
                }
              />
            )
          }}
        />
        <form.Field
          validators={{ onChange: URLSchema.optional() }}
          name="website_url"
          children={(field) => {
            return (
              <TextInput
                id="website_url"
                label="Website URL"
                value={field.state.value ?? undefined}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                isValid={
                  field.state.meta.isPristine || field.state.meta.isValid
                }
                isLoading={
                  field.state.meta.isDirty && field.state.meta.isValidating
                }
              />
            )
          }}
        />

        <form.Field
          validators={{ onChange: URLSchema.optional() }}
          name="logo_url"
          children={(field) => {
            return (
              <PhotoInput
                id="logo_url"
                label="Logo"
                value={field.state.value ?? undefined}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                isValid={
                  field.state.meta.isPristine || field.state.meta.isValid
                }
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

interface ShortNameFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'id' | 'aria-invalid'
  > {
  isLoading?: boolean
  isValid?: boolean
  isAvailable?: boolean
  errors?: Array<{ message?: string } | undefined>
}
function ShortNameField({
  isLoading = false,
  isAvailable = false,
  isValid = true,
  errors,
  ...props
}: ShortNameFieldProps) {
  return (
    <Field data-invalid={!isValid}>
      <FieldContent>
        <FieldLabel htmlFor="short_name">Short Name</FieldLabel>
        <FieldDescription>
          This will be used your group's unique URL.
        </FieldDescription>
      </FieldContent>
      <InputGroup>
        <InputGroupAddon className="bg-muted" align="inline-start">
          <span className="mr-2">https://skeeter.app/</span>
        </InputGroupAddon>
        <InputGroupInput
          id="short_name"
          type="text"
          aria-invalid={!isValid}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          {isLoading ? (
            <Spinner />
          ) : isAvailable ? (
            <CheckCircle className="text-primary" />
          ) : (
            <XCircle className="text-destructive" />
          )}
        </InputGroupAddon>
      </InputGroup>
      {errors && <FieldError errors={errors} />}
    </Field>
  )
}
