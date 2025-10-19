import { useEffect, useState } from 'react'
import {
  Outlet,
  createFileRoute,
  notFound,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import type { SIMMERClient } from '@/services/data/client'
import { getAuth } from '@/services/auth/get-auth'
import { useGroupStore } from '@/stores/group-stores'

export const Route = createFileRoute('/$groupSlug/(app)')({
  beforeLoad: async ({ context, params }) => {
    const auth = await getAuth(context.supabase)
    // Ensure user is authenticated
    if (!auth.user_id || !auth.profile_id) throw redirect({ to: '/login' })

    // if no groups, deny access
    if (!auth.groups || auth.groups.length === 0)
      throw redirect({ to: '/no-access' })

    // if slug doesn't resolve, throw not found
    const group_id = await useGroupStore.getState().beforeLoad(params.groupSlug)
    if (!group_id) throw notFound()

    // if group_id not in user's group per jwt, deny access
    const groupMatch = auth.groups.find((g) => g.group_id === group_id)
    if (!groupMatch) throw redirect({ to: '/no-access' })

    return {
      group_role: groupMatch.role,
      group_id: groupMatch.group_id,
      profile_id: auth.profile_id,
      user_id: auth.user_id,
      user_email: auth.user_email,
    }
  },
  component: AppLayout,
})

function AppLayout() {
  const { supabase } = Route.useRouteContext()

  return (
    <AuthGuard supabase={supabase}>
      <Outlet />
    </AuthGuard>
  )
}

type AuthGuardProps = {
  supabase: SIMMERClient
  children: React.ReactNode
}

function AuthGuard({ supabase, children }: AuthGuardProps) {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthenticated(!!session)
        if (!session) navigate({ to: '/login' })
      },
    )
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase, navigate])
  return authenticated ? <>{children}</> : null
}
