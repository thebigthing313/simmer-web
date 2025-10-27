import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../../ui/input';

const meta = {
	title: 'UI/Input',
	component: Input,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'An input component for text entry with various types and states.\n\n**Theming classes applied:**\n- `file:text-foreground` -> Text color for file input.\n- `placeholder:text-muted-foreground` -> Muted color for placeholder text.\n- `selection:bg-primary` -> Primary background for selected text.\n- `selection:text-primary-foreground` -> Primary foreground for selected text.\n- `dark:bg-input/30` -> 30% opacity input background in dark mode.\n- `border-input` -> Input border color.\n- `h-9` -> Height 36px.\n- `w-full` -> Full width.\n- `min-w-0` -> Minimum width 0.\n- `rounded-md` -> Medium border radius.\n- `border` -> Border.\n- `bg-transparent` -> Transparent background.\n- `px-3` -> Horizontal padding 3.\n- `py-1` -> Vertical padding 1.\n- `text-base` -> Base text size.\n- `shadow-xs` -> Extra small shadow.\n- `transition-[color,box-shadow]` -> Transitions color and box-shadow.\n- `outline-none` -> No outline.\n- `file:inline-flex` -> Inline flex for file input.\n- `file:h-7` -> Height 28px for file input.\n- `file:border-0` -> No border for file input.\n- `file:bg-transparent` -> Transparent background for file input.\n- `file:text-sm` -> Small text for file input.\n- `file:font-medium` -> Medium font for file input.\n- `disabled:pointer-events-none` -> No pointer events when disabled.\n- `disabled:cursor-not-allowed` -> Not allowed cursor when disabled.\n- `disabled:opacity-50` -> 50% opacity when disabled.\n- `md:text-sm` -> Small text on medium screens.\n- `focus-visible:border-ring` -> Ring border on focus.\n- `focus-visible:ring-ring/50` -> 50% opacity ring on focus.\n- `focus-visible:ring-[3px]` -> 3px ring on focus.\n- `aria-invalid:ring-destructive/20` -> 20% opacity destructive ring when invalid.\n- `dark:aria-invalid:ring-destructive/40` -> 40% opacity destructive ring in dark mode when invalid.\n- `aria-invalid:border-destructive` -> Destructive border when invalid.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: 'Enter text...',
	},
};

export const WithValue: Story = {
	args: {
		value: 'Sample text',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		placeholder: 'Disabled input',
	},
};

export const File: Story = {
	args: {
		type: 'file',
	},
};

export const Email: Story = {
	args: {
		type: 'email',
		placeholder: 'Enter email',
	},
};
