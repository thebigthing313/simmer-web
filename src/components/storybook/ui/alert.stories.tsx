import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertTriangleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

const meta = {
	title: 'UI/Alert',
	component: Alert,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'An alert component for displaying important messages with optional icons and variants.\n\n**Theming classes applied:**\n\n**Default variant:**\n- `bg-card` → Sets the background color to the card theme color.\n- `text-card-foreground` → Sets the text color to the card foreground theme color.\n\n**Destructive variant:**\n- `text-destructive` → Sets the text color to the destructive theme color.\n- `bg-card` → Sets the background color to the card theme color.\n- `[&>svg]:text-current` → Makes the SVG icon color match the current text color.\n- `*:data-[slot=alert-description]:text-destructive/90` → Sets the description text color to 90% opacity of the destructive theme color.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<AlertTitle>Default Alert</AlertTitle>
				<AlertDescription>This is a default alert message.</AlertDescription>
			</>
		),
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		children: (
			<>
				<AlertTriangleIcon />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Something went wrong. Please try again.
				</AlertDescription>
			</>
		),
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<AlertTriangleIcon />
				<AlertTitle>Warning</AlertTitle>
				<AlertDescription>This action cannot be undone.</AlertDescription>
			</>
		),
	},
};

export const TitleOnly: Story = {
	args: {
		children: <AlertTitle>Just a Title</AlertTitle>,
	},
};
