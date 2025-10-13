import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/profiles/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/profiles/view"!</div>
}
