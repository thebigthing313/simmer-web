import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CoordinatesInput } from '@/components/inputs/coordinates-input';
import { Toaster } from '@/components/ui/sonner';
import type { Coordinates } from '@/lib/types';

const meta = {
	title: 'Inputs/CoordinatesInput',
	component: CoordinatesInput,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A coordinates input component for latitude and longitude with cardinal direction buttons.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: 'object',
		},
		onChange: { action: 'coordinates changed' },
	},
} satisfies Meta<typeof CoordinatesInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: { latitude: 0, longitude: 0 },
	},
};

export const Interactive: Story = {
	args: { value: { latitude: 0, longitude: 0 } },
	render: () => {
		const [coords, setCoords] = React.useState<Coordinates>({
			latitude: 40.7128,
			longitude: -74.006,
		});
		return (
			<>
				<CoordinatesInput value={coords} onChange={setCoords} />
				<Toaster />
			</>
		);
	},
};
