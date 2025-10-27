import type { Meta, StoryObj } from '@storybook/react-vite';

import { Calendar } from '../../ui/calendar';

const meta = {
	title: 'UI/Calendar',
	component: Calendar,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A calendar component for date selection.\n\n**Theming classes applied:**\n\n**Root:**\n- `bg-background` -> Background color.\n- `group/calendar` -> Group for calendar styling.\n- `p-3` -> Padding 12px.\n- `[--cell-size:--spacing(8)]` -> Cell size CSS variable.\n- `[[data-slot=card-content]_&]:bg-transparent` -> Transparent background in card content.\n- `[[data-slot=popover-content]_&]:bg-transparent` -> Transparent background in popover content.\n- `rtl:**:[.rdp-button\\_next>svg]:rotate-180` -> Rotate next button SVG in RTL.\n- `rtl:**:[.rdp-button\\_previous>svg]:rotate-180` -> Rotate previous button SVG in RTL.\n\n**Months:**\n- `flex` -> Display flex.\n- `gap-4` -> Gap 16px.\n- `flex-col` -> Column direction.\n- `md:flex-row` -> Row direction on medium screens.\n- `relative` -> Relative positioning.\n\n**Month:**\n- `flex` -> Display flex.\n- `flex-col` -> Column direction.\n- `w-full` -> Full width.\n- `gap-4` -> Gap 16px.\n\n**Nav:**\n- `flex` -> Display flex.\n- `items-center` -> Centers items vertically.\n- `gap-1` -> Gap 4px.\n- `w-full` -> Full width.\n- `absolute` -> Absolute positioning.\n- `top-0` -> Top 0.\n- `inset-x-0` -> Full width inset.\n- `justify-between` -> Justify between.\n\n**Button Previous/Next:**\n- Uses `buttonVariants({ variant: buttonVariant })`.\n- `size-(--cell-size)` -> Size from CSS variable.\n- `aria-disabled:opacity-50` -> 50% opacity when disabled.\n- `p-0` -> No padding.\n- `select-none` -> Prevents text selection.\n\n**Month Caption:**\n- `flex` -> Display flex.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n- `h-(--cell-size)` -> Height from CSS variable.\n- `w-full` -> Full width.\n- `px-(--cell-size)` -> Horizontal padding from CSS variable.\n\n**Dropdowns:**\n- `w-full` -> Full width.\n- `flex` -> Display flex.\n- `items-center` -> Centers items vertically.\n- `text-sm` -> Small text size.\n- `font-medium` -> Medium font weight.\n- `justify-center` -> Centers items horizontally.\n- `h-(--cell-size)` -> Height from CSS variable.\n- `gap-1.5` -> Gap 6px.\n\n**Dropdown Root:**\n- `relative` -> Relative positioning.\n- `has-focus:border-ring` -> Ring border on focus.\n- `border` -> Border.\n- `border-input` -> Input border.\n- `shadow-xs` -> Extra small shadow.\n- `has-focus:ring-ring/50` -> 50% opacity ring on focus.\n- `has-focus:ring-[3px]` -> Ring 3px on focus.\n- `rounded-md` -> Medium border radius.\n\n**Dropdown:**\n- `absolute` -> Absolute positioning.\n- `bg-popover` -> Popover background.\n- `inset-0` -> Full inset.\n- `opacity-0` -> Transparent.\n\n**Caption Label:**\n- `select-none` -> Prevents text selection.\n- `font-medium` -> Medium font weight.\n- `text-sm` -> Small text size (for label layout).\n- `rounded-md` -> Medium border radius (for dropdown layout).\n- `pl-2` -> Left padding 8px (for dropdown layout).\n- `pr-1` -> Right padding 4px (for dropdown layout).\n- `flex` -> Display flex (for dropdown layout).\n- `items-center` -> Centers items vertically (for dropdown layout).\n- `gap-1` -> Gap 4px (for dropdown layout).\n- `h-8` -> Height 32px (for dropdown layout).\n- `[&>svg]:text-muted-foreground` -> Muted foreground for SVG (for dropdown layout).\n- `[&>svg]:size-3.5` -> Size 14px for SVG (for dropdown layout).\n\n**Table:**\n- `w-full` -> Full width.\n- `border-collapse` -> Border collapse.\n\n**Weekdays:**\n- `flex` -> Display flex.\n\n**Weekday:**\n- `text-muted-foreground` -> Muted foreground text.\n- `rounded-md` -> Medium border radius.\n- `flex-1` -> Grows to fill space.\n- `font-normal` -> Normal font weight.\n- `text-[0.8rem]` -> Small text size.\n- `select-none` -> Prevents text selection.\n\n**Week:**\n- `flex` -> Display flex.\n- `w-full` -> Full width.\n- `mt-2` -> Top margin 8px.\n\n**Week Number Header:**\n- `select-none` -> Prevents text selection.\n- `w-(--cell-size)` -> Width from CSS variable.\n\n**Week Number:**\n- `text-[0.8rem]` -> Small text size.\n- `select-none` -> Prevents text selection.\n- `text-muted-foreground` -> Muted foreground text.\n\n**Day:**\n- `relative` -> Relative positioning.\n- `w-full` -> Full width.\n- `h-full` -> Full height.\n- `p-0` -> No padding.\n- `text-center` -> Center text.\n- `[&:first-child[data-selected=true]_button]:rounded-l-md` -> Left border radius for first selected button.\n- `[&:last-child[data-selected=true]_button]:rounded-r-md` -> Right border radius for last selected button.\n- `group/day` -> Group for day styling.\n- `aspect-square` -> Square aspect ratio.\n- `select-none` -> Prevents text selection.\n\n**Range Start:**\n- `rounded-l-md` -> Left border radius.\n- `bg-accent` -> Accent background.\n\n**Range Middle:**\n- `rounded-none` -> No border radius.\n\n**Range End:**\n- `rounded-r-md` -> Right border radius.\n- `bg-accent` -> Accent background.\n\n**Today:**\n- `bg-accent` -> Accent background.\n- `text-accent-foreground` -> Accent foreground text.\n- `rounded-md` -> Medium border radius.\n- `data-[selected=true]:rounded-none` -> No border radius when selected.\n\n**Outside:**\n- `text-muted-foreground` -> Muted foreground text.\n- `aria-selected:text-muted-foreground` -> Muted foreground when selected.\n\n**Disabled:**\n- `text-muted-foreground` -> Muted foreground text.\n- `opacity-50` -> 50% opacity.\n\n**Hidden:**\n- `invisible` -> Invisible.\n\n**CalendarDayButton:**\n- `data-[selected-single=true]:bg-primary` -> Primary background for single selection.\n- `data-[selected-single=true]:text-primary-foreground` -> Primary foreground for single selection.\n- `data-[range-middle=true]:bg-accent` -> Accent background for range middle.\n- `data-[range-middle=true]:text-accent-foreground` -> Accent foreground for range middle.\n- `data-[range-start=true]:bg-primary` -> Primary background for range start.\n- `data-[range-start=true]:text-primary-foreground` -> Primary foreground for range start.\n- `data-[range-end=true]:bg-primary` -> Primary background for range end.\n- `data-[range-end=true]:text-primary-foreground` -> Primary foreground for range end.\n- `group-data-[focused=true]/day:border-ring` -> Ring border when focused.\n- `group-data-[focused=true]/day:ring-ring/50` -> 50% opacity ring when focused.\n- `dark:hover:text-accent-foreground` -> Accent foreground on hover in dark mode.\n- `flex` -> Display flex.\n- `aspect-square` -> Square aspect ratio.\n- `size-auto` -> Auto size.\n- `w-full` -> Full width.\n- `min-w-(--cell-size)` -> Minimum width from CSS variable.\n- `flex-col` -> Column direction.\n- `gap-1` -> Gap 4px.\n- `leading-none` -> No line height.\n- `font-normal` -> Normal font weight.\n- `group-data-[focused=true]/day:relative` -> Relative positioning when focused.\n- `group-data-[focused=true]/day:z-10` -> Z-index 10 when focused.\n- `group-data-[focused=true]/day:ring-[3px]` -> Ring 3px when focused.\n- `data-[range-end=true]:rounded-md` -> Medium border radius for range end.\n- `data-[range-end=true]:rounded-r-md` -> Right border radius for range end.\n- `data-[range-middle=true]:rounded-none` -> No border radius for range middle.\n- `data-[range-start=true]:rounded-md` -> Medium border radius for range start.\n- `data-[range-start=true]:rounded-l-md` -> Left border radius for range start.\n- `[&>span]:text-xs` -> Extra small text for spans.\n- `[&>span]:opacity-70` -> 70% opacity for spans.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		mode: 'single',
	},
};

export const Multiple: Story = {
	args: {
		mode: 'multiple',
		selected: [new Date(2025, 9, 15), new Date(2025, 9, 20)],
	},
};

export const Range: Story = {
	args: {
		mode: 'range',
		selected: {
			from: new Date(2025, 9, 15),
			to: new Date(2025, 9, 20),
		},
	},
};

export const WithCaptionDropdown: Story = {
	args: {
		mode: 'single',
		captionLayout: 'dropdown',
		fromYear: 2020,
		toYear: 2030,
	},
};

export const Disabled: Story = {
	args: {
		mode: 'single',
		disabled: [new Date(2025, 9, 15), new Date(2025, 9, 20)],
	},
};
