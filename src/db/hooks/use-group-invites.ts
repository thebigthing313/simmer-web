import { and, eq, gte, or, useLiveQuery } from '@tanstack/react-db'
import {
  groupInvitesCollection,
  groupsCollection,
} from '../collections/collections'

/**
 * A React hook that fetches pending group invites for a specific user.
 * It performs an inner join between group_invites and groups collections,
 * filtering for invites that are not accepted, belong to the user, and are not expired.
 *
 * @param user_id - The ID of the user for whom to fetch group invites.
 * @returns An object containing the query result and the group invites collection.
 */
export function useGroupInvites(user_id: string) {
  const query = useLiveQuery((q) =>
    q
      .from({ group_invite: groupInvitesCollection })
      .innerJoin({ group: groupsCollection }, ({ group_invite, group }) =>
        eq(group.id, group_invite.group_id),
      )
      .where(({ group_invite }) =>
        and(
          eq(group_invite.user_id, user_id),
          eq(group_invite.is_accepted, false),
          or(
            eq(group_invite.expiration_date, null),
            gte(group_invite.expiration_date, new Date().toISOString()),
          ),
        ),
      ),
  )
  return { query, collection: groupInvitesCollection }
}
