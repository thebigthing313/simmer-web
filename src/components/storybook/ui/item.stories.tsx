import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, MoreHorizontal, Settings, Star, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemGroup,
	ItemHeader,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from '../../ui/item';

const meta = {
	title: 'UI/Item',
	component: Item,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A flexible item component with various variants and sub-components for displaying structured content.\n\n**Theming classes applied:**\n\n**ItemGroup:**\n- `group/item-group` → Creates a CSS group for styling child elements.\n- `flex` → Uses flexbox layout.\n- `flex-col` → Vertical layout.\n\n**ItemSeparator:**\n- `my-0` → Removes vertical margins.\n\n**Item (base styles):**\n- `group/item` → Creates a CSS group for styling child elements.\n- `flex` → Uses flexbox layout.\n- `items-center` → Centers items vertically.\n- `border` → Adds border.\n- `border-transparent` → Transparent border by default.\n- `text-sm` → Small text size.\n- `rounded-md` → Medium border radius.\n- `transition-colors` → Smooth color transitions.\n- `[a]:hover:bg-accent/50` → Hover effect on links.\n- `[a]:transition-colors` → Smooth transitions on links.\n- `duration-100` → 100ms transition duration.\n- `flex-wrap` → Allows flex items to wrap.\n- `outline-none` → Removes default outline.\n- `focus-visible:border-ring` → Ring border on focus.\n- `focus-visible:ring-ring/50` → Ring color on focus.\n- `focus-visible:ring-[3px]` → Ring width on focus.\n\n**Item (variant styles):**\n- `default`: `bg-transparent` → Transparent background.\n- `outline`: `border-border` → Border styling.\n- `muted`: `bg-muted/50` → Muted background.\n\n**Item (size styles):**\n- `default`: `p-4 gap-4` → Default padding and gap.\n- `sm`: `py-3 px-4 gap-2.5` → Smaller padding and gap.\n\n**ItemMedia (base styles):**\n- `flex` → Uses flexbox layout.\n- `shrink-0` → Prevents shrinking.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `gap-2` → Gap between items.\n- `group-has-[[data-slot=item-description]]/item:self-start` → Aligns to start when description present.\n- `[_svg]:pointer-events-none` → Disables pointer events on icons.\n- `group-has-[[data-slot=item-description]]/item:translate-y-0.5` → Slight vertical offset when description present.\n\n**ItemMedia (variant styles):**\n- `default`: `bg-transparent` → Transparent background.\n- `icon`: `size-8 border rounded-sm bg-muted [_svg:not([class*='size-'])]:size-4` → Icon styling with border and background.\n- `image`: `size-10 rounded-sm overflow-hidden [_img]:size-full [_img]:object-cover` → Image styling with rounded corners.\n\n**ItemContent:**\n- `flex` → Uses flexbox layout.\n- `flex-1` → Takes remaining space.\n- `flex-col` → Vertical layout.\n- `gap-1` → Gap between items.\n- `[&+[data-slot=item-content]]:flex-none` → Prevents flex when adjacent to another content.\n\n**ItemTitle:**\n- `flex` → Uses flexbox layout.\n- `w-fit` → Fits content width.\n- `items-center` → Centers items vertically.\n- `gap-2` → Gap between items.\n- `text-sm` → Small text size.\n- `leading-snug` → Tight line height.\n- `font-medium` → Medium font weight.\n\n**ItemDescription:**\n- `text-muted-foreground` → Muted text color.\n- `line-clamp-2` → Limits to 2 lines.\n- `text-sm` → Small text size.\n- `leading-normal` → Normal line height.\n- `font-normal` → Normal font weight.\n- `text-balance` → Balances text.\n- `[&>a:hover]:text-primary` → Primary color on link hover.\n- `[&>a]:underline` → Underlines links.\n- `[&>a]:underline-offset-4` → Underline offset.\n\n**ItemActions:**\n- `flex` → Uses flexbox layout.\n- `items-center` → Centers items vertically.\n- `gap-2` → Gap between items.\n\n**ItemHeader:**\n- `flex` → Uses flexbox layout.\n- `basis-full` → Takes full width.\n- `items-center` → Centers items vertically.\n- `justify-between` → Space between items.\n- `gap-2` → Gap between items.\n\n**ItemFooter:**\n- `flex` → Uses flexbox layout.\n- `basis-full` → Takes full width.\n- `items-center` → Centers items vertically.\n- `justify-between` → Space between items.\n- `gap-2` → Gap between items.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<ItemMedia>
					<User className="size-5" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>John Doe</ItemTitle>
					<ItemDescription>Software Engineer at Tech Corp</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						Follow
					</Button>
				</ItemActions>
			</>
		),
	},
};

