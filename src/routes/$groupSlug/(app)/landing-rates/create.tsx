import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/landing-rates/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/landing-rates/create"!</div>
}
