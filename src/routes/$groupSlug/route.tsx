import { Outlet, createFileRoute, notFound } from '@tanstack/react-router'
import { useGroupStore } from '../../stores/group-stores'

export const Route = createFileRoute('/$groupSlug')({
  beforeLoad: async ({ params }) => {
    const { groupSlug } = params
    const groupId = await useGroupStore.getState().beforeLoad(groupSlug)
    if (!groupId) throw notFound()
    return { groupId }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
