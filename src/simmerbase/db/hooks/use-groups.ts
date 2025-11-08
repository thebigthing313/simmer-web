import { eq, useLiveSuspenseQuery } from '@tanstack/react-db';
import { group_invites } from '../collections/group_invites';
import { group_profiles } from '../collections/group_profiles';
import { groups } from '../collections/groups';

interface UseGroupsOptions {
	isActiveMember?: boolean;
	isInvitedTo?: boolean;
}

export function useGroups({
	isActiveMember,
	isInvitedTo,
}: UseGroupsOptions = {}) {
	return useLiveSuspenseQuery((q) => {
		let query = q.from({ group: groups });

		if (isActiveMember !== undefined) {
			query = query.innerJoin(
				{ group_profile: group_profiles },
				({ group, group_profile }) => eq(group.id, group_profile.group_id),
			);
		}

		if (isInvitedTo !== undefined) {
			query = query.innerJoin(
				{ group_invite: group_invites },
				({ group, group_invite }) => eq(group.id, group_invite.group_id),
			);
		}

		query = query.orderBy(({ group }) => group.group_name, 'asc');

		return query;
	});
}
