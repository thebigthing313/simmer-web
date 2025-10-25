import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { DateInput } from '../inputs/date-input';

const meta = {
	title: 'Inputs/DateInput',
	component: DateInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A date input component with a calendar icon button.\n\n**Color-related Tailwind classes and their targets:**\n- `border-input` → Outer InputGroup container border.\n- `text-muted-foreground` → InputGroupAddon text (e.g., calendar icon).\n- `hover:bg-accent` → Calendar button (ghost variant) background on hover.\n- `hover:text-accent-foreground` → Calendar button text on hover.\n- `ring-ring/50` → InputGroup focus ring (semi-transparent).\n- `border-ring` → InputGroup border on focus.\n- `ring-destructive/20` → InputGroup error ring (invalid state).\n- `border-destructive` → InputGroup border on invalid state.\n- `dark:bg-input/30` → InputGroup background in dark mode.\n- `dark:border-input` → InputGroup border in dark mode.\n- `dark:hover:bg-input/50` → Button background on hover in dark mode.\n- `dark:aria-invalid:ring-destructive/40` → InputGroup error ring in dark mode.\n\nThese map to CSS variables (e.g., `--input`, `--muted-foreground`, `--accent`) for easy theming.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'date',
		},
		onChange: { action: 'date changed' },
		disabled: {
			control: 'boolean',
		},
		required: {
			control: 'boolean',
		},
		'aria-label': {
			control: 'text',
		},
		'aria-labelledby': {
			control: 'text',
		},
	},
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Interactive: Story = {
	render: (args) => {
		const [date, setDate] = useState<Date | undefined>();
		return <DateInput {...args} value={date} onChange={setDate} />;
	},
	args: {},
};
