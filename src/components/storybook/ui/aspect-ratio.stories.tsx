import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from '../../ui/aspect-ratio';

const meta = {
	title: 'UI/AspectRatio',
	component: AspectRatio,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					"A component that maintains a consistent aspect ratio for its content.\n\n**Theming classes applied:**\n\nThis component is a wrapper around Radix UI's AspectRatio primitive and doesn't apply any custom Tailwind classes. The aspect ratio is controlled by the `ratio` prop, and any styling should be applied to the content inside the AspectRatio component.\n\n**Usage examples:**\n- `ratio={16 / 9}` for 16:9 aspect ratio\n- `ratio={4 / 3}` for 4:3 aspect ratio\n- `ratio={1}` for 1:1 square aspect ratio",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SixteenByNine: Story = {
	args: {
		ratio: 16 / 9,
		children: (
			<img
				src="https://placebear.com/200/300"
				alt="Mountain landscape"
				className="h-full w-full rounded-md object-cover"
			/>
		),
	},
};

export const FourByThree: Story = {
	args: {
		ratio: 4 / 3,
		children: (
			<img
				src="https://placebear.com/200/300"
				alt="Forest path"
				className="h-full w-full rounded-md object-cover"
			/>
		),
	},
};

export const Square: Story = {
	args: {
		ratio: 1,
		children: (
			<img
				src="https://placebear.com/200/300"
				alt="Portrait"
				className="h-full w-full rounded-md object-cover"
			/>
		),
	},
};

export const Video: Story = {
	args: {
		ratio: 16 / 9,
		children: (
			<iframe
				src="https://youtu.be/izKQhVjionQ?si=BOYHKwFfLbsyb0z7"
				title="Video player"
				className="h-full w-full rounded-md"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		),
	},
};
