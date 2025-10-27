import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../ui/button';
import {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
} from '../../ui/button-group';

const meta = {
	title: 'UI/ButtonGroup',
	component: ButtonGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					"A component for grouping buttons and related elements together.\n\n**Theming classes applied:**\n\n**ButtonGroup (Base):**\n- `flex` -> Display flex.\n- `w-fit` -> Width fit content.\n- `items-stretch` -> Stretch items to fill height.\n- `[&>*]:focus-visible:z-10` -> Z-index 10 on focus for children.\n- `[&>*]:focus-visible:relative` -> Relative positioning on focus for children.\n- `[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit` -> Fit width for select triggers without width class.\n- `[&>input]:flex-1` -> Flex grow for input children.\n- `has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md` -> Rounded right for last select trigger when hidden select is last.\n- `has-[>[data-slot=button-group]]:gap-2` -> Gap 8px when containing nested button groups.\n\n**Horizontal Orientation:**\n- `[&>*:not(:first-child)]:rounded-l-none` -> No left border radius for non-first children.\n- `[&>*:not(:first-child)]:border-l-0` -> No left border for non-first children.\n- `[&>*:not(:last-child)]:rounded-r-none` -> No right border radius for non-last children.\n\n**Vertical Orientation:**\n- `flex-col` -> Column direction.\n- `[&>*:not(:first-child)]:rounded-t-none` -> No top border radius for non-first children.\n- `[&>*:not(:first-child)]:border-t-0` -> No top border for non-first children.\n- `[&>*:not(:last-child)]:rounded-b-none` -> No bottom border radius for non-last children.\n\n**ButtonGroupText:**\n- `bg-muted` -> Muted background.\n- `flex` -> Display flex.\n- `items-center` -> Centers items vertically.\n- `gap-2` -> Gap 8px.\n- `rounded-md` -> Medium border radius.\n- `border` -> Border.\n- `px-4` -> Horizontal padding 16px.\n- `text-sm` -> Small text size.\n- `font-medium` -> Medium font weight.\n- `shadow-xs` -> Extra small shadow.\n- `[&_svg]:pointer-events-none` -> No pointer events on SVG.\n- `[&_svg:not([class*='size-'])]:size-4` -> Size 16px for SVG without size class.\n\n**ButtonGroupSeparator:**\n- `bg-input` -> Input background.\n- `relative` -> Relative positioning.\n- `!m-0` -> No margin.\n- `self-stretch` -> Stretch to fill cross axis.\n- `data-[orientation=vertical]:h-auto` -> Auto height for vertical orientation.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		children: (
			<>
				<Button variant="outline">Button 1</Button>
				<Button variant="outline">Button 2</Button>
				<Button variant="outline">Button 3</Button>
			</>
		),
	},
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		children: (
			<>
				<Button variant="outline">Button 1</Button>
				<Button variant="outline">Button 2</Button>
				<Button variant="outline">Button 3</Button>
			</>
		),
	},
};

export const WithText: Story = {
	args: {
		children: (
			<>
				<Button variant="outline">Edit</Button>
				<ButtonGroupText>Selected: 3 items</ButtonGroupText>
				<Button variant="outline">Delete</Button>
			</>
		),
	},
};

export const WithSeparator: Story = {
	args: {
		children: (
			<>
				<Button variant="outline">Bold</Button>
				<Button variant="outline">Italic</Button>
				<ButtonGroupSeparator />
				<Button variant="outline">Left</Button>
				<Button variant="outline">Center</Button>
				<Button variant="outline">Right</Button>
			</>
		),
	},
};

export const Mixed: Story = {
	args: {
		children: (
			<>
				<Button variant="outline">File</Button>
				<Button variant="outline">Edit</Button>
				<ButtonGroupSeparator />
				<ButtonGroupText>Auto-save: On</ButtonGroupText>
				<Button variant="default">Save</Button>
			</>
		),
	},
};
