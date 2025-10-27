import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '../../ui/separator';

const meta = {
	title: 'UI/Separator',
	component: Separator,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A separator component for visually dividing content.\n\n**Theming classes applied:**\n\n**Separator:**\n- `bg-border` → Sets background color to border theme.\n- `shrink-0` → Prevents shrinking.\n- `data-[orientation=horizontal]:h-px` → Height of 1px for horizontal orientation.\n- `data-[orientation=horizontal]:w-full` → Full width for horizontal orientation.\n- `data-[orientation=vertical]:h-full` → Full height for vertical orientation.\n- `data-[orientation=vertical]:w-px` → Width of 1px for vertical orientation.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		orientation: 'horizontal',
		className: 'my-4',
	},
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		className: 'mx-4 h-8',
	},
	render: (args) => (
		<div className="flex h-8 items-center">
			<div className="text-sm">Left content</div>
			<Separator {...args} />
			<div className="text-sm">Right content</div>
		</div>
	),
};

export const WithText: Story = {
	args: {
		orientation: 'horizontal',
		className: 'my-4',
	},
	render: (args) => (
		<div className="space-y-4">
			<div className="text-sm">First section content</div>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<Separator {...args} />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<div className="text-sm">Second section content</div>
		</div>
	),
};

export const InCard: Story = {
	args: {
		orientation: 'horizontal',
		className: 'my-4',
	},
	render: (args) => (
		<div className="w-80 rounded-lg border p-4">
			<div className="space-y-4">
				<div>
					<h3 className="text-lg font-medium">Card Title</h3>
					<p className="text-sm text-muted-foreground">
						This is the main content of the card.
					</p>
				</div>
				<Separator {...args} />
				<div className="flex justify-between text-sm">
					<span>Footer left</span>
					<span>Footer right</span>
				</div>
			</div>
		</div>
	),
};

export const MultipleSections: Story = {
	args: {
		orientation: 'horizontal',
		className: 'my-4',
	},
	render: (args) => (
		<div className="space-y-8">
			<section>
				<h2 className="text-xl font-semibold mb-2">Section 1</h2>
				<p className="text-sm text-muted-foreground mb-4">
					This is the first section with some content.
				</p>
			</section>
			<Separator {...args} />
			<section>
				<h2 className="text-xl font-semibold mb-2">Section 2</h2>
				<p className="text-sm text-muted-foreground mb-4">
					This is the second section with different content.
				</p>
			</section>
			<Separator {...args} />
			<section>
				<h2 className="text-xl font-semibold mb-2">Section 3</h2>
				<p className="text-sm text-muted-foreground">
					This is the third section with more content.
				</p>
			</section>
		</div>
	),
};
