import { useLiveSuspenseQuery } from '@tanstack/react-db';
import { group_invites } from '../collections/group_invites';

export function useGroupInvites() {
	return useLiveSuspenseQuery((q) => q.from({ group_invite: group_invites }));
}
