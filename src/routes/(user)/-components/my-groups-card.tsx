import { eq, useLiveSuspenseQuery } from '@tanstack/react-db';
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
import { group_profiles } from '@/simmerbase/db/collections/group_profiles';
import { groups } from '@/simmerbase/db/collections/groups';

export function MyGroupsCard() {
	const { data } = useLiveSuspenseQuery((q) =>
		q
			.from({ group: groups })
			.innerJoin(
				{ group_profile: group_profiles },
				({ group, group_profile }) => eq(group.id, group_profile.group_id),
			)
			.select(({ group }) => ({ ...group })),
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>My Groups</CardTitle>
				<CardDescription>
					Groups that you have at least one role in.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{data.length > 0 ? (
					<GroupCardGroup key="user-groups">
						{data.map((group) => {
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
									<GroupCard key={`gc-${group.id}`} {...cardInfo} />
								</Link>
							);
						})}
					</GroupCardGroup>
				) : (
					<EmptyGroupCardGroup />
				)}
			</CardContent>
			{data.length > 0 && (
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
