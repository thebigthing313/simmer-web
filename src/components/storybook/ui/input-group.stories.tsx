import type { Meta, StoryObj } from '@storybook/react-vite';
import { Lock, Mail, Search, User } from 'lucide-react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from '../../ui/input-group';

const meta = {
	title: 'UI/InputGroup',
	component: InputGroup,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A flexible input group component with addons, buttons, and text elements.\n\n**Theming classes applied:**\n\n**InputGroup (main wrapper):**\n- `group/input-group` → Creates a CSS group for styling child elements.\n- `border-input` → Sets border color to input theme.\n- `dark:bg-input/30` → Sets background color with transparency in dark mode.\n- `relative` → Establishes positioning context.\n- `flex` → Uses flexbox layout.\n- `w-full` → Takes full width.\n- `items-center` → Centers items vertically.\n- `rounded-md` → Applies medium border radius.\n- `border` → Adds border.\n- `shadow-xs` → Applies small shadow.\n- `transition-[color,box-shadow]` → Smooth transitions for color and shadow.\n- `outline-none` → Removes default outline.\n- `h-9` → Sets height to 2.25rem.\n- `min-w-0` → Prevents flex item from shrinking below content.\n- `has-[>textarea]:h-auto` → Auto height when containing textarea.\n- `has-[>[data-align=inline-start]]:[&>input]:pl-2` → Adds left padding to input when addon is inline-start.\n- `has-[>[data-align=inline-end]]:[&>input]:pr-2` → Adds right padding to input when addon is inline-end.\n- `has-[>[data-align=block-start]]:h-auto` → Auto height for block-start alignment.\n- `has-[>[data-align=block-start]]:flex-col` → Vertical layout for block-start.\n- `has-[>[data-align=block-start]]:[&>input]:pb-3` → Bottom padding for input in block-start.\n- `has-[>[data-align=block-end]]:h-auto` → Auto height for block-end alignment.\n- `has-[>[data-align=block-end]]:flex-col` → Vertical layout for block-end.\n- `has-[>[data-align=block-end]]:[&>input]:pt-3` → Top padding for input in block-end.\n- `has-[[data-slot=input-group-control]:focus-visible]:border-ring` → Ring border on focus.\n- `has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50` → Ring color on focus.\n- `has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]` → Ring width on focus.\n- `has-[[data-slot][aria-invalid=true]]:ring-destructive/20` → Destructive ring for invalid state.\n- `has-[[data-slot][aria-invalid=true]]:border-destructive` → Destructive border for invalid.\n- `dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40` → Dark mode destructive ring.\n\n**InputGroupAddon (base styles):**\n- `text-muted-foreground` → Muted text color.\n- `flex` → Flexbox layout.\n- `h-auto` → Auto height.\n- `cursor-text` → Text cursor.\n- `items-center` → Vertical centering.\n- `justify-center` → Horizontal centering.\n- `gap-2` → Gap between items.\n- `py-1.5` → Vertical padding.\n- `text-sm` → Small text size.\n- `font-medium` → Medium font weight.\n- `select-none` → Prevents text selection.\n- `[&>svg:not([class*='size-'])]:size-4` → Default icon size.\n- `[&>kbd]:rounded-[calc(var(--radius)-5px)]` → Rounded keyboard shortcuts.\n- `group-data-[disabled=true]/input-group:opacity-50` → Reduced opacity when disabled.\n\n**InputGroupAddon (alignment variants):**\n- `inline-start`: `order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]` → Left-aligned addon.\n- `inline-end`: `order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]` → Right-aligned addon.\n- `block-start`: `order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5` → Top-aligned addon.\n- `block-end`: `order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5` → Bottom-aligned addon.\n\n**InputGroupButton (base styles):**\n- `text-sm` → Small text size.\n- `shadow-none` → Removes shadow.\n- `flex` → Flexbox layout.\n- `gap-2` → Gap between items.\n- `items-center` → Vertical centering.\n\n**InputGroupButton (size variants):**\n- `xs`: `h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2` → Extra small button.\n- `sm`: `h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5` → Small button.\n- `icon-xs`: `size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0` → Extra small icon button.\n- `icon-sm`: `size-8 p-0 has-[>svg]:p-0` → Small icon button.\n\n**InputGroupText:**\n- `text-muted-foreground` → Muted text color.\n- `flex` → Flexbox layout.\n- `items-center` → Vertical centering.\n- `gap-2` → Gap between items.\n- `text-sm` → Small text size.\n- `[&_svg]:pointer-events-none` → Disables pointer events on icons.\n- `[&_svg:not([class*='size-'])]:size-4` → Default icon size.\n\n**InputGroupInput:**\n- `flex-1` → Takes remaining space.\n- `rounded-none` → Removes border radius.\n- `border-0` → Removes border.\n- `bg-transparent` → Transparent background.\n- `shadow-none` → Removes shadow.\n- `focus-visible:ring-0` → Removes focus ring.\n- `dark:bg-transparent` → Transparent background in dark mode.\n\n**InputGroupTextarea:**\n- `flex-1` → Takes remaining space.\n- `resize-none` → Disables resizing.\n- `rounded-none` → Removes border radius.\n- `border-0` → Removes border.\n- `bg-transparent` → Transparent background.\n- `py-3` → Vertical padding.\n- `shadow-none` → Removes shadow.\n- `focus-visible:ring-0` → Removes focus ring.\n- `dark:bg-transparent` → Transparent background in dark mode.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTextAddon: Story = {
	args: {
		children: (
			<>
				<InputGroupAddon>
					<InputGroupText>https://</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput placeholder="example.com" />
			</>
		),
	},
};

export const WithIconAddon: Story = {
	args: {
		children: (
			<>
				<InputGroupAddon>
					<Search className="size-4" />
				</InputGroupAddon>
				<InputGroupInput placeholder="Search..." />
			</>
		),
	},
};

export const WithButton: Story = {
	args: {
		children: (
			<>
				<InputGroupInput placeholder="Enter email" />
				<InputGroupButton>
					<Mail className="size-4" />
					Subscribe
				</InputGroupButton>
			</>
		),
	},
};

export const WithIconButton: Story = {
	args: {
		children: (
			<>
				<InputGroupInput placeholder="Search..." />
				<InputGroupButton size="icon-xs">
					<Search className="size-4" />
				</InputGroupButton>
			</>
		),
	},
};

export const WithMultipleAddons: Story = {
	args: {
		children: (
			<>
				<InputGroupAddon>
					<User className="size-4" />
				</InputGroupAddon>
				<InputGroupInput placeholder="Username" />
				<InputGroupAddon>
					<InputGroupText>@example.com</InputGroupText>
				</InputGroupAddon>
			</>
		),
	},
};

export const WithTextarea: Story = {
	args: {
		children: (
			<>
				<InputGroupAddon align="block-start">
					<InputGroupText>Message</InputGroupText>
				</InputGroupAddon>
				<InputGroupTextarea placeholder="Enter your message..." />
			</>
		),
	},
};

export const WithBlockEndAddon: Story = {
	args: {
		children: (
			<>
				<InputGroupTextarea placeholder="Enter your message..." />
				<InputGroupAddon align="block-end">
					<InputGroupText>0/280</InputGroupText>
				</InputGroupAddon>
			</>
		),
	},
};

export const WithPasswordField: Story = {
	args: {
		children: (
			<>
				<InputGroupAddon>
					<Lock className="size-4" />
				</InputGroupAddon>
				<InputGroupInput type="password" placeholder="Password" />
				<InputGroupButton size="icon-xs">
					<span className="sr-only">Toggle password visibility</span>
					{/* Eye icon would go here */}
				</InputGroupButton>
			</>
		),
	},
};
