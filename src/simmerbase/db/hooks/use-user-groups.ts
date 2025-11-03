import { useLiveQuery } from '@tanstack/react-db';
import { groups } from '../collections/groups';

export function useUserGroups() {
	const query = useLiveQuery((q) =>
		q.from({ group: groups }).orderBy(({ group }) => group.group_name, 'asc'),
	);

	const { data, collection, isLoading, isError } = query;

	return { data, collection, isLoading, isError };
}
