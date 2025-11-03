import { eq, useLiveQuery } from '@tanstack/react-db';
import { profiles } from '../collections/profiles';

export function useProfile(profile_id: string) {
	const query = useLiveQuery((q) =>
		q
			.from({ profile: profiles })
			.where(({ profile }) => eq(profile.id, profile_id))
			.findOne(),
	);

	const { data, collection, isLoading, isError } = query;
	if (!data) throw new Error('Profile id does not exist');
	return { data, collection, isLoading, isError };
}
