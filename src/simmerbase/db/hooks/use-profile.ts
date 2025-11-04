import { eq, useLiveQuery } from '@tanstack/react-db';
import { profiles } from '../collections/profiles';

export function useProfile(profile_id: string) {
	const query = useLiveQuery(
		(q) =>
			q
				.from({ profile: profiles })
				.where(({ profile }) => eq(profile.id, profile_id))
				.findOne(),
		[profile_id],
	);

	const { data, collection, isLoading, isError } = query;
	return { data, collection, isLoading, isError };
}
