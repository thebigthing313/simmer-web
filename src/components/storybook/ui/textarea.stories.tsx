import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from '../../ui/textarea';

const meta = {
	title: 'UI/Textarea',
	component: Textarea,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A multi-line text input component.\n\n**Theming classes applied:**\n\n- `border-input` -> Input border.\n- `placeholder:text-muted-foreground` -> Muted foreground for placeholder.\n- `focus-visible:border-ring` -> Ring border on focus.\n- `focus-visible:ring-ring/50` -> 50% opacity ring on focus.\n- `aria-invalid:ring-destructive/20` -> 20% destructive ring for invalid state.\n- `dark:aria-invalid:ring-destructive/40` -> 40% destructive ring in dark mode for invalid.\n- `aria-invalid:border-destructive` -> Destructive border for invalid state.\n- `dark:bg-input/30` -> 30% input background in dark mode.\n- `flex` -> Display flex.\n- `field-sizing-content` -> Sizes field to content.\n- `min-h-16` -> Minimum height 64px.\n- `w-full` -> Full width.\n- `rounded-md` -> Medium border radius.\n- `border` -> Border.\n- `bg-transparent` -> Transparent background.\n- `px-3` -> Horizontal padding 12px.\n- `py-2` -> Vertical padding 8px.\n- `text-base` -> Base text size.\n- `shadow-xs` -> Extra small shadow.\n- `transition-[color,box-shadow]` -> Transitions color and box-shadow.\n- `outline-none` -> No outline.\n- `focus-visible:ring-[3px]` -> Ring 3px on focus.\n- `disabled:cursor-not-allowed` -> Not allowed cursor when disabled.\n- `disabled:opacity-50` -> 50% opacity when disabled.\n- `md:text-sm` -> Small text on medium screens and up.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text...',
	},
};

export const WithValue: Story = {
	args: {
		value: 'Sample text\nwith multiple lines.',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Disabled textarea',
	},
};
