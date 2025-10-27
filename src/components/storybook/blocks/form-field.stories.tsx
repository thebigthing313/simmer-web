import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormField } from '@/components/blocks/form-field';
import { TextInput } from '@/components/inputs/text-input';

const meta = {
	title: 'Blocks/FormField',
	component: FormField,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A form field component that wraps label, description, and input elements with optional error display.\n\nConditionally wraps `FieldLabel` and `FieldDescription` in `FieldContent` only when both are provided.\n\n**Color-related Tailwind classes and their targets:**\n- `text-destructive` → Field (when invalid), FieldError text.\n- `bg-primary/5` → FieldLabel background (when checked).\n- `border-primary` → FieldLabel border (when checked).\n- `bg-primary/10` → FieldLabel background in dark mode (when checked).\n- `text-muted-foreground` → FieldDescription text.\n- `text-primary` → FieldDescription links on hover.\n\nThese map to CSS variables (e.g., `--destructive`, `--primary`, `--muted-foreground`) for easy theming.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		description: { control: 'text' },
		className: { control: 'text' },
		errors: { control: 'object' },
	},
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Email Address',
		description: 'Enter your email address for notifications.',
	},
	render: (args) => (
		<FormField {...args}>
			<TextInput placeholder="email@example.com" />
		</FormField>
	),
};

export const WithLabelOnly: Story = {
	args: {
		label: 'Username',
	},
	render: (args) => (
		<FormField {...args}>
			<TextInput placeholder="Enter username" />
		</FormField>
	),
};

export const WithDescriptionOnly: Story = {
	args: {
		description: 'This field is optional.',
	},
	render: (args) => (
		<FormField {...args}>
			<TextInput placeholder="Optional field" />
		</FormField>
	),
};

export const WithErrors: Story = {
	args: {
		label: 'Password',
		description: 'Must be at least 8 characters.',
		errors: [{ message: 'Password is too short' }],
	},
	render: (args) => (
		<FormField {...args}>
			<TextInput type="password" placeholder="Enter password" aria-invalid />
		</FormField>
	),
};

export const NoLabelOrDescription: Story = {
	args: {},
	render: (args) => (
		<FormField {...args}>
			<TextInput placeholder="Plain input" />
		</FormField>
	),
};
