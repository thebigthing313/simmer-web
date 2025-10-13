import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/locations/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/locations/create"!</div>
}
