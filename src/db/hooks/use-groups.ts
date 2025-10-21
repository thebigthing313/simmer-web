import { useLiveQuery } from '@tanstack/react-db'
import { groupsCollection } from '../collections/collections'

export function useGroups() {
  const query = useLiveQuery((q) => q.from({ group: groupsCollection }))
  return { query, collection: groupsCollection }
}
