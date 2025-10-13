import { acceptGroupInvite } from '@/services/data/accept-group-invite'
import { GroupCard } from '@/components/blocks/group-card'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty'
import { Link, useNavigate, useRouteContext } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Children } from 'react'
import { groupInvitesCollection } from '@/collections/group_invites'
import { groupsCollection } from '@/collections/groups'
import {
  createLiveQueryCollection,
  eq,
  gte,
  and,
  or,
  useLiveQuery,
} from '@tanstack/react-db'

export function MyInvitesCard() {
  const navigate = useNavigate()
  const { supabase, queryClient, user_id, profile_id } = useRouteContext({
    from: '/(user)',
  })

  const group_invites = groupInvitesCollection(supabase, queryClient)
  const groups = groupsCollection(supabase, queryClient, user_id, profile_id)

  const invites = createLiveQueryCollection((q) =>
    q
      .from({ group_invite: group_invites })
      .innerJoin({ group: groups }, ({ group_invite, group }) =>
        eq(group.id, group_invite.group_id),
      )
      .select(({ group, group_invite }) => ({
        id: group_invite.id,
        group_name: group.group_name,
        address: group.address,
        logo_url: group.logo_url,
        short_name: group.short_name,
        role: group_invite.role,
        expiration_date: group_invite.expiration_date,
        is_accepted: group_invite.is_accepted,
      })),
  )

  const { data: activeInvites } = useLiveQuery((q) =>
    q
      .from({ invite: invites })
      .select(({ invite }) => ({
        id: invite.id,
        group_name: invite.group_name,
        address: invite.address,
        logo_url: invite.logo_url,
        short_name: invite.short_name,
        role: invite.role,
      }))
      .where(({ invite }) =>
        and(
          eq(invite.is_accepted, false),
          or(
            eq(invite.expiration_date, null),
            gte(invite.expiration_date, new Date()),
          ),
        ),
      ),
  )

  async function handleAccept(id: string, slug: string) {
    await acceptGroupInvite(supabase, id)
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
          {activeInvites &&
            activeInvites.length > 0 &&
            activeInvites.map((invite) => {
              const { id, group_name, address, logo_url, short_name, role } =
                invite
              return (
                <GroupCard
                  key={`gc-${invite.id}`}
                  id={id}
                  name={group_name}
                  address={address}
                  role={role}
                  logo={logo_url || undefined}
                  onSelect={() => handleAccept(invite.id, short_name)}
                />
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
