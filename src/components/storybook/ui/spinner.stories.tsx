import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '../../ui/spinner';

const meta = {
	title: 'UI/Spinner',
	component: Spinner,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A loading spinner component.\n\n**Theming classes applied:**\n\n- `size-4` → Size 16px.\n- `animate-spin` → Continuous spin animation.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
