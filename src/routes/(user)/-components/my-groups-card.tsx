import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { GroupCard, GroupCardGroup } from '@/components/blocks/group-item';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyTitle,
} from '@/components/ui/empty';
import { useGroups } from '@/simmerbase/db/hooks/use-groups';

export function MyGroupsCard() {
	const { data: groups } = useGroups({ isActiveMember: true });

	return (
		<Card>
			<CardHeader>
				<CardTitle>My Groups</CardTitle>
				<CardDescription>
					Groups that you have at least one role in.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{groups.length > 0 ? (
					<GroupCardGroup key="user-groups">
						{groups.map((group) => {
							const cardInfo = {
								logo_url: group.logo_url ?? undefined,
								group_name: group.group_name,
								address: group.address,
								phone: group.phone,
							};
							return (
								<Link
									key={`link-${group.id}`}
									to="/$groupSlug"
									params={{ groupSlug: group.short_name }}
								>
									<GroupCard key={`gc-${group.id}`} group={cardInfo} />
								</Link>
							);
						})}
					</GroupCardGroup>
				) : (
					<EmptyGroupCardGroup />
				)}
			</CardContent>
			{groups.length > 0 && (
				<CardFooter>
					<Button asChild>
						<Link to="/create-group">Create New Group</Link>
					</Button>
				</CardFooter>
			)}
		</Card>
	);
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
	);
}
