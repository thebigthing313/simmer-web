import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import {
  createFileRoute,
  notFound,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import { AppHeader } from '@/components/app-layout/header'
import { AppSidebar } from '@/components/app-layout/sidebar'
import { SidebarContentProvider } from '@/hooks/use-sidebar-content'
import { MapComponent } from '@/map/map'
import { useEffect, useState } from 'react'
import { SIMMERDatabase } from '@repo/supabase/db/client'
import { getAuth } from '@/services/auth/get-auth'
import { useGroupStore } from '@/stores/group-stores'
import { groupByIdQueryOptions } from '@repo/supabase/db/groups'
import { profileByIdQueryOptions } from '@repo/supabase/db/profiles'

export const Route = createFileRoute('/$groupSlug/(app)')({
  beforeLoad: async ({ context, params }) => {
    const auth = await getAuth(context.supabase)
    if (!auth.user_id || !auth.profile_id) throw redirect({ to: '/login' })
    if (!auth.groups || auth.groups.length === 0)
      throw redirect({ to: '/select-group' })
    const groupId = await useGroupStore.getState().beforeLoad(params.groupSlug)
    if (!groupId) throw notFound()
    const groupMatch = auth.groups.find((g) => g.group_id === groupId)
    if (!groupMatch) throw redirect({ to: '/no-access' })

    return {
      groupRole: groupMatch.role,
      profileId: auth.profile_id,
      userId: auth.user_id,
      userEmail: auth.user_email,
    }
  },
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(
      groupByIdQueryOptions(context.groupId, context.supabase),
    )
    context.queryClient.ensureQueryData(
      profileByIdQueryOptions(context.profileId, context.supabase),
    )
  },
  component: AppLayout,
})

function AppLayout() {
  const { supabase } = Route.useRouteContext()

  return (
    <AuthGuard supabase={supabase}>
      <SidebarProvider>
        <SidebarContentProvider>
          <AppSidebar className="p-1 h-full" />
          <SidebarInset>
            <div className="grid grid-rows-[auto_1fr_auto] w-full h-full overflow-hidden">
              <header className="h-20 overflow-hidden">
                <AppHeader />
                <Separator orientation="horizontal" />
              </header>
              <main>
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel className="p-2">
                    <Outlet />
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel
                    hidden={false}
                    className="p-2 transition-all ease-in-out "
                  >
                    <MapComponent />
                  </ResizablePanel>
                </ResizablePanelGroup>
                <div></div>
              </main>
            </div>
          </SidebarInset>
        </SidebarContentProvider>
      </SidebarProvider>
    </AuthGuard>
  )
}

type AuthGuardProps = {
  supabase: SIMMERDatabase
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
