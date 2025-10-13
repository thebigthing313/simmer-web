import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/$groupSlug/(app)/locations/$locationId/service-requests',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/locations/$locationId/service-requests"!</div>
}
