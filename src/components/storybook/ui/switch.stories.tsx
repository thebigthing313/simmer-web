import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from '../../ui/switch';

const meta = {
	title: 'UI/Switch',
	component: Switch,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A toggle switch component.\n\n**Theming classes applied:**\n\n**Root:**\n- `peer` -> Peer for styling siblings.\n- `data-[state=checked]:bg-primary` -> Primary background when checked.\n- `data-[state=unchecked]:bg-input` -> Input background when unchecked.\n- `focus-visible:border-ring` -> Ring border on focus.\n- `focus-visible:ring-ring/50` -> 50% opacity ring on focus.\n- `dark:data-[state=unchecked]:bg-input/80` -> 80% input background in dark mode when unchecked.\n- `inline-flex` -> Inline flex display.\n- `h-[1.15rem]` -> Height 18.4px.\n- `w-8` -> Width 32px.\n- `shrink-0` -> Prevents shrinking.\n- `items-center` -> Centers items vertically.\n- `rounded-full` -> Full border radius.\n- `border` -> Border.\n- `border-transparent` -> Transparent border.\n- `shadow-xs` -> Extra small shadow.\n- `transition-all` -> Transitions all properties.\n- `outline-none` -> No outline.\n- `focus-visible:ring-[3px]` -> Ring 3px on focus.\n- `disabled:cursor-not-allowed` -> Not allowed cursor when disabled.\n- `disabled:opacity-50` -> 50% opacity when disabled.\n\n**Thumb:**\n- `bg-background` -> Background color.\n- `dark:data-[state=unchecked]:bg-foreground` -> Foreground background in dark mode when unchecked.\n- `dark:data-[state=checked]:bg-primary-foreground` -> Primary foreground background in dark mode when checked.\n- `pointer-events-none` -> No pointer events.\n- `block` -> Display block.\n- `size-4` -> Size 16px.\n- `rounded-full` -> Full border radius.\n- `ring-0` -> No ring.\n- `transition-transform` -> Transitions transform.\n- `data-[state=checked]:translate-x-[calc(100%-2px)]` -> Translates X when checked.\n- `data-[state=unchecked]:translate-x-0` -> No translation when unchecked.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
	args: {},
};

export const On: Story = {
	args: {
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
