import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';

const meta = {
	title: 'UI/Select',
	component: Select,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					"A select component for choosing from a list of options.\n\n**Theming classes applied:**\n\n**Trigger:**\n- `border-input` -> Input border color.\n- `data-[placeholder]:text-muted-foreground` -> Muted foreground for placeholder.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` -> Muted foreground for SVG without text class.\n- `focus-visible:border-ring` -> Ring border on focus.\n- `focus-visible:ring-ring/50` -> 50% opacity ring on focus.\n- `aria-invalid:ring-destructive/20` -> 20% opacity destructive ring when invalid.\n- `dark:aria-invalid:ring-destructive/40` -> 40% opacity destructive ring in dark mode when invalid.\n- `aria-invalid:border-destructive` -> Destructive border when invalid.\n- `dark:bg-input/30` -> 30% opacity input background in dark mode.\n- `dark:hover:bg-input/50` -> 50% opacity input background on hover in dark mode.\n- `flex` -> Display flex.\n- `w-fit` -> Width fit content.\n- `items-center` -> Centers items vertically.\n- `justify-between` -> Justifies content between.\n- `gap-2` -> Gap between items.\n- `rounded-md` -> Medium border radius.\n- `border` -> Border.\n- `bg-transparent` -> Transparent background.\n- `px-3` -> Horizontal padding 3.\n- `py-2` -> Vertical padding 2.\n- `text-sm` -> Small text size.\n- `whitespace-nowrap` -> No text wrapping.\n- `shadow-xs` -> Extra small shadow.\n- `transition-[color,box-shadow]` -> Transitions color and box-shadow.\n- `outline-none` -> No outline.\n- `focus-visible:ring-[3px]` -> 3px ring on focus.\n- `disabled:cursor-not-allowed` -> Not allowed cursor when disabled.\n- `disabled:opacity-50` -> 50% opacity when disabled.\n- `data-[size=default]:h-9` -> Height 36px for default size.\n- `data-[size=sm]:h-8` -> Height 32px for small size.\n- `*:data-[slot=select-value]:line-clamp-1` -> Line clamp 1 for select value.\n- `*:data-[slot=select-value]:flex` -> Flex for select value.\n- `*:data-[slot=select-value]:items-center` -> Centers items in select value.\n- `*:data-[slot=select-value]:gap-2` -> Gap 2 in select value.\n- `[&_svg]:pointer-events-none` -> No pointer events on SVG.\n- `[&_svg]:shrink-0` -> No shrink on SVG.\n- `[&_svg:not([class*='size-'])]:size-4` -> Size 4 on SVG without size class.\n\n**Content:**\n- `bg-popover` -> Popover background.\n- `text-popover-foreground` -> Popover foreground text.\n- `data-[state=open]:animate-in` -> Animate in when open.\n- `data-[state=closed]:animate-out` -> Animate out when closed.\n- `data-[state=closed]:fade-out-0` -> Fade out to 0 when closed.\n- `data-[state=open]:fade-in-0` -> Fade in from 0 when open.\n- `data-[state=closed]:zoom-out-95` -> Zoom out to 95% when closed.\n- `data-[state=open]:zoom-in-95` -> Zoom in from 95% when open.\n- `data-[side=bottom]:slide-in-from-top-2` -> Slide in from top for bottom side.\n- `data-[side=left]:slide-in-from-right-2` -> Slide in from right for left side.\n- `data-[side=right]:slide-in-from-left-2` -> Slide in from left for right side.\n- `data-[side=top]:slide-in-from-bottom-2` -> Slide in from bottom for top side.\n- `relative` -> Relative positioning.\n- `z-50` -> Z-index 50.\n- `max-h-(--radix-select-content-available-height)` -> Max height from CSS variable.\n- `min-w-[8rem]` -> Min width 8rem.\n- `origin-(--radix-select-content-transform-origin)` -> Transform origin from CSS variable.\n- `overflow-x-hidden` -> Hide horizontal overflow.\n- `overflow-y-auto` -> Auto vertical overflow.\n- `rounded-md` -> Medium border radius.\n- `border` -> Border.\n- `shadow-md` -> Medium shadow.\n\n**Item:**\n- `focus:bg-accent` -> Accent background on focus.\n- `focus:text-accent-foreground` -> Accent foreground on focus.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` -> Muted foreground for SVG without text class.\n- `relative` -> Relative positioning.\n- `flex` -> Display flex.\n- `w-full` -> Full width.\n- `cursor-default` -> Default cursor.\n- `items-center` -> Centers items vertically.\n- `gap-2` -> Gap between items.\n- `rounded-sm` -> Small border radius.\n- `py-1.5` -> Vertical padding 1.5.\n- `pr-8` -> Right padding 8.\n- `pl-2` -> Left padding 2.\n- `text-sm` -> Small text size.\n- `outline-hidden` -> Hidden outline.\n- `select-none` -> Prevents text selection.\n- `data-[disabled]:pointer-events-none` -> No pointer events when disabled.\n- `data-[disabled]:opacity-50` -> 50% opacity when disabled.\n- `[&_svg]:pointer-events-none` -> No pointer events on SVG.\n- `[&_svg]:shrink-0` -> No shrink on SVG.\n- `[&_svg:not([class*='size-'])]:size-4` -> Size 4 on SVG without size class.\n- `*:[span]:last:flex` -> Flex for last span.\n- `*:[span]:last:items-center` -> Centers items in last span.\n- `*:[span]:last:gap-2` -> Gap 2 in last span.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<SelectTrigger>
					<SelectValue placeholder="Select an option" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="option1">Option 1</SelectItem>
					<SelectItem value="option2">Option 2</SelectItem>
					<SelectItem value="option3">Option 3</SelectItem>
				</SelectContent>
			</>
		),
	},
};

export const Small: Story = {
	args: {
		children: (
			<>
				<SelectTrigger size="sm">
					<SelectValue placeholder="Small select" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="a">A</SelectItem>
					<SelectItem value="b">B</SelectItem>
				</SelectContent>
			</>
		),
	},
};
