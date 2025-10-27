import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '../../ui/collapsible';

const meta = {
	title: 'UI/Collapsible',
	component: Collapsible,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A collapsible component for showing and hiding content with smooth animations.\n\n**Theming classes applied:**\n\nThis component is a thin wrapper around Radix UI primitives and does not apply any additional Tailwind classes. The styling is handled by the Radix UI primitives and any custom classes you apply.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<CollapsibleTrigger asChild>
					<Button variant="outline">Toggle Content</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-4 space-y-2">
					<div className="rounded-md border p-4">
						<h4 className="text-sm font-medium">Collapsible Content</h4>
						<p className="text-sm text-muted-foreground">
							This content is hidden by default and can be toggled open and
							closed.
						</p>
					</div>
					<div className="rounded-md border p-4">
						<h4 className="text-sm font-medium">More Content</h4>
						<p className="text-sm text-muted-foreground">
							You can include multiple elements inside the collapsible content.
						</p>
					</div>
				</CollapsibleContent>
			</>
		),
	},
};

export const InitiallyOpen: Story = {
	args: {
		defaultOpen: true,
		children: (
			<>
				<CollapsibleTrigger asChild>
					<Button variant="outline">Toggle Content (Starts Open)</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-4">
					<div className="rounded-md border p-4">
						<p className="text-sm text-muted-foreground">
							This collapsible starts in the open state.
						</p>
					</div>
				</CollapsibleContent>
			</>
		),
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: (
			<>
				<CollapsibleTrigger asChild>
					<Button variant="outline" disabled>
						Disabled Toggle
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-4">
					<div className="rounded-md border p-4">
						<p className="text-sm text-muted-foreground">
							This collapsible is disabled and cannot be toggled.
						</p>
					</div>
				</CollapsibleContent>
			</>
		),
	},
};
