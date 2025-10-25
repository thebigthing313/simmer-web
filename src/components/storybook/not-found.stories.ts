import type { Meta, StoryObj } from '@storybook/react-vite';

import { NotFound } from '../not-found';

const meta = {
	title: 'Pages/NotFound',
	component: NotFound,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		onGoHome: { action: 'go home clicked' },
	},
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
