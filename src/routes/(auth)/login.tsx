import {
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { z } from 'zod'
import { useState } from 'react'
import { LoginForm } from './-components/login-form'
import { ErrorAlert } from './-components/error-alert'
import { RedirectSchema } from '@/db/form-schemas'
import { useGroupStore } from '@/stores/group-stores'
import { signInWithPassword } from '@/db/auth/sign-in-password'

export const Route = createFileRoute('/(auth)/login')({
  validateSearch: z.object({
    redirect: RedirectSchema.optional(),
  }),
  beforeLoad: async ({ context, search }) => {
    const { auth } = context
    if (auth.user_id && auth.profile_id) {
      if (search.redirect) throw redirect({ to: search.redirect })
      if (!auth.default_group) throw redirect({ to: '/' })

      const groupSlug = await useGroupStore
        .getState()
        .resolveSlugFromId(auth.default_group)
      if (groupSlug) {
        throw redirect({ to: '/$groupSlug', params: { groupSlug } })
      } else {
        throw redirect({ to: '/' })
      }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { auth } = Route.useRouteContext()
  const router = useRouter()
  const navigate = useNavigate()

  async function handleLogin(email: string, password: string) {
    const { error } = await signInWithPassword(email, password)

    if (!error) {
      await auth.refresh()
      await router.invalidate()
    } else {
      setErrorMsg(error.message)
    }
  }

  return (
    <div>
      {errorMsg && <ErrorAlert errorTitle="Login Error" errorMsg={errorMsg} />}
      <LoginForm
        onEmailLogin={handleLogin}
        onForgotPassword={() => navigate({ to: '/forgot-password' })}
      />
    </div>
  )
}
