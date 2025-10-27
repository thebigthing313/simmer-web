import type { Meta, StoryObj } from '@storybook/react-vite';

import { PasswordInput } from '@/components/inputs/password-input';

const meta = {
	title: 'Inputs/PasswordInput',
	component: PasswordInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A password input component with a toggle to show or hide the password text.\n\n**Color-related Tailwind classes and their targets:**\n- `border-input` → Outer InputGroup container border.\n- `text-muted-foreground` → InputGroupAddon text (e.g., eye icons).\n- `hover:bg-accent` → Show/hide button (ghost variant) background on hover.\n- `hover:text-accent-foreground` → Show/hide button text on hover.\n- `ring-ring/50` → InputGroup focus ring (semi-transparent).\n- `border-ring` → InputGroup border on focus.\n- `ring-destructive/20` → InputGroup error ring (invalid state).\n- `border-destructive` → InputGroup border on invalid state.\n- `dark:bg-input/30` → InputGroup background in dark mode.\n- `dark:border-input` → InputGroup border in dark mode.\n- `dark:hover:bg-input/50` → Button background on hover in dark mode.\n- `dark:aria-invalid:ring-destructive/40` → InputGroup error ring in dark mode.\n\nThese map to CSS variables (e.g., `--input`, `--muted-foreground`, `--accent`) for easy theming.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		placeholder: {
			control: 'text',
		},
		disabled: {
			control: 'boolean',
		},
		className: {
			control: 'text',
		},
	},
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: 'Enter your password',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Disabled password input',
	},
};
