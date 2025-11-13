import { eq, useLiveSuspenseQuery } from '@tanstack/react-db';
import { regions } from '../collections/regions';

export function useGroupRegions(group_id: string) {
	const query = useLiveSuspenseQuery(
		(q) =>
			q
				.from({ region: regions })
				.where(({ region }) => eq(region.group_id, group_id))
				.orderBy(({ region }) => region.region_name)
				.select(({ region }) => ({
					id: region.id,
					label: region.region_name,
					parent_id: region.parent_id,
				})),
		[group_id],
	);

	return query;
}

type Region = {
	id: string;
	label: string;
	parent_id?: string | null;
};

type FormattedRegion = {
	value: string;
	label: string;
};

export function formatRegions(
	regions: Array<Region>,
	delimiter = '/',
): Array<FormattedRegion> {
	// 1. Create a map for quick lookups by ID.
	const regionMap = new Map<string, Region>();
	regions.forEach((region) => {
		regionMap.set(region.id, region);
	});

	const formattedResults: Array<FormattedRegion> = [];

	// 2. Iterate through all regions and construct the full path for each one.
	regions.forEach((currentRegion) => {
		const pathParts: string[] = [];
		let traversalId: string | null | undefined = currentRegion.id;

		// Traverse UP the tree using parent_id until we hit a root (no parent_id or parent_id not found)
		while (traversalId) {
			const region = regionMap.get(traversalId);
			if (region) {
				// Add the current region's label to the beginning of the array (to keep order correct)
				pathParts.unshift(region.label);
				traversalId = region.parent_id;
			} else {
				// Should not happen if data is clean, but stops infinite loop
				traversalId = null;
			}
		}

		// 3. Join the path parts and push the final object
		formattedResults.push({
			value: currentRegion.id,
			// The pathParts array already contains the labels in the correct order
			label: pathParts.join(delimiter),
		});
	});

	return formattedResults;
}
