import { Typography } from '@/components/typography'
import { createFileRoute } from '@tanstack/react-router'
import { MyGroupsCard } from './-components/my-groups-card'
import { MyInvitesCard } from './-components/my-invites-card'
import { eq, useLiveQuery } from '@tanstack/react-db'
import { profilesCollection } from '@/collections/profiles'

export const Route = createFileRoute('/(user)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { supabase, queryClient, profile_id } = Route.useRouteContext()
  const { data } = useLiveQuery((q) =>
    q
      .from({ profile: profilesCollection(supabase, queryClient) })
      .where(({ profile }) => eq(profile.id, profile_id))
      .select(({ profile }) => ({
        first_name: profile.first_name,
      })),
  )
  return (
    <div className="flex flex-col max-w-lg gap-2">
      <Typography tag="h4" className="font-semibold">
        Welcome back, {data[0].first_name}!
      </Typography>

      <MyGroupsCard />
      <MyInvitesCard />
    </div>
  )
}
