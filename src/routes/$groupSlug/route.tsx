import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$groupSlug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$groupSlug"!</div>
}
