import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/regions/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/regions/create"!</div>
}
