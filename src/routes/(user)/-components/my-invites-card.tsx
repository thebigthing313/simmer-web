import { acceptGroupInvite, groupInvitesByUserQueryOptions } from '@repo/supabase/db/group_invites';
import { GroupCard } from '@repo/ui/blocks/group-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@repo/ui/components/card';
import { Empty, EmptyDescription, EmptyTitle } from '@repo/ui/components/empty';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate, useRouteContext } from '@tanstack/react-router';
import { Button } from '@repo/ui/components/button';
import { PlusIcon } from 'lucide-react';
import { Children } from 'react';

export function MyInvitesCard() {
  const { supabase, user_id } = useRouteContext({ from: '/(user)' });
  const { data: invites } = useSuspenseQuery(groupInvitesByUserQueryOptions(user_id, supabase));
  const navigate = useNavigate();
  async function handleAccept(id: string, slug: string) {
    await acceptGroupInvite(supabase, id);
    navigate({ to: '/$groupSlug', params: { groupSlug: slug } });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Invites</CardTitle>
        <CardDescription>Your active pending invites.</CardDescription>
      </CardHeader>
      <CardContent>
        <GroupCardGroup key='user-groups'>
          {invites &&
            invites.length > 0 &&
            invites.map((invite) => {
              const { id, group_name, address, logo_url, short_name } = invite.groups;
              return (
                <GroupCard
                  key={`gc-${invite.id}`}
                  id={id}
                  name={group_name}
                  address={address}
                  role={invite.role}
                  logo={logo_url || undefined}
                  onSelect={() => handleAccept(invite.id, short_name)}
                />
              );
            })}
        </GroupCardGroup>
      </CardContent>
    </Card>
  );
}

interface GroupCardGroupProps {
  children?: React.ReactNode;
  className?: string;
}

function GroupCardGroup({ children, className }: GroupCardGroupProps) {
  const items = Children.toArray(children).filter(Boolean);
  if (items.length === 0) return <EmptyInvites />;

  return (
    <div className={className}>
      <div className='flex flex-col gap-2'>{children}</div>
      <div className='pt-2'>
        <Link to='/create-group'>
          <Button size='sm' variant='outline'>
            <PlusIcon />
            Create New Group
          </Button>
        </Link>
      </div>
    </div>
  );
}

function EmptyInvites() {
  return (
    <Empty key='empty-invites' className='border border-dashed'>
      <EmptyTitle>No Pending Invites</EmptyTitle>
      <EmptyDescription>You&apos;re all caught up — there are no pending invites right now.</EmptyDescription>
    </Empty>
  );
}
