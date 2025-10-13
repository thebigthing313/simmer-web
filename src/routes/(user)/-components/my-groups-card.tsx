import { GroupCard } from '@repo/ui/blocks/group-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import { PlusIcon } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { groupsByUserQueryOptions } from '@repo/supabase/db/groups';
import { Link, useRouteContext } from '@tanstack/react-router';
import { Button } from '@repo/ui/components/button';
import { Empty, EmptyTitle, EmptyDescription, EmptyContent } from '@repo/ui/components/empty';
import { Children } from 'react';

export function MyGroupsCard() {
  const { supabase, user_id } = useRouteContext({ from: '/(user)' });
  const { data: groups } = useSuspenseQuery(groupsByUserQueryOptions(user_id, supabase));

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Groups</CardTitle>
        <CardDescription>Groups that you have at least one role in.</CardDescription>
      </CardHeader>
      <CardContent>
        <GroupCardGroup key='user-groups'>
          {groups &&
            groups.length > 0 &&
            groups.map((group) => {
              const { id, group_name, address, logo_url, short_name } = group.groups;
              return (
                <Link key={`link-${id}`} to='/$groupSlug' params={{ groupSlug: short_name }}>
                  <GroupCard key={`gc-${id}`} id={id} name={group_name} address={address} role={group.role} logo={logo_url || undefined} />
                </Link>
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
  if (items.length === 0) return <EmptyGroupCardGroup />;

  return (
    <div className={className}>
      <div className='flex flex-col gap-2'>{children}</div>
      <div className='pt-2'>
        <Link to='/create-group'>
          <Button className='hover:cursor-pointer' size='sm' variant='outline'>
            <PlusIcon /> Create New Group
          </Button>
        </Link>
      </div>
    </div>
  );
}

function EmptyGroupCardGroup() {
  return (
    <Empty key='empty-group-card-group' className='border border-dashed'>
      <EmptyTitle>No Groups Found</EmptyTitle>
      <EmptyDescription>You can accept a group invite or create a new group to continue.</EmptyDescription>
      <EmptyContent>
        <Link to='/create-group'>
          <Button className='hover:cursor-pointer' size='sm'>
            <PlusIcon />
            Create New Group
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  );
}
