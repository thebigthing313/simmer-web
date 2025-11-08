import { eq, useLiveSuspenseQuery } from '@tanstack/react-db';
import { profiles } from '../collections/profiles';

export function useProfile(profile_id: string) {
	const result = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ profile: profiles })
				.where(({ profile }) => eq(profile.id, profile_id))
				.findOne(),
		[profile_id],
	);

	const { data, ...rest } = result;

	if (data === undefined) {
		throw new Error('Profile not found');
	}

	return { data, ...rest };
}
