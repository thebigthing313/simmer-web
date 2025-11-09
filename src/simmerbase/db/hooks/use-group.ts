import { eq, useLiveSuspenseQuery } from '@tanstack/react-db';
import { groups } from '../collections/groups';

export function useGroupBySlug(slug: string) {
	const query = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ group: groups })
				.where(({ group }) => eq(group.short_name, slug))
				.findOne(),
		[slug],
	);

	const { data, ...rest } = query;

	if (data === undefined) {
		throw new Error('No group found by that short name.');
	}

	return { data, ...rest };
}
