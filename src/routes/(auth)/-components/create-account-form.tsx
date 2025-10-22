import z from 'zod'
import { useForm } from '@tanstack/react-form'
import { FormLayout } from './form-layout'
import type { CreateAccountArgs } from '@/db/auth/create-account'
import { TextInput } from '@/components/form-fields/text-input'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { EmailSchema, NameSchema, PasswordSchema } from '@/db/form-schemas'
import { EmailInput } from '@/components/form-fields/email-input'
import { PasswordInput } from '@/components/form-fields/password-input'

interface CreateAccountFormProps {
  onCreateAccount: (args: Omit<CreateAccountArgs, 'supabase'>) => void
}

const CreateAccountSchema = z
  .object({
    email: EmailSchema,
    firstName: NameSchema,
    lastName: NameSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export function CreateAccountForm({ onCreateAccount }: CreateAccountFormProps) {
  const form = useForm({
    validators: { onChange: CreateAccountSchema },
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ value }) => {
      onCreateAccount({
        email: value.email,
        password: value.password,
        firstName: value.firstName,
        lastName: value.lastName,
      })
    },
  })

  return (
    <FormLayout title="Create Account" description="Sign up for a new account">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="grid gap-6">
          <form.Field
            name="email"
            children={(field) => {
              return (
                <EmailInput
                  id="email"
                  label="Email"
                  placeholder="aedes@mosquito.com"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )
            }}
          />
          <form.Field
            name="firstName"
            children={(field) => {
              return (
                <TextInput
                  id="firstName"
                  label="First Name"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )
            }}
          />
          <form.Field
            name="lastName"
            children={(field) => {
              return (
                <TextInput
                  id="lastName"
                  label="Last Name"
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )
            }}
          />
          <form.Field
            name="password"
            children={(field) => (
              <PasswordInput
                id="password"
                label="Password"
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <PasswordInput
                id="confirm-password"
                label="Confirm Password"
                value={field.state.value}
                errors={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
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
    </FormLayout>
  )
}
