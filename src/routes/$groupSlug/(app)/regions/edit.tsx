import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/regions/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/regions/edit"!</div>
}
