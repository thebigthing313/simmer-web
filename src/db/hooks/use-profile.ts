import { eq, useLiveQuery } from '@tanstack/react-db'
import { profilesCollection } from '../collections/collections'

/**
 * A React hook that retrieves a profile by its ID using a live query.
 *
 * @param id - The unique identifier of the profile to retrieve.
 * @returns An object containing the live query result and the profiles collection.
 */
export function useProfile(id: string) {
  const query = useLiveQuery(
    (q) =>
      q
        .from({ profile: profilesCollection })
        .where(({ profile }) => eq(profile.id, id)),
    [id],
  )
  return {
    query,
    collection: profilesCollection,
  }
}
