import {
	DndContext,
	type DragEndEvent,
	MouseSensor,
	TouchSensor,
	type UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { memo, useCallback } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CollapsibleParentComponent } from './collapsible-parent';
import { DNDTreeListItemComponent } from './list-item';

export interface DNDTreeListItem {
	id: UniqueIdentifier;
	label: string;
	parent_id: string | null;
	children: Array<DNDTreeListItem>;
}

export type ItemType = 'Item';

export interface ItemDragData {
	item_id: string;
	label: string;
}

interface DNDTreeListProps {
	items: Array<DNDTreeListItem>;
	onItemDrop?: (itemId: string, newParentId: string) => void;
	onItemDelete?: (itemId: string) => void;
	onItemMoveUp?: (itemId: string) => void;
	className?: string;
}
export const DNDTreeList = memo(function DNDTreeList({
	items,
	onItemDrop,
	onItemDelete,
	onItemMoveUp,
	className,
}: DNDTreeListProps) {
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

	const onDragEnd = useCallback((event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;
		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		onItemDrop?.(activeId as string, overId as string);
	}, [onItemDrop]);

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={onDragEnd}
		>
			<ScrollArea className={cn('border', className)}>
				{items.map((item) => {
					return item.children.length > 0 ? (
						<CollapsibleParentComponent
							key={item.id}
							item={item}
							nodes={item.children}
							onItemDelete={onItemDelete}
							onItemMoveUp={onItemMoveUp}
						/>
					) : (
						<DNDTreeListItemComponent
							key={item.id}
							item={item}
							onItemDelete={onItemDelete}
							onItemMoveUp={onItemMoveUp}
						/>
					);
				})}

				<ScrollBar orientation="vertical" />
			</ScrollArea>
		</DndContext>
	);
});
