import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { memo } from 'react';
import type { DNDTreeListItem, ItemDragData } from './dnd-tree-list';
import { combineRefs } from './dnd-utils';
import { DeleteButton, GripButton, MoveUpButton } from './tree-list-buttons';

export interface DNDTreeListItemProps {
	item: DNDTreeListItem;
	isOverlay?: boolean;
	onItemDelete?: (itemId: string) => void;
	onItemMoveUp?: (itemId: string) => void;
}

export const DNDTreeListItemComponent = memo(function DNDTreeListItemComponent({
	item,
	isOverlay,
	onItemDelete,
	onItemMoveUp,
}: DNDTreeListItemProps) {
	const {
		setNodeRef: dragRef,
		attributes,
		listeners,
		transform,
		isDragging,
	} = useDraggable({
		id: item.id,
		data: {
			item_id: item.id as string,
			label: item.label,
		} satisfies ItemDragData,
	});

	const { setNodeRef: dropRef } = useDroppable({
		id: item.id,
	});

	const setNodeRef = combineRefs(dragRef, dropRef);

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva('flex flex-row p-2 justify-between items-center', {
		variants: {
			dragging: {
				over: 'ring-2 opacity-30',
				overlay: 'ring-2 ring-primary',
			},
		},
	});

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={variants({
				dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
			})}
		>
			<div className="flex flex-row gap-2 items-center">
				<GripButton {...attributes} {...listeners} />
				{item.label}
			</div>
			<div className="flex flex-row">
				<MoveUpButton onClick={() => onItemMoveUp?.(item.id as string)} />
				<DeleteButton onClick={() => onItemDelete?.(item.id as string)} />
			</div>
		</div>
	);
});
