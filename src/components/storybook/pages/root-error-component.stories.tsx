import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { RootErrorComponent } from '../../root-error-component';

const meta = {
	title: 'Pages/Root Error Component',
	component: RootErrorComponent,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
	args: { onGoHome: fn() },
} satisfies Meta<typeof RootErrorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		error: new Error('An unexpected error occurred while loading the page.'),
		isDevelopment: false,
	},
};

export const Development: Story = {
	args: {
		error: new Error('An unexpected error occurred while loading the page.'),
		isDevelopment: true,
	},
};
