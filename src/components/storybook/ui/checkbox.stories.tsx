import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '../../ui/checkbox';

const meta = {
	title: 'UI/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A checkbox component for selecting options.\n\n**Theming classes applied:**\n\n**Checkbox (root):**\n- `border-input` → Input border color.\n- `dark:bg-input/30` → In dark mode, 30% opacity input background.\n- `data-[state=checked]:bg-primary` → When checked, primary background.\n- `data-[state=checked]:text-primary-foreground` → When checked, primary foreground text.\n- `dark:data-[state=checked]:bg-primary` → In dark mode, primary background when checked.\n- `data-[state=checked]:border-primary` → When checked, primary border.\n- `focus-visible:border-ring` → On focus, ring border.\n- `focus-visible:ring-ring/50` → On focus, 50% opacity ring.\n- `aria-invalid:ring-destructive/20` → When invalid, 20% opacity destructive ring.\n- `dark:aria-invalid:ring-destructive/40` → In dark mode, 40% opacity destructive ring when invalid.\n- `aria-invalid:border-destructive` → When invalid, destructive border.\n- `size-4` → Size 16px.\n- `shrink-0` → Prevents shrinking.\n- `rounded-[4px]` → 4px border radius.\n- `border` → Border.\n- `shadow-xs` → Extra small shadow.\n- `transition-shadow` → Transitions shadow.\n- `outline-none` → No outline.\n- `focus-visible:ring-[3px]` → On focus, 3px ring.\n- `disabled:cursor-not-allowed` → Disabled cursor.\n- `disabled:opacity-50` → 50% opacity when disabled.\n\n**Indicator:**\n- `grid` → Displays as grid.\n- `place-content-center` → Centers content.\n- `text-current` → Current text color.\n- `transition-none` → No transition.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
	args: {},
};

export const Checked: Story = {
	args: {
		checked: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const Indeterminate: Story = {
	args: {
		checked: 'indeterminate',
	},
};
