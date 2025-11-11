import {
	DndContext,
	type DragEndEvent,
	type DragStartEvent,
	useDraggable,
	useDroppable,
} from '@dnd-kit/core';
import {
	ArrowUpFromLineIcon,
	ChevronRightIcon,
	GripVerticalIcon,
	Trash2Icon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../ui/collapsible';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type DNDHierarchyListBoxItem = {
	id: string;
	label: string;
	parent_id: string | null;
};

type TreeNode = DNDHierarchyListBoxItem & {
	children: Array<TreeNode>;
};

interface DNDHierarchyListBoxProps {
	items: Array<DNDHierarchyListBoxItem>;
	className?: string;
	onDropInto?: (items: Array<string>, target: string) => void;
	onDeleteItem?: (itemId: string) => void;
	onMoveUpLevel?: (itemId: string) => void;
}

interface ActionButtonProps {
	itemId: string;
	onAction: (itemId: string) => void;
	children: React.ReactNode;
	tooltip?: string;
}

function ActionButton({
	itemId,
	onAction,
	children,
	tooltip,
}: ActionButtonProps) {
	const button = (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className="h-5 w-5 p-0 opacity-0 transition-opacity group-hover:opacity-100"
			onClick={(e) => {
				e.stopPropagation();
				onAction(itemId);
			}}
		>
			{children}
		</Button>
	);

	if (tooltip) {
		return (
			<Tooltip>
				<TooltipTrigger asChild>{button}</TooltipTrigger>
				<TooltipContent>{tooltip}</TooltipContent>
			</Tooltip>
		);
	}

	return button;
}

function MoveUpButton({
	itemId,
	onMoveUpLevel,
}: {
	itemId: string;
	onMoveUpLevel: (itemId: string) => void;
}) {
	return (
		<ActionButton
			itemId={itemId}
			onAction={onMoveUpLevel}
			tooltip="Move Up One Level"
		>
			<ArrowUpFromLineIcon className="h-3 w-3" />
		</ActionButton>
	);
}

function DeleteButton({
	itemId,
	onDelete,
}: {
	itemId: string;
	onDelete: (itemId: string) => void;
}) {
	return (
		<ActionButton itemId={itemId} onAction={onDelete} tooltip="Delete">
			<Trash2Icon className="h-3 w-3 text-destructive" />
		</ActionButton>
	);
}

function buildAndSortHierarchyTree(
	items: Array<DNDHierarchyListBoxItem>,
): Array<TreeNode> {
	const map: Record<string, TreeNode> = {};
	const roots: Array<TreeNode> = [];

	items.forEach((item) => {
		map[item.id] = { ...item, children: [] };
	});

	Object.values(map).forEach((node) => {
		if (node.parent_id !== null && map[node.parent_id]) {
			map[node.parent_id].children.push(node);
		} else {
			roots.push(node);
		}
	});

	function sortTree(nodes: Array<TreeNode>) {
		nodes.sort((a, b) => a.label.localeCompare(b.label));
		nodes.forEach((node) => {
			if (node.children.length > 0) {
				sortTree(node.children);
			}
		});
	}

	sortTree(roots);

	return roots;
}

interface BaseItemProps {
	item: DNDHierarchyListBoxItem;
	isSelected: boolean;
	isDragged: boolean;
	dragCount: number;
	onSelect?: (itemId: string, e: React.MouseEvent<HTMLElement>) => void;
	onDelete?: (itemId: string) => void;
	onMoveUpLevel?: (itemId: string) => void;
	children?: React.ReactNode;
	hasChildren: boolean;
}

