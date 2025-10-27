import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from '../../ui/progress';

const meta = {
	title: 'UI/Progress',
	component: Progress,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A progress component for displaying completion status.\n\n**Theming classes applied:**\n\n**Root:**\n- `bg-primary/20` -> 20% opacity primary background.\n- `relative` -> Relative positioning.\n- `h-2` -> Height 8px.\n- `w-full` -> Full width.\n- `overflow-hidden` -> Hides overflow.\n- `rounded-full` -> Full border radius.\n\n**Indicator:**\n- `bg-primary` -> Primary background.\n- `h-full` -> Full height.\n- `w-full` -> Full width.\n- `flex-1` -> Grows to fill available space.\n- `transition-all` -> Transitions all properties.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: {
		value: 0,
		className: 'w-64',
	},
};

export const Half: Story = {
	args: {
		value: 50,
		className: 'w-64',
	},
};

export const Full: Story = {
	args: {
		value: 100,
		className: 'w-64',
	},
};
