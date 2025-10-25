import type { Meta, StoryObj } from '@storybook/react-vite';

import { AvatarInput } from '../inputs/avatar-input';

const meta = {
	title: 'Inputs/AvatarInput',
	component: AvatarInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'An avatar input component that allows file upload with image preview.\n\n**Color-related Tailwind classes and their targets:**\n- `text-muted-foreground` → Description text (e.g., "Please select a square image. Max 3MB.").\n- `ring-ring/50` → Focus ring (semi-transparent).\n- `border-ring` → Border on focus.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: {
			control: 'boolean',
		},
		required: {
			control: 'boolean',
		},
	},
} satisfies Meta<typeof AvatarInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
