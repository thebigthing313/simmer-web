import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from '../inputs/text-input';

const meta = {
	title: 'Inputs/TextInput',
	component: TextInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A reusable text input component with optional spinner, validation indicator, paste, and clear buttons.\n\n**Color-related Tailwind classes and their targets:**\n- `border-input` → Outer InputGroup container border.\n- `text-muted-foreground` → InputGroupAddon text (e.g., spinner, buttons, check icon).\n- `hover:bg-accent` → Paste/clear buttons (ghost variant) background on hover.\n- `hover:text-accent-foreground` → Paste/clear buttons text on hover.\n- `ring-ring/50` → InputGroup focus ring (semi-transparent).\n- `border-ring` → InputGroup border on focus.\n- `ring-destructive/20` → InputGroup error ring (invalid state).\n- `border-destructive` → InputGroup border on invalid state.\n- `dark:bg-input/30` → InputGroup background in dark mode.\n- `dark:border-input` → InputGroup border in dark mode.\n- `dark:hover:bg-input/50` → Buttons background on hover in dark mode.\n- `dark:aria-invalid:ring-destructive/40` → InputGroup error ring in dark mode.\n\nThese map to CSS variables (e.g., `--input`, `--muted-foreground`, `--accent`) for easy theming.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		type: { control: 'text' },
		'aria-invalid': { control: 'boolean' },
		showSpinner: {
			control: 'boolean',
		},
		showValid: {
			control: 'boolean',
		},
		showPaste: {
			control: 'boolean',
		},
		showClear: {
			control: 'boolean',
		},
		onChange: { action: 'changed' },
		placeholder: {
			control: 'text',
		},
		value: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text here',
	},
};

export const Invalid: Story = {
	args: {
		placeholder: 'Invalid entry',
		'aria-invalid': true,
	},
};

export const WithSpinner: Story = {
	args: {
		placeholder: 'Loading...',
		showSpinner: true,
	},
};

export const WithValid: Story = {
	args: {
		placeholder: 'Valid input',
		showValid: true,
		value: 'Valid text',
	},
};

export const WithPaste: Story = {
	args: {
		placeholder: 'Paste something',
		showPaste: true,
	},
};

export const WithClear: Story = {
	args: {
		placeholder: 'Clear me',
		value: 'Some text',
		showClear: true,
	},
};
