import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from '../../ui/button';

const meta = {
	title: 'UI/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A button component with various variants and sizes.\n\n**Theming classes applied:**\n\n**Variants:**\n\n**Default:**\n- `bg-primary` → Primary background color.\n- `text-primary-foreground` → Primary foreground text color.\n- `hover:bg-primary/90` → 90% opacity primary background on hover.\n\n**Destructive:**\n- `bg-destructive` → Destructive background color.\n- `text-white` → White text color.\n- `hover:bg-destructive/90` → 90% opacity destructive background on hover.\n- `focus-visible:ring-destructive/20` → Focus ring with 20% opacity destructive color.\n- `dark:focus-visible:ring-destructive/40` → In dark mode, focus ring with 40% opacity destructive color.\n- `dark:bg-destructive/60` → In dark mode, 60% opacity destructive background.\n\n**Outline:**\n- `border` → Border.\n- `bg-background` → Background color.\n- `shadow-xs` → Extra small shadow.\n- `hover:bg-accent` → Accent background on hover.\n- `hover:text-accent-foreground` → Accent foreground text on hover.\n- `dark:bg-input/30` → In dark mode, 30% opacity input background.\n- `dark:border-input` → In dark mode, input border.\n- `dark:hover:bg-input/50` → In dark mode, 50% opacity input background on hover.\n\n**Secondary:**\n- `bg-secondary` → Secondary background color.\n- `text-secondary-foreground` → Secondary foreground text color.\n- `hover:bg-secondary/80` → 80% opacity secondary background on hover.\n\n**Ghost:**\n- `hover:bg-accent` → Accent background on hover.\n- `hover:text-accent-foreground` → Accent foreground text on hover.\n- `dark:hover:bg-accent/50` → In dark mode, 50% opacity accent background on hover.\n\n**Link:**\n- `text-primary` → Primary text color.\n- `underline-offset-4` → Underline offset.\n- `hover:underline` → Underline on hover.\n\n**Sizes:**\n\n**Small:**\n- `h-8` → Height 32px.\n- `rounded-md` → Medium border radius.\n- `gap-1.5` → Gap 1.5.\n- `px-3` → Horizontal padding 3.\n- `has-[>svg]:px-2.5` → If has SVG, horizontal padding 2.5.\n\n**Default:**\n- `h-9` → Height 36px.\n- `px-4` → Horizontal padding 4.\n- `py-2` → Vertical padding 2.\n- `has-[>svg]:px-3` → If has SVG, horizontal padding 3.\n\n**Large:**\n- `h-10` → Height 40px.\n- `rounded-md` → Medium border radius.\n- `px-6` → Horizontal padding 6.\n- `has-[>svg]:px-4` → If has SVG, horizontal padding 4.\n\n**Icon:**\n- `size-9` → Size 36px.\n\n**Icon Small:**\n- `size-8` → Size 32px.\n\n**Icon Large:**\n- `size-10` → Size 40px.\n\n**Disabled:**\n- `disabled:pointer-events-none` → No pointer events when disabled.\n- `disabled:opacity-50` → 50% opacity when disabled.',
			},
		},
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'default',
		children: 'Default Button',
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		children: 'Destructive Button',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		children: 'Outline Button',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Secondary Button',
	},
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		children: 'Ghost Button',
	},
};

export const Link: Story = {
	args: {
		variant: 'link',
		children: 'Link Button',
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		children: 'Small Button',
	},
};

export const DefaultSize: Story = {
	args: {
		size: 'default',
		children: 'Default Size Button',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		children: 'Large Button',
	},
};

export const Icon: Story = {
	args: {
		size: 'icon',
		children: '🔥',
	},
};

export const IconSmall: Story = {
	args: {
		size: 'icon-sm',
		children: '🔥',
	},
};

export const IconLarge: Story = {
	args: {
		size: 'icon-lg',
		children: '🔥',
	},
};

export const Disabled: Story = {
	args: {
		variant: 'default',
		children: 'Disabled Button',
		disabled: true,
	},
};
