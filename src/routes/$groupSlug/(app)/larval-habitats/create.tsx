import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/larval-habitats/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/larval-habitats/create"!</div>
}
