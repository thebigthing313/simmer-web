import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { memo, useState } from 'react';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { DNDTreeListItem, ItemDragData } from './dnd-tree-list';
import { combineRefs } from './dnd-utils';
import { DNDTreeListItemComponent } from './list-item';
import {
	CollapseButton,
	DeleteButton,
	GripButton,
	MoveUpButton,
} from './tree-list-buttons';

interface CollapsibleParentProps {
	item: DNDTreeListItem;
	isOverlay?: boolean;
	nodes: Array<DNDTreeListItem>;
	onItemDelete?: (itemId: string) => void;
	onItemMoveUp?: (itemId: string) => void;
}

export const CollapsibleParentComponent = memo(function CollapsibleParentComponent({
	item,
	isOverlay,
	nodes,
	onItemDelete,
	onItemMoveUp,
}: CollapsibleParentProps) {
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

	const [isOpen, setIsOpen] = useState(false);

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva('p-2', {
		variants: {
			dragging: {
				over: 'ring-2 opacity-30',
				overlay: 'ring-2 ring-primary',
			},
		},
	});

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			ref={setNodeRef}
			style={style}
			className={variants({
				dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
			})}
		>
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-row gap-0 items-center">
					<GripButton {...attributes} {...listeners} />
					<CollapsibleTrigger asChild>
						<CollapseButton isOpen={isOpen} />
					</CollapsibleTrigger>
					{item.label}
				</div>
				<div className="flex flex-row">
					<MoveUpButton onClick={() => onItemMoveUp?.(item.id as string)} />
					<DeleteButton onClick={() => onItemDelete?.(item.id as string)} />
				</div>
			</div>
			<CollapsibleContent className="ml-4">
				{nodes.map((node) => {
					return node.children.length > 0 ? (
						<CollapsibleParentComponent
							key={node.id}
							isOverlay={true}
							item={node}
							nodes={node.children}
							onItemDelete={onItemDelete}
							onItemMoveUp={onItemMoveUp}
						/>
					) : (
						<DNDTreeListItemComponent
							key={node.id}
							item={node}
							onItemDelete={onItemDelete}
							onItemMoveUp={onItemMoveUp}
						/>
					);
				})}
			</CollapsibleContent>
		</Collapsible>
	);
});
