import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon } from 'lucide-react';
import { Badge } from '../../ui/badge';

const meta = {
	title: 'UI/Badge',
	component: Badge,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A badge component for displaying status or labels with various variants.\n\n**Theming classes applied:**\n\n**Default (Primary):**\n- `border-transparent` → Transparent border.\n- `bg-primary` → Primary background color.\n- `text-primary-foreground` → Primary foreground text color.\n- `[a&]:hover:bg-primary/90` → On hover for anchor elements, 90% opacity primary background.\n\n**Secondary:**\n- `border-transparent` → Transparent border.\n- `bg-secondary` → Secondary background color.\n- `text-secondary-foreground` → Secondary foreground text color.\n- `[a&]:hover:bg-secondary/90` → On hover for anchor elements, 90% opacity secondary background.\n\n**Destructive:**\n- `border-transparent` → Transparent border.\n- `bg-destructive` → Destructive background color.\n- `text-white` → White text color.\n- `[a&]:hover:bg-destructive/90` → On hover for anchor elements, 90% opacity destructive background.\n- `focus-visible:ring-destructive/20` → Focus ring with 20% opacity destructive color.\n- `dark:focus-visible:ring-destructive/40` → In dark mode, focus ring with 40% opacity destructive color.\n- `dark:bg-destructive/60` → In dark mode, 60% opacity destructive background.\n\n**Outline:**\n- `text-foreground` → Foreground text color.\n- `[a&]:hover:bg-accent` → On hover for anchor elements, accent background.\n- `[a&]:hover:text-accent-foreground` → On hover for anchor elements, accent foreground text.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Default',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Secondary',
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		children: 'Destructive',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		children: 'Outline',
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<CheckIcon />
				Verified
			</>
		),
	},
};
