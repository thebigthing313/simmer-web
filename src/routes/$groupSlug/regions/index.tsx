import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { VectorSquare } from 'lucide-react';
import { Suspense, useCallback, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'sonner';
import { DNDTreeList } from '@/components/blocks/dnd-tree-list/dnd-tree-list';
import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
import { flatListToTree } from '@/lib/flat-list-to-tree';
import { regions } from '@/simmerbase/db/collections/regions';
import { useGroupRegions } from '@/simmerbase/db/hooks/use-group-regions';

export const Route = createFileRoute('/$groupSlug/regions/')({
	component: () => (
		<ErrorBoundary fallback={<div>Error loading regions information.</div>}>
			<Suspense fallback={null}>
				<RouteComponent />
			</Suspense>
		</ErrorBoundary>
	),
	loader: () => {
		return { crumb: 'View All' };
	},
});

function RouteComponent() {
	const navigate = useNavigate();
	const { group_id } = Route.useRouteContext();
	const { data: group_regions } = useGroupRegions(group_id);

	const sorted_tree = useMemo(
		() => flatListToTree(group_regions),
		[group_regions],
	);

	const handleDropInto = useCallback((itemId: string, newParentId: string) => {
		regions.update(itemId, (draft) => {
			draft.parent_id = newParentId;
		});
	}, []);

	const handleMoveUpLevel = useCallback((itemId: string) => {
		const parentId = regions.get(itemId)?.parent_id;
		if (!parentId) {
			toast.warning('Item is already at the top level.');
			return;
		}
		const grandParentId = regions.get(parentId)?.parent_id ?? null;
		regions.update(itemId, (draft) => {
			draft.parent_id = grandParentId;
		});
	}, []);

	const handleDeleteItem = useCallback((itemId: string) => {
		regions.delete(itemId);
	}, []);

	if (group_regions.length === 0) {
		return (
			<Empty className="w-full h-full border">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<VectorSquare />
					</EmptyMedia>
					<EmptyTitle>No Regions Yet</EmptyTitle>
					<EmptyDescription>
						You can start by importing data from a KML, GeoJSON, or GPX file.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Button
						onClick={() =>
							navigate({ from: '/$groupSlug/regions', to: './import' })
						}
					>
						Import Regions
					</Button>
				</EmptyContent>
			</Empty>
		);
	} else {
		return (
			<div className="grid [grid-template-rows:auto_1fr]">
				<div>
					<Button
						onClick={() =>
							navigate({ from: '/$groupSlug/regions', to: './import' })
						}
					>
						Import Regions
					</Button>
				</div>

				<DNDTreeList
					items={sorted_tree}
					onItemDrop={handleDropInto}
					onItemDelete={handleDeleteItem}
					onItemMoveUp={handleMoveUpLevel}
					className='max-h-[600px]'
				/>
			</div>
		);
	}
}
