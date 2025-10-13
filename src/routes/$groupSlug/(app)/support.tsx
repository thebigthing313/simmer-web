import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/support')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/support"!</div>
}
