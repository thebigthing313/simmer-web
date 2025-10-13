/* eslint-disable react/no-children-prop */
import { Button } from '@/components/ui/button'
import { EmailInput } from '@/components/form-fields/email-input'
import { PasswordInput } from '@/components/form-fields/password-input'
import { SubmitButton } from '@/components/form-fields/submit-button'
import { Link } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import z from 'zod'
import { FormLayout } from './form-layout'
import { EmailSchema, PasswordSchema } from '@/types/form-schemas'

type LoginFormProps = {
  onEmailLogin: (email: string, password: string) => void
  onForgotPassword: () => void
}

const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})

export function LoginForm({ onEmailLogin, onForgotPassword }: LoginFormProps) {
  const form = useForm({
    validators: { onChange: LoginSchema },
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      onEmailLogin(value.email, value.password)
    },
  })

  return (
    <FormLayout title="Welcome back!" description="Login to your account">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <div className="grid gap-6">
          {/* Subscribe to isSubmitted so we can decide when to show errors */}
          <form.Subscribe
            selector={(state) => state.isSubmitted}
            children={(isSubmitted) => (
              <>
                <form.Field
                  name="email"
                  children={(field) => {
                    const showErrors = isSubmitted || field.state.meta.isTouched
                    const errors =
                      showErrors && !field.state.meta.isValid
                        ? field.state.meta.errors
                        : undefined
                    return (
                      <EmailInput
                        required
                        id="email"
                        label="Email"
                        value={field.state.value}
                        errors={errors}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )
                  }}
                />

                <form.Field
                  name="password"
                  children={(field) => {
                    const showErrors = isSubmitted || field.state.meta.isTouched
                    const errors =
                      showErrors && !field.state.meta.isValid
                        ? field.state.meta.errors
                        : undefined
                    return (
                      <PasswordInput
                        required
                        id="password"
                        label="Password"
                        value={field.state.value}
                        errors={errors}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )
                  }}
                />
              </>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <SubmitButton
                label="Login"
                isLoading={isSubmitting}
                disabled={!canSubmit}
                className="w-full"
              />
            )}
          />
        </div>
      </form>
      <div className="grid mt-4">
        <Button
          variant="link"
          size="sm"
          className="text-sm underline-offset-4 hover:underline"
          onClick={onForgotPassword}
        >
          Forgot your password?
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/create-account" className="underline underline-offset-4">
            Create one here.
          </Link>
        </div>
      </div>
    </FormLayout>
  )
}
