import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug/(app)/import-data/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/import-data/"!</div>
}
