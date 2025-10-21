import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Info } from 'lucide-react'
import type { SIMMERClient } from '@/db/client'
import type { QueryClient } from '@tanstack/react-query'
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'

import { getAuth } from '@/db/auth/get-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

interface MyRouterContext {
  supabase: SIMMERClient
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    const auth = await getAuth(context.supabase)
    return { auth }
  },
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  ),
  errorComponent: (error) => (
    <ErrorComponent
      title={'Root Level Error'}
      error={error.error.name}
      description={error.error.message}
    />
  ),
})

type ErrorComponentProps = {
  title?: string
  description?: string
  error?: Error | string | null
  className?: string
}

function ErrorComponent({
  title = 'Something went wrong',
  description,
  error,
  className = '',
}: ErrorComponentProps) {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error instanceof Error
        ? error.message
        : null

  const navigate = useNavigate()

  return (
    <Alert variant="destructive" className={className}>
      <Info className="h-5 w-5 text-destructive" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
        {errorMessage && (
          <div className="mt-2 text-sm text-destructive-foreground">
            {errorMessage}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Button
            variant="destructive"
            onClick={() => navigate({ to: '/login' })}
          >
            Back to Login
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: '/' })}>
            Home
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
