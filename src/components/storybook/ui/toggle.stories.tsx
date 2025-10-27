import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Toggle } from '../../ui/toggle';

const meta = {
	title: 'UI/Toggle',
	component: Toggle,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `A toggle component with various variants and sizes.\n\n**Theming classes applied:**\n\n**Base classes:**\n- \`inline-flex\` → Inline flex display.\n- \`items-center\` → Center items vertically.\n- \`justify-center\` → Center items horizontally.\n- \`gap-2\` → Gap between items.\n- \`rounded-md\` → Medium border radius.\n- \`text-sm\` → Small text size.\n- \`font-medium\` → Medium font weight.\n- \`hover:bg-muted\` → Muted background on hover.\n- \`hover:text-muted-foreground\` → Muted foreground text on hover.\n- \`disabled:pointer-events-none\` → No pointer events when disabled.\n- \`disabled:opacity-50\` → 50% opacity when disabled.\n- \`data-[state=on]:bg-accent\` → Accent background when on.\n- \`data-[state=on]:text-accent-foreground\` → Accent foreground text when on.\n- \`[&_svg]:pointer-events-none\` → No pointer events on SVG.\n- \`[&_svg:not([class*='size-'])]:size-4\` → Size 16px for SVG if no size class.\n- \`[&_svg]:shrink-0\` → No shrink for SVG.\n- \`focus-visible:border-ring\` → Border ring on focus.\n- \`focus-visible:ring-ring/50\` → Ring with 50% opacity on focus.\n- \`focus-visible:ring-[3px]\` → 3px ring on focus.\n- \`outline-none\` → No outline.\n- \`transition-[color,box-shadow]\` → Transition for color and box-shadow.\n- \`aria-invalid:ring-destructive/20\` → Destructive ring for invalid.\n- \`dark:aria-invalid:ring-destructive/40\` → Dark mode destructive ring.\n- \`aria-invalid:border-destructive\` → Destructive border for invalid.\n- \`whitespace-nowrap\` → No text wrapping.\n\n**Variants:**\n\n**Default:**\n- \`bg-transparent\` → Transparent background.\n\n**Outline:**\n- \`border\` → Border.\n- \`border-input\` → Input border color.\n- \`bg-transparent\` → Transparent background.\n- \`shadow-xs\` → Extra small shadow.\n- \`hover:bg-accent\` → Accent background on hover.\n- \`hover:text-accent-foreground\` → Accent foreground on hover.\n\n**Sizes:**\n\n**Default:**\n- \`h-9\` → Height 36px.\n- \`px-2\` → Horizontal padding 2.\n- \`min-w-9\` → Minimum width 36px.\n\n**Small:**\n- \`h-8\` → Height 32px.\n- \`px-1.5\` → Horizontal padding 1.5.\n- \`min-w-8\` → Minimum width 32px.\n\n**Large:**\n- \`h-10\` → Height 40px.\n- \`px-2.5\` → Horizontal padding 2.5.\n- \`min-w-10\` → Minimum width 40px.`,
			},
		},
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'default',
		children: 'Toggle',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		children: 'Toggle',
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		children: 'Toggle',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		children: 'Toggle',
	},
};
