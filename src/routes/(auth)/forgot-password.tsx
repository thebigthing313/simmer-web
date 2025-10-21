import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ErrorAlert } from './-components/error-alert'
import { ForgotPasswordForm } from './-components/forgot-password-form'
import { forgotPassword } from '@/db/auth/forgot-password'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { supabase } = Route.useRouteContext()
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      await forgotPassword(supabase, email)
    },
    onError: (error: Error) => {
      setErrorMsg(error.message)
    },
    onSuccess: () => {
      toast.success('Recovery email has been sent.')
    },
  })

  return (
    <>
      {errorMsg && (
        <ErrorAlert errorTitle="Forgot Password Error" errorMsg={errorMsg} />
      )}
      <ForgotPasswordForm
        handleSubmit={(email: string) => forgotPasswordMutation.mutate(email)}
      />
    </>
  )
}
