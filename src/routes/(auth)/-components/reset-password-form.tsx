/* eslint-disable react/no-children-prop */
import z from 'zod'
import { FormLayout } from './form-layout'
import { useForm } from '@tanstack/react-form'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { PasswordSchema } from '@/types/form-schemas'
import { PasswordInput } from '@/components/form-fields/password-input'

interface ResetPasswordFormProps {
  onResetPassword: (newPassword: string) => void
}

const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export function ResetPasswordForm({ onResetPassword }: ResetPasswordFormProps) {
  const form = useForm({
    validators: { onChange: ResetPasswordSchema },
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      onResetPassword(value.password)
    },
  })

  return (
    <FormLayout title="Reset Password" description="Enter your new password">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="grid gap-6">
          <form.Field
            name="password"
            children={(field) => (
              <PasswordInput
                id="password"
                label="New Password"
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
                label="Confirm New Password"
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
                label="Reset Password"
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