function ListBoxItem({
	item,
	isSelected,
	isDragged,
	dragCount,
	onSelect,
	onDelete,
	onMoveUpLevel,
	children,
	hasChildren,
}: BaseItemProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const { isOver, setNodeRef: setDroppableRef } = useDroppable({
		id: item.id,
	});
	const {
		attributes,
		listeners,
		setNodeRef: setDraggableRef,
		transform,
		isDragging,
	} = useDraggable({
		id: item.id,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined;

	// The shared list item content
	const itemContent = (
		<div
			className={cn(
				'group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-accent',
				isSelected && 'bg-primary/20 hover:bg-primary/30',
				isOver && 'bg-primary/40 ring-2 ring-primary',
				// When we have children, we apply opacity to the wrapper div
				!hasChildren && isDragged && 'opacity-50',
			)}
		>
			<div
				className={cn(
					'cursor-grab active:cursor-grabbing',
					isDragging && 'cursor-grabbing',
				)}
				{...attributes}
				{...listeners}
			>
				<GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
			</div>
			{hasChildren && (
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="h-5 w-5 p-0"
						onClick={(e) => {
							// Prevent selection when clicking the chevron button
							e.stopPropagation();
						}}
					>
						<ChevronRightIcon
							className={cn(
								'h-4 w-4 transition-transform',
								isExpanded && 'rotate-90',
							)}
						/>
					</Button>
				</CollapsibleTrigger>
			)}
			{!hasChildren && <div className="h-5 w-5" />} {/* Spacer for alignment */}
			<button
				type="button"
				className="flex-1 text-left font-semibold"
				onClick={(e) => onSelect?.(item.id, e)}
			>
				{item.label}
			</button>
			{dragCount > 1 && (
				<Badge variant="secondary" className="h-5 px-1.5 text-xs">
					{dragCount}
				</Badge>
			)}
			{onMoveUpLevel && item.parent_id !== null && (
				<MoveUpButton itemId={item.id} onMoveUpLevel={onMoveUpLevel} />
			)}
			{onDelete && <DeleteButton itemId={item.id} onDelete={onDelete} />}
		</div>
	);

	// DND Wrapper for both types of items
	const dndWrapper = (
		<div
			ref={(node) => {
				setDroppableRef(node);
				setDraggableRef(node);
			}}
			style={style}
			// Opacity is applied to this wrapper for items with children
			className={cn(
				'rounded-md transition-colors',
				hasChildren && isDragged && 'opacity-50',
			)}
		>
			{hasChildren ? (
				// Use Collapsible for items with children
				<Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
					{itemContent}
					<CollapsibleContent>{children}</CollapsibleContent>
				</Collapsible>
			) : (
				// Render content directly for leaf nodes
				itemContent
			)}
		</div>
	);
	return dndWrapper;
}

// --- Main Component (Refactored) ---

export function DNDHierarchyListBox({
	items,
	className,
	onDropInto,
	onDeleteItem,
	onMoveUpLevel,
}: DNDHierarchyListBoxProps) {
	const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
	const [draggedItems, setDraggedItems] = useState<Array<string>>([]);
	const [activelyDraggedId, setActivelyDraggedId] = useState<string | null>(
		null,
	);

	const sortedItems = useMemo(() => buildAndSortHierarchyTree(items), [items]);

	const handleDragStart = (event: DragStartEvent) => {
		const draggedId = event.active.id as string;
		setActivelyDraggedId(draggedId);
		// If dragging a selected item, drag all selected items
		if (selectedItems.includes(draggedId)) {
			setDraggedItems(selectedItems);
		} else {
			setDraggedItems([draggedId]);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setDraggedItems([]);
		setActivelyDraggedId(null);

		if (over && active.id !== over.id) {
			const draggedIds = selectedItems.includes(active.id as string)
				? selectedItems
				: [active.id as string];
			onDropInto?.(draggedIds, over.id as string);
		}
	};

	const handleItemClick = (
		itemId: string,
		e: React.MouseEvent<HTMLElement>,
	) => {
		if (e.ctrlKey || e.metaKey) {
			setSelectedItems((prev) =>
				prev.includes(itemId)
					? prev.filter((id) => id !== itemId)
					: [...prev, itemId],
			);
		} else {
			setSelectedItems([itemId]);
		}
	};

	const renderTreeNode = (node: TreeNode): React.ReactNode => {
		const isSelected = selectedItems.includes(node.id);
		const isDragged = draggedItems.includes(node.id);
		const isActivelyDragged = activelyDraggedId === node.id;
		const dragCount = isActivelyDragged ? draggedItems.length : 0;
		const hasChildren = node.children.length > 0;

		return (
			<ListBoxItem
				key={node.id}
				item={node}
				isSelected={isSelected}
				isDragged={isDragged}
				dragCount={dragCount}
				onSelect={handleItemClick}
				onDelete={onDeleteItem}
				onMoveUpLevel={onMoveUpLevel}
				hasChildren={hasChildren}
			>
				{/* Recursive call for children, wrapped in a div for indentation */}
				{hasChildren && (
					<div className="ml-4 space-y-1">
						{node.children.map((child) => renderTreeNode(child))}
					</div>
				)}
			</ListBoxItem>
		);
	};

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<ScrollArea className={cn('h-full w-full', className)}>
				<div className="space-y-1 p-2">
					{sortedItems.map((node) => renderTreeNode(node))}
				</div>
			</ScrollArea>
		</DndContext>
	);
}
