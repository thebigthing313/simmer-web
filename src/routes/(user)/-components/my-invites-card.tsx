import { Link, useNavigate, useRouteContext } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'
import { Children } from 'react'
import { acceptGroupInvite } from '@/db/functions/accept-group-invite'
import { GroupCard } from '@/components/blocks/group-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { useGroupInvites } from '@/db/hooks/use-group-invites'

export function MyInvitesCard() {
  const { user_id } = useRouteContext({ from: '/(user)' })
  const { query, collection } = useGroupInvites(user_id)
  const navigate = useNavigate()

  const invites = query.data

  async function handleAccept(id: string, slug: string) {
    await acceptGroupInvite(id)
    await collection.utils.refetch()
    navigate({ to: '/$groupSlug', params: { groupSlug: slug } })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Invites</CardTitle>
        <CardDescription>Your active pending invites.</CardDescription>
      </CardHeader>
      <CardContent>
        <GroupCardGroup key="user-groups">
          {invites.map((invite) => {
            const { group_invite, group } = invite
            return (
              <Button
                onClick={() => handleAccept(group_invite.id, group.short_name)}
              >
                <GroupCard key={`gc-${group_invite.id}`} group_id={group.id} />
              </Button>
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
  if (items.length === 0) return <EmptyInvites />

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">{children}</div>
      <div className="pt-2">
        <Link to="/create-group">
          <Button size="sm" variant="outline">
            <PlusIcon />
            Create New Group
          </Button>
        </Link>
      </div>
    </div>
  )
}

function EmptyInvites() {
  return (
    <Empty key="empty-invites" className="border border-dashed">
      <EmptyTitle>No Pending Invites</EmptyTitle>
      <EmptyDescription>
        You&apos;re all caught up — there are no pending invites right now.
      </EmptyDescription>
    </Empty>
  )
}
