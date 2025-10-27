import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { ToggleGroup, ToggleGroupItem } from '../../ui/toggle-group';

const meta = {
	title: 'UI/ToggleGroup',
	component: ToggleGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `A toggle group component with various variants, sizes, and spacing.\n\n**Theming classes applied:**\n\n**ToggleGroup:**\n- \`group/toggle-group\` → Group class for styling.\n- \`flex\` → Flex display.\n- \`w-fit\` → Fit width.\n- \`items-center\` → Center items vertically.\n- \`gap-[--spacing(var(--gap))]\` → Gap based on spacing variable.\n- \`rounded-md\` → Medium border radius.\n- \`data-[spacing=default]:data-[variant=outline]:shadow-xs\` → Shadow for outline variant with default spacing.\n\n**ToggleGroupItem:**\n- Inherits from Toggle variants.\n- \`w-auto\` → Auto width.\n- \`min-w-0\` → Minimum width 0.\n- \`shrink-0\` → No shrink.\n- \`px-3\` → Horizontal padding 3.\n- \`focus:z-10\` → Z-index 10 on focus.\n- \`focus-visible:z-10\` → Z-index 10 on focus visible.\n- \`data-[spacing=0]:rounded-none\` → No border radius when spacing 0.\n- \`data-[spacing=0]:shadow-none\` → No shadow when spacing 0.\n- \`data-[spacing=0]:first:rounded-l-md\` → Left rounded for first item.\n- \`data-[spacing=0]:last:rounded-r-md\` → Right rounded for last item.\n- \`data-[spacing=0]:data-[variant=outline]:border-l-0\` → No left border for outline.\n- \`data-[spacing=0]:data-[variant=outline]:first:border-l\` → Left border for first outline item.\n\n**Base Toggle classes (from toggleVariants):**\n- \`inline-flex\` → Inline flex display.\n- \`items-center\` → Center items vertically.\n- \`justify-center\` → Center items horizontally.\n- \`gap-2\` → Gap between items.\n- \`rounded-md\` → Medium border radius.\n- \`text-sm\` → Small text size.\n- \`font-medium\` → Medium font weight.\n- \`hover:bg-muted\` → Muted background on hover.\n- \`hover:text-muted-foreground\` → Muted foreground text on hover.\n- \`disabled:pointer-events-none\` → No pointer events when disabled.\n- \`disabled:opacity-50\` → 50% opacity when disabled.\n- \`data-[state=on]:bg-accent\` → Accent background when on.\n- \`data-[state=on]:text-accent-foreground\` → Accent foreground text when on.\n- \`[&_svg]:pointer-events-none\` → No pointer events on SVG.\n- \`[&_svg:not([class*='size-'])]:size-4\` → Size 16px for SVG if no size class.\n- \`[&_svg]:shrink-0\` → No shrink for SVG.\n- \`focus-visible:border-ring\` → Border ring on focus.\n- \`focus-visible:ring-ring/50\` → Ring with 50% opacity on focus.\n- \`focus-visible:ring-[3px]\` → 3px ring on focus.\n- \`outline-none\` → No outline.\n- \`transition-[color,box-shadow]\` → Transition for color and box-shadow.\n- \`aria-invalid:ring-destructive/20\` → Destructive ring for invalid.\n- \`dark:aria-invalid:ring-destructive/40\` → Dark mode destructive ring.\n- \`aria-invalid:border-destructive\` → Destructive border for invalid.\n- \`whitespace-nowrap\` → No text wrapping.\n\n**Variants:**\n\n**Default:**\n- \`bg-transparent\` → Transparent background.\n\n**Outline:**\n- \`border\` → Border.\n- \`border-input\` → Input border color.\n- \`bg-transparent\` → Transparent background.\n- \`shadow-xs\` → Extra small shadow.\n- \`hover:bg-accent\` → Accent background on hover.\n- \`hover:text-accent-foreground\` → Accent foreground on hover.\n\n**Sizes:**\n\n**Default:**\n- \`h-9\` → Height 36px.\n- \`px-2\` → Horizontal padding 2.\n- \`min-w-9\` → Minimum width 36px.\n\n**Small:**\n- \`h-8\` → Height 32px.\n- \`px-1.5\` → Horizontal padding 1.5.\n- \`min-w-8\` → Minimum width 32px.\n\n**Large:**\n- \`h-10\` → Height 40px.\n- \`px-2.5\` → Horizontal padding 2.5.\n- \`min-w-10\` → Minimum width 40px.`,
			},
		},
	},
	tags: ['autodocs'],
	args: { onClick: fn() },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { type: 'single' },
	render: () => (
		<ToggleGroup type="single">
			<ToggleGroupItem value="a">A</ToggleGroupItem>
			<ToggleGroupItem value="b">B</ToggleGroupItem>
			<ToggleGroupItem value="c">C</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Outline: Story = {
	args: { type: 'single', variant: 'outline' },
	render: () => (
		<ToggleGroup type="single" variant="outline">
			<ToggleGroupItem value="a">A</ToggleGroupItem>
			<ToggleGroupItem value="b">B</ToggleGroupItem>
			<ToggleGroupItem value="c">C</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Small: Story = {
	args: { type: 'single', size: 'sm' },
	render: () => (
		<ToggleGroup type="single" size="sm">
			<ToggleGroupItem value="a">A</ToggleGroupItem>
			<ToggleGroupItem value="b">B</ToggleGroupItem>
			<ToggleGroupItem value="c">C</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const WithSpacing: Story = {
	args: { type: 'single', spacing: 4 },
	render: () => (
		<ToggleGroup type="single" spacing={4}>
			<ToggleGroupItem value="a">A</ToggleGroupItem>
			<ToggleGroupItem value="b">B</ToggleGroupItem>
			<ToggleGroupItem value="c">C</ToggleGroupItem>
		</ToggleGroup>
	),
};
