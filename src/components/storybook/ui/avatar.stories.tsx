import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

const meta = {
	title: 'UI/Avatar',
	component: Avatar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'An avatar component for displaying user images with fallback initials.\n\n**Theming classes applied:**\n\n**Avatar:**\n- `relative` → Positions the avatar relatively.\n- `flex` → Displays as a flex container.\n- `size-8` → Sets default size to 32px (can be overridden, e.g., size-16 for large).\n- `shrink-0` → Prevents the avatar from shrinking.\n- `overflow-hidden` → Hides overflowing content.\n- `rounded-full` → Applies full border radius for a circular shape.\n\n**AvatarImage:**\n- `aspect-square` → Maintains a square aspect ratio.\n- `size-full` → Fills the full size of the avatar.\n\n**AvatarFallback:**\n- `bg-muted` → Sets background color to the muted theme.\n- `flex` → Displays as a flex container.\n- `size-full` → Fills the full size.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `rounded-full` → Applies full border radius.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	args: {
		children: (
			<>
				<AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
				<AvatarFallback>CN</AvatarFallback>
			</>
		),
	},
};

export const WithFallback: Story = {
	args: {
		children: <AvatarFallback>JD</AvatarFallback>,
	},
};

export const Large: Story = {
	args: {
		className: 'size-16',
		children: <AvatarFallback>LG</AvatarFallback>,
	},
};

export const Small: Story = {
	args: {
		className: 'size-6',
		children: <AvatarFallback>SM</AvatarFallback>,
	},
};
