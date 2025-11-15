import { cva } from 'class-variance-authority';
import { memo } from 'react';
import {
	ArrowUpFromLineIcon,
	ChevronRight,
	GripVertical,
	Trash2Icon,
} from 'lucide-react';
import type { ComponentPropsWithRef } from 'react';
import { Button } from '@/components/ui/button';

interface CollapseButtonProps extends ComponentPropsWithRef<'button'> {
	isOpen: boolean;
}
export const CollapseButton = memo(function CollapseButton({ isOpen, ...props }: CollapseButtonProps) {
	const variants = cva('', {
		variants: {
			isOpen: {
				true: 'rotate-90',
				false: 'rotate-0',
			},
		},
	});
	return (
		<Button className="h-auto" variant="ghost" size="icon-sm" {...props}>
			<ChevronRight className={variants({ isOpen })} />
		</Button>
	);
});

export const GripButton = memo(function GripButton({ ...props }: ComponentPropsWithRef<'button'>) {
	return (
		<Button
			variant="ghost"
			size="icon-sm"
			{...props}
			className="p-1 -ml-2 h-auto cursor-grab"
		>
			<span className="sr-only">Drag Handle</span>
			<GripVertical />
		</Button>
	);
});

export const DeleteButton = memo(function DeleteButton({ ...props }: ComponentPropsWithRef<'button'>) {
	return (
		<Button variant="ghost" size="icon-sm" {...props}>
			<Trash2Icon className="h-3 w-3 text-destructive" />
		</Button>
	);
});

export const MoveUpButton = memo(function MoveUpButton({ ...props }: ComponentPropsWithRef<'button'>) {
	return (
		<Button variant="ghost" size="icon-sm" {...props}>
			<ArrowUpFromLineIcon className="h-3 w-3" />
		</Button>
	);
});
