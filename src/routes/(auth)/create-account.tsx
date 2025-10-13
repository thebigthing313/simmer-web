import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { ErrorAlert } from './-components/error-alert'
import { CreateAccountForm } from './-components/create-account-form'
import { useMutation } from '@tanstack/react-query'
import {
  createAccount,
  type CreateAccountArgs,
} from '@/services/auth/create-account'

export const Route = createFileRoute('/(auth)/create-account')({
  beforeLoad: async ({ context }) => {
    const { auth } = context
    if (auth.user_id && auth.profile_id) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { supabase } = Route.useRouteContext()
  const navigate = useNavigate()

  const createMutation = useMutation({
    mutationFn: async (args: Omit<CreateAccountArgs, 'supabase'>) => {
      await createAccount({
        supabase,
        email: args.email,
        password: args.password,
        firstName: args.firstName,
        lastName: args.lastName,
      })
    },
    onError: (error: Error) => {
      setErrorMsg(error.message)
    },
    onSuccess: async () => {
      await supabase.auth.signOut()
      navigate({ to: '/verify-email' })
    },
  })

  return (
    <>
      {errorMsg && (
        <ErrorAlert errorTitle="Account Creation Error" errorMsg={errorMsg} />
      )}
      <CreateAccountForm
        onCreateAccount={(args: Omit<CreateAccountArgs, 'supabase'>) =>
          createMutation.mutate({
            email: args.email,
            password: args.password,
            firstName: args.firstName,
            lastName: args.lastName,
          })
        }
      />
    </>
  )
}
