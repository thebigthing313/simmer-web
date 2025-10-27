import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileIcon } from 'lucide-react';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '../../ui/empty';

const meta = {
	title: 'UI/Empty',
	component: Empty,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					"An empty state component for displaying when there is no content to show.\n\n**Theming classes applied:**\n\n**Empty:**\n- `flex` -> Displays as flex container.\n- `min-w-0` -> Minimum width 0.\n- `flex-1` -> Grows to fill available space.\n- `flex-col` -> Flex direction column.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n- `gap-6` -> Gap between child elements.\n- `rounded-lg` -> Large border radius.\n- `border-dashed` -> Dashed border style.\n- `p-6` -> Padding on all sides.\n- `text-center` -> Centers text alignment.\n- `text-balance` -> Balances text layout.\n- `md:p-12` -> Increased padding on medium screens and up.\n\n**EmptyHeader:**\n- `flex` -> Displays as flex container.\n- `max-w-sm` -> Maximum width small.\n- `flex-col` -> Flex direction column.\n- `items-center` -> Centers items vertically.\n- `gap-2` -> Gap between child elements.\n- `text-center` -> Centers text alignment.\n\n**EmptyMedia (default):**\n- `flex` -> Displays as flex container.\n- `shrink-0` -> Prevents shrinking.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n- `mb-2` -> Bottom margin.\n- `[&_svg]:pointer-events-none` -> Disables pointer events on SVG.\n- `[&_svg]:shrink-0` -> Prevents SVG from shrinking.\n\n**EmptyMedia (icon):**\n- `bg-muted` -> Muted background color.\n- `text-foreground` -> Foreground text color.\n- `flex` -> Displays as flex container.\n- `size-10` -> Size 40px.\n- `shrink-0` -> Prevents shrinking.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n- `rounded-lg` -> Large border radius.\n- `[&_svg:not([class*='size-'])]:size-6` -> Sets SVG size to 24px if no size class.\n\n**EmptyTitle:**\n- `text-lg` -> Large text size.\n- `font-medium` -> Medium font weight.\n- `tracking-tight` -> Tight letter spacing.\n\n**EmptyDescription:**\n- `text-muted-foreground` -> Muted foreground text color.\n- `[&>a:hover]:text-primary` -> Primary color on link hover.\n- `text-sm/relaxed` -> Small text with relaxed line height.\n- `[&>a]:underline` -> Underlines links.\n- `[&>a]:underline-offset-4` -> Underline offset.\n\n**EmptyContent:**\n- `flex` -> Displays as flex container.\n- `w-full` -> Full width.\n- `max-w-sm` -> Maximum width small.\n- `min-w-0` -> Minimum width 0.\n- `flex-col` -> Flex direction column.\n- `items-center` -> Centers items vertically.\n- `gap-4` -> Gap between child elements.\n- `text-sm` -> Small text size.\n- `text-balance` -> Balances text layout.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<EmptyHeader>
					<EmptyMedia>
						<FileIcon />
					</EmptyMedia>
					<EmptyTitle>No data</EmptyTitle>
					<EmptyDescription>
						There is no data to display at the moment.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<p>Try refreshing the page or check back later.</p>
				</EmptyContent>
			</>
		),
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<FileIcon />
					</EmptyMedia>
					<EmptyTitle>Empty state</EmptyTitle>
					<EmptyDescription>
						This is an empty state with icon variant.
					</EmptyDescription>
				</EmptyHeader>
			</>
		),
	},
};
