import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from '../../ui/slider';

const meta = {
	title: 'UI/Slider',
	component: Slider,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A slider component for selecting a value or range.\n\n**Theming classes applied:**\n\n**Root:**\n- `relative` -> Relative positioning.\n- `flex` -> Display flex.\n- `w-full` -> Full width.\n- `touch-none` -> Disables touch actions.\n- `items-center` -> Centers items vertically.\n- `select-none` -> Prevents text selection.\n- `data-[disabled]:opacity-50` -> 50% opacity when disabled.\n- `data-[orientation=vertical]:h-full` -> Full height for vertical orientation.\n- `data-[orientation=vertical]:min-h-44` -> Minimum height 176px for vertical.\n- `data-[orientation=vertical]:w-auto` -> Auto width for vertical.\n- `data-[orientation=vertical]:flex-col` -> Column direction for vertical.\n\n**Track:**\n- `bg-muted` -> Muted background.\n- `relative` -> Relative positioning.\n- `grow` -> Grows to fill space.\n- `overflow-hidden` -> Hides overflow.\n- `rounded-full` -> Full border radius.\n- `data-[orientation=horizontal]:h-1.5` -> Height 6px for horizontal.\n- `data-[orientation=horizontal]:w-full` -> Full width for horizontal.\n- `data-[orientation=vertical]:h-full` -> Full height for vertical.\n- `data-[orientation=vertical]:w-1.5` -> Width 6px for vertical.\n\n**Range:**\n- `bg-primary` -> Primary background.\n- `absolute` -> Absolute positioning.\n- `data-[orientation=horizontal]:h-full` -> Full height for horizontal.\n- `data-[orientation=vertical]:w-full` -> Full width for vertical.\n\n**Thumb:**\n- `border-primary` -> Primary border.\n- `ring-ring/50` -> 50% opacity ring.\n- `block` -> Display block.\n- `size-4` -> Size 16px.\n- `shrink-0` -> Prevents shrinking.\n- `rounded-full` -> Full border radius.\n- `border` -> Border.\n- `bg-white` -> White background.\n- `shadow-sm` -> Small shadow.\n- `transition-[color,box-shadow]` -> Transitions color and box-shadow.\n- `hover:ring-4` -> Ring 4 on hover.\n- `focus-visible:ring-4` -> Ring 4 on focus.\n- `focus-visible:outline-hidden` -> Hidden outline on focus.\n- `disabled:pointer-events-none` -> No pointer events when disabled.\n- `disabled:opacity-50` -> 50% opacity when disabled.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
	args: {
		defaultValue: [50],
		max: 100,
		step: 1,
		className: 'w-64',
	},
};

export const Range: Story = {
	args: {
		defaultValue: [25, 75],
		max: 100,
		step: 1,
		className: 'w-64',
	},
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		defaultValue: [50],
		max: 100,
		step: 1,
		className: 'h-32',
	},
};
