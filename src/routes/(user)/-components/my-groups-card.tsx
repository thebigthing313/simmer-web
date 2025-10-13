import { Children } from 'react'
import { Link, useRouteContext } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Empty,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { GroupCard } from '@/components/blocks/group-card'
import { PlusIcon } from 'lucide-react'
import { groupsCollection } from '@/collections/groups'
import { groupProfilesCollection } from '@/collections/group_profiles'
import { createLiveQueryCollection, eq, useLiveQuery } from '@tanstack/react-db'

export function MyGroupsCard() {
  const { supabase, queryClient, user_id, profile_id } = useRouteContext({
    from: '/(user)',
  })
  const groups = groupsCollection(supabase, queryClient, user_id, profile_id)
  const group_profiles = groupProfilesCollection(supabase, queryClient)

  const activeGroupCollection = createLiveQueryCollection((q) =>
    q
      .from({ group_profile: group_profiles })
      .innerJoin({ group: groups }, ({ group_profile, group }) =>
        eq(group.id, group_profile.group_id),
      )
      .select(({ group, group_profile }) => ({
        id: group.id,
        group_name: group.group_name,
        address: group.address,
        logo_url: group.logo_url,
        short_name: group.short_name,
        role: group_profile.role,
      })),
  )

  const { data: active_groups } = useLiveQuery((q) =>
    q.from({ active_group: activeGroupCollection }),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Groups</CardTitle>
        <CardDescription>
          Groups that you have at least one role in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GroupCardGroup key="user-groups">
          {active_groups &&
            active_groups.length > 0 &&
            active_groups.map((group) => {
              const { id, group_name, address, logo_url, short_name } = group
              return (
                <Link
                  key={`link-${id}`}
                  to="/$groupSlug"
                  params={{ groupSlug: short_name }}
                >
                  <GroupCard
                    key={`gc-${id}`}
                    id={id}
                    name={group_name}
                    address={address}
                    role={group.role}
                    logo={logo_url || undefined}
                  />
                </Link>
              )
            })}
        </GroupCardGroup>
      </CardContent>
    </Card>
  )
}
interface GroupCardGroupProps {
  children?: React.ReactNode
  className?: string
}

function GroupCardGroup({ children, className }: GroupCardGroupProps) {
  const items = Children.toArray(children).filter(Boolean)
  if (items.length === 0) return <EmptyGroupCardGroup />

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">{children}</div>
      <div className="pt-2">
        <Link to="/create-group">
          <Button className="hover:cursor-pointer" size="sm" variant="outline">
            <PlusIcon /> Create New Group
          </Button>
        </Link>
      </div>
    </div>
  )
}

function EmptyGroupCardGroup() {
  return (
    <Empty key="empty-group-card-group" className="border border-dashed">
      <EmptyTitle>No Groups Found</EmptyTitle>
      <EmptyDescription>
        You can accept a group invite or create a new group to continue.
      </EmptyDescription>
      <EmptyContent>
        <Link to="/create-group">
          <Button className="hover:cursor-pointer" size="sm">
            <PlusIcon />
            Create New Group
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}
