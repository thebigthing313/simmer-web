import { eq, useLiveQuery } from '@tanstack/react-db'
import { groupsCollection } from '../collections/collections'

export function useGroup(group_id: string) {
  const query = useLiveQuery(
    (q) =>
      q
        .from({ group: groupsCollection })
        .where(({ group }) => eq(group.id, group_id)),
    [group_id],
  )
  return { query, collection: groupsCollection }
}
