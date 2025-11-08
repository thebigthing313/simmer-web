import { eq, useLiveSuspenseQuery } from '@tanstack/react-db';
import { useNavigate, useRouteContext } from '@tanstack/react-router';
import { GroupCard, GroupCardGroup } from '@/components/blocks/group-item';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty';
import { group_invites } from '@/simmerbase/db/collections/group_invites';
import { group_profiles } from '@/simmerbase/db/collections/group_profiles';
import { groups } from '@/simmerbase/db/collections/groups';
import { acceptGroupInvite } from '@/simmerbase/functions/accept-group-invite';

export function MyInvitesCard() {
	const navigate = useNavigate();
	const { user_id } = useRouteContext({ from: '/(user)' });
	const { data } = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ group: groups })
				.innerJoin({ group_invite: group_invites }, ({ group, group_invite }) =>
					eq(group_invite.group_id, group.id),
				)
				.where(({ group_invite }) => eq(group_invite.user_id, user_id))
				.orderBy(({ group_invite }) => group_invite.created_at, 'desc')
				.orderBy(({ group }) => group.group_name, 'asc'),
		[user_id],
	);

	async function handleAccept(id: string, slug: string) {
		await acceptGroupInvite(id);
		await groups.utils.refetch();
		await group_profiles.utils.refetch();
		navigate({ to: '/$groupSlug', params: { groupSlug: slug } });
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>My Invites</CardTitle>
				<CardDescription>Your active pending invites.</CardDescription>
			</CardHeader>
			<CardContent>
				<GroupCardGroup key="user-invites">
					{data.length > 0 ? (
						data.map((row) => {
							const cardInfo = {
								logo_url: row.group.logo_url ?? undefined,
								group_name: row.group.group_name,
								address: row.group.address,
								phone: row.group.phone,
							};
							return (
								<Button
									key={`btn-invite-${row.group_invite.id}`}
									onClick={() =>
										handleAccept(row.group_invite.id, row.group.short_name)
									}
								>
									<GroupCard {...cardInfo} />
								</Button>
							);
						})
					) : (
						<EmptyInvites />
					)}
				</GroupCardGroup>
			</CardContent>
		</Card>
	);
}

function EmptyInvites() {
	return (
		<Empty key="empty-invites" className="border border-dashed">
			<EmptyTitle>No Pending Invites</EmptyTitle>
			<EmptyDescription>
				You&apos;re all caught up — there are no pending invites right now.
			</EmptyDescription>
		</Empty>
	);
}
