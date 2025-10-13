/* eslint-disable react/no-children-prop */
import { EmailSchema } from '@/types/form-schemas'
import { useForm } from '@tanstack/react-form'
import { FormLayout } from './form-layout'
import { SubmitButton } from '@/components/form-fields/submit-button'
import z from 'zod'
import { EmailInput } from '@/components/form-fields/email-input'

interface ForgotPasswordFormProps {
  handleSubmit: (email: string) => void
}

const ForgotPasswordSchema = z.object({
  email: EmailSchema,
})

export function ForgotPasswordForm({ handleSubmit }: ForgotPasswordFormProps) {
  const form = useForm({
    validators: { onChange: ForgotPasswordSchema },
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => handleSubmit(value.email),
  })

  return (
    <FormLayout
      title="Forgot Password"
      description="You will receive an email with a link to reset your password."
    >
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
                  value={field.state.value}
                  errors={field.state.meta.errors}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <SubmitButton
                label="Send Reset Link"
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
