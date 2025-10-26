import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PhoneNumber } from 'libphonenumber-js/min';
import { useState } from 'react';

import { PhoneInput } from '../inputs/phone-input';

const meta = {
	title: 'Inputs/PhoneInput',
	component: PhoneInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A controlled phone input component with country selection, real-time formatting, extension support, and validation.\n\n**Color-related Tailwind classes and their targets:**\n- `border-input` → InputGroup container border (extension input).\n- `text-muted-foreground` → InputGroupAddon text (e.g., "ext." label).\n- `ring-ring/50` → InputGroup focus ring (semi-transparent).\n- `border-ring` → InputGroup border on focus.\n- `ring-destructive/20` → InputGroup error ring (invalid state).\n- `border-destructive` → InputGroup border on invalid state.\n- `dark:bg-input/30` → InputGroup background in dark mode.\n- `dark:border-input` → InputGroup border in dark mode.\n- `dark:aria-invalid:ring-destructive/40` → InputGroup error ring in dark mode.\n- `border` → Flag button border (outline variant).\n- `hover:bg-accent` → Flag button background on hover.\n- `hover:text-accent-foreground` → Flag button text on hover.\n\nThese map to CSS variables (e.g., `--input`, `--muted-foreground`, `--accent`, `--ring`, `--destructive`) for easy theming.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		showExt: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof PhoneInput>;

export default meta;

export const Default: StoryObj<typeof PhoneInput> = {
	render: () => {
		const [value, setValue] = useState<PhoneNumber | undefined>();

		return (
			<div className="space-y-4">
				<PhoneInput value={value} onChange={setValue} />
				<div className="text-sm text-muted-foreground">
					<strong>Parsed Value:</strong> {value ? value.number : 'None'}
					{value?.ext && <span> (Ext: {value.ext})</span>}
				</div>
			</div>
		);
	},
};