export const WithIconMedia: Story = {
	args: {
		children: (
			<>
				<ItemMedia variant="icon">
					<Settings className="size-4" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Settings</ItemTitle>
					<ItemDescription>Manage your account preferences</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm">Configure</Button>
				</ItemActions>
			</>
		),
	},
};

export const WithImageMedia: Story = {
	args: {
		children: (
			<>
				<ItemMedia variant="image">
					<Avatar className="size-10">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</ItemMedia>
				<ItemContent>
					<ItemTitle>shadcn</ItemTitle>
					<ItemDescription>
						Building the future of UI components
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						View Profile
					</Button>
				</ItemActions>
			</>
		),
	},
};

export const OutlineVariant: Story = {
	args: {
		variant: 'outline',
		children: (
			<>
				<ItemMedia>
					<Bell className="size-5" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Notifications</ItemTitle>
					<ItemDescription>You have 3 unread messages</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Badge variant="secondary">3</Badge>
				</ItemActions>
			</>
		),
	},
};

export const MutedVariant: Story = {
	args: {
		variant: 'muted',
		children: (
			<>
				<ItemMedia>
					<Star className="size-5" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Featured Item</ItemTitle>
					<ItemDescription>This item is highlighted</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="ghost">
						<MoreHorizontal className="size-4" />
					</Button>
				</ItemActions>
			</>
		),
	},
};

export const SmallSize: Story = {
	args: {
		size: 'sm',
		children: (
			<>
				<ItemMedia>
					<User className="size-4" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Jane Smith</ItemTitle>
					<ItemDescription>Product Manager</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						Message
					</Button>
				</ItemActions>
			</>
		),
	},
};

export const WithHeaderAndFooter: Story = {
	args: {
		children: (
			<>
				<ItemHeader>
					<ItemTitle>Project Alpha</ItemTitle>
					<Badge>In Progress</Badge>
				</ItemHeader>
				<ItemContent>
					<ItemDescription>
						A comprehensive project management application with modern UI and
						real-time collaboration features.
					</ItemDescription>
				</ItemContent>
				<ItemFooter>
					<span className="text-sm text-muted-foreground">
						Updated 2 hours ago
					</span>
					<Button size="sm">View Details</Button>
				</ItemFooter>
			</>
		),
	},
};

export const ItemGroupExample: Story = {
	args: {
		children: null,
	},
	render: () => (
		<ItemGroup>
			<Item>
				<ItemMedia>
					<User className="size-5" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Alice Johnson</ItemTitle>
					<ItemDescription>Frontend Developer</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						Connect
					</Button>
				</ItemActions>
			</Item>
			<ItemSeparator />
			<Item>
				<ItemMedia>
					<User className="size-5" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Bob Wilson</ItemTitle>
					<ItemDescription>Backend Developer</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						Connect
					</Button>
				</ItemActions>
			</Item>
			<ItemSeparator />
			<Item>
				<ItemMedia>
					<User className="size-5" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>Carol Brown</ItemTitle>
					<ItemDescription>UI/UX Designer</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button size="sm" variant="outline">
						Connect
					</Button>
				</ItemActions>
			</Item>
		</ItemGroup>
	),
};
