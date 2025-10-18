import { Link, createFileRoute } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import { ResetPasswordForm } from './-components/reset-password-form'
import { ErrorAlert } from './-components/error-alert'
import { resetPassword } from '@/services/auth/reset-password'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const Route = createFileRoute('/(auth)/reset-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const { supabase } = Route.useRouteContext()

  // Parse error info from the URL hash (used by Supabase for error redirects)
  const { error, error_code, error_description } = parseHashParams()

  const resetMutation = useMutation({
    mutationFn: async (newPassword: string) => {
      await resetPassword(supabase, newPassword)
    },
    onError: (mutationError: Error) => {
      setErrorMsg(mutationError.message)
    },
    onSuccess: async () => {
      setErrorMsg(null)
      await supabase.auth.signOut()
      setSuccess(true)
    },
  })

  // If there is an error in the hash, show an error alert
  if (error && error_code && error_description) {
    return (
      <ErrorAlert
        errorTitle={`${error.toUpperCase()}: ${error_code.toUpperCase()}`}
        errorMsg={error_description}
      />
    )
  }

  return (
    <>
      {/* Show error message if password reset fails */}
      {errorMsg && (
        <ErrorAlert errorTitle="Password Reset Error" errorMsg={errorMsg} />
      )}
      {/* Show success message after password reset */}
      {success && <SuccessfulReset />}
      {/* Show the reset password form if not successful yet */}
      {!success && (
        <ResetPasswordForm
          onResetPassword={(newPassword) => {
            resetMutation.mutate(newPassword)
          }}
        />
      )}
    </>
  )
}

function SuccessfulReset() {
  return (
    <Alert className="mb-2">
      <CircleCheck />
      <AlertTitle>Password reset successful!</AlertTitle>
      <AlertDescription>
        <Link className="hover:underline" to="/login">
          Click here to return to the login page.
        </Link>
      </AlertDescription>
    </Alert>
  )
}

// Helper to parse error params from the hash fragment (for Supabase error redirects)
function parseHashParams() {
  const hash = window.location.hash.substring(1) // remove the '#'
  const params = new URLSearchParams(hash)
  return {
    error: params.get('error'),
    error_code: params.get('error_code'),
    error_description: params.get('error_description'),
  }
}
