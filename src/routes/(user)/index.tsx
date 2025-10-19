import { createFileRoute } from '@tanstack/react-router'
import { MyGroupsCard } from './-components/my-groups-card'
import { MyInvitesCard } from './-components/my-invites-card'
import { Typography } from '@/components/typography'
import { useProfile } from '@/db/hooks/use-profile'

export const Route = createFileRoute('/(user)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { profile_id } = Route.useRouteContext()
  const { query } = useProfile(profile_id)
  const profile = query.data[0]

  return (
    <div className="flex flex-col max-w-lg gap-2">
      <Typography tag="h4" className="font-semibold">
        Welcome back, {profile.first_name}!
      </Typography>

      <MyGroupsCard />
      <MyInvitesCard />
    </div>
  )
}
