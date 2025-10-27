import type { Meta, StoryObj } from '@storybook/react-vite';

import { Kbd, KbdGroup } from '../../ui/kbd';

const meta = {
	title: 'UI/Kbd',
	component: Kbd,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A keyboard shortcut display component for showing key combinations.\n\n**Theming classes applied:**\n\n**Kbd:**\n- `bg-muted` → Sets background color to muted theme.\n- `text-muted-foreground` → Sets text color to muted foreground theme.\n- `pointer-events-none` → Disables pointer events.\n- `inline-flex` → Uses inline flexbox layout.\n- `h-5` → Sets height to 1.25rem.\n- `w-fit` → Fits content width.\n- `min-w-5` → Minimum width of 1.25rem.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `gap-1` → Gap between items.\n- `rounded-sm` → Small border radius.\n- `px-1` → Horizontal padding.\n- `font-sans` → Sans-serif font family.\n- `text-xs` → Extra small text size.\n- `font-medium` → Medium font weight.\n- `select-none` → Prevents text selection.\n- `[_svg:not([class*='size-'])]:size-3` → Default icon size.\n- `[[data-slot=tooltip-content]_&]:bg-background/20` → Background in tooltip context.\n- `[[data-slot=tooltip-content]_&]:text-background` → Text color in tooltip context.\n- `dark:[[data-slot=tooltip-content]_&]:bg-background/10` → Dark mode background in tooltip.\n\n**KbdGroup:**\n- `inline-flex` → Uses inline flexbox layout.\n- `items-center` → Centers items vertically.\n- `gap-1` → Gap between items.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleKey: Story = {
	args: {
		children: '⌘',
	},
};

export const KeyCombination: Story = {
	args: {
		children: '⌘K',
	},
};

export const LetterKey: Story = {
	args: {
		children: 'S',
	},
};

export const FunctionKey: Story = {
	args: {
		children: 'F11',
	},
};

export const ArrowKey: Story = {
	args: {
		children: '↑',
	},
};

export const KbdGroupExample: Story = {
	args: {
		children: null,
	},
	render: () => (
		<KbdGroup>
			<Kbd>⌘</Kbd>
			<Kbd>Shift</Kbd>
			<Kbd>P</Kbd>
		</KbdGroup>
	),
};

export const MultipleCombinations: Story = {
	args: {
		children: null,
	},
	render: () => (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<span className="text-sm">Save</span>
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>S</Kbd>
				</KbdGroup>
			</div>
			<div className="flex items-center gap-4">
				<span className="text-sm">Find</span>
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>F</Kbd>
				</KbdGroup>
			</div>
			<div className="flex items-center gap-4">
				<span className="text-sm">Command Palette</span>
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>Shift</Kbd>
					<Kbd>P</Kbd>
				</KbdGroup>
			</div>
			<div className="flex items-center gap-4">
				<span className="text-sm">New Tab</span>
				<KbdGroup>
					<Kbd>⌘</Kbd>
					<Kbd>T</Kbd>
				</KbdGroup>
			</div>
		</div>
	),
};
