import { eq, useLiveQuery } from '@tanstack/react-db'
import {
  groupProfilesCollection,
  groupsCollection,
  profilesCollection,
} from '../collections/collections'

/**
 * Fetches group profiles for a specified group ID using live queries with inner joins.
 * It joins group profiles with groups and profiles collections to retrieve related data.
 *
 * @param group_id - The unique identifier of the group for which to fetch profiles.
 * @returns An object containing the live query result and the group profiles collection.
 */
export function useGroupProfiles(group_id: string) {
  const query = useLiveQuery((q) =>
    q
      .from({ group_profile: groupProfilesCollection })
      .innerJoin({ group: groupsCollection }, ({ group_profile, group }) =>
        eq(group_profile.group_id, group.id),
      )
      .innerJoin(
        { profile: profilesCollection },
        ({ group_profile, profile }) =>
          eq(group_profile.profile_id, profile.id),
      )
      .where(({ group_profile }) => eq(group_profile.group_id, group_id)),
  )
  return { query, collection: groupProfilesCollection }
}
