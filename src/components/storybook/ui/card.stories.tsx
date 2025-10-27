import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../ui/card';

const meta = {
	title: 'UI/Card',
	component: Card,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A card component for displaying content with header, content, and footer sections.\n\n**Theming classes applied:**\n\n**Card:**\n- `bg-card` → Card background color.\n- `text-card-foreground` → Card foreground text color.\n- `flex` → Displays as flex container.\n- `flex-col` → Flex direction column.\n- `gap-6` → Gap between sections.\n- `rounded-xl` → Extra large border radius.\n- `border` → Border.\n- `py-6` → Vertical padding.\n- `shadow-sm` → Small shadow.\n\n**CardHeader:**\n- `@container/card-header` → Container query for card header.\n- `grid` → Displays as grid.\n- `auto-rows-min` → Auto rows minimum size.\n- `grid-rows-[auto_auto]` → Two auto rows.\n- `items-start` → Aligns items to start.\n- `gap-2` → Gap between items.\n- `px-6` → Horizontal padding.\n- `has-data-[slot=card-action]:grid-cols-[1fr_auto]` → If has action, grid columns 1fr auto.\n- `[.border-b]:pb-6` → If has border bottom, bottom padding.\n\n**CardTitle:**\n- `leading-none` → No line height.\n- `font-semibold` → Semibold font weight.\n\n**CardDescription:**\n- `text-muted-foreground` → Muted foreground text color.\n- `text-sm` → Small text size.\n\n**CardAction:**\n- `col-start-2` → Starts at column 2.\n- `row-span-2` → Spans 2 rows.\n- `row-start-1` → Starts at row 1.\n- `self-start` → Aligns self to start.\n- `justify-self-end` → Justifies self to end.\n\n**CardContent:**\n- `px-6` → Horizontal padding.\n\n**CardFooter:**\n- `flex` → Displays as flex container.\n- `items-center` → Centers items vertically.\n- `px-6` → Horizontal padding.\n- `[.border-t]:pt-6` → If has border top, top padding.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card description goes here.</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This is the card content.</p>
				</CardContent>
			</>
		),
	},
};

export const WithAction: Story = {
	args: {
		children: (
			<>
				<CardHeader>
					<CardTitle>Card with Action</CardTitle>
					<CardDescription>Has an action button.</CardDescription>
					<CardAction>
						<Button variant="outline" size="sm">
							Action
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<p>Content here.</p>
				</CardContent>
			</>
		),
	},
};

export const WithFooter: Story = {
	args: {
		children: (
			<>
				<CardHeader>
					<CardTitle>Card with Footer</CardTitle>
				</CardHeader>
				<CardContent>
					<p>Main content.</p>
				</CardContent>
				<CardFooter>
					<Button>Save</Button>
				</CardFooter>
			</>
		),
	},
};
