import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from 'lucide-react';
import { Button } from '../../ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

const meta = {
	title: 'UI/DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A dropdown menu component for contextual actions and navigation.\n\n**Theming classes applied:**\n\n**DropdownMenuContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out to 95% when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in from 95% when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top when positioned below.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right when positioned left.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left when positioned right.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom when positioned above.\n- `z-50` → Sets high z-index.\n- `max-h-(--radix-dropdown-menu-content-available-height)` → Sets max height to available space.\n- `min-w-[8rem]` → Sets minimum width.\n- `origin-(--radix-dropdown-menu-content-transform-origin)` → Sets transform origin.\n- `overflow-x-hidden` → Hides horizontal overflow.\n- `overflow-y-auto` → Enables vertical scrolling.\n- `rounded-md` → Applies medium border radius.\n- `border` → Adds border.\n- `p-1` → Adds padding.\n- `shadow-md` → Applies medium shadow.\n\n**DropdownMenuItem:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `data-[variant=destructive]:text-destructive` → Sets destructive text color.\n- `data-[variant=destructive]:focus:bg-destructive/10` → Sets destructive focus background.\n- `dark:data-[variant=destructive]:focus:bg-destructive/20` → Sets dark mode destructive focus background.\n- `data-[variant=destructive]:focus:text-destructive` → Sets destructive focus text color.\n- `data-[variant=destructive]:*:[svg]:!text-destructive` → Forces destructive color on SVGs.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` → Sets SVG color to muted unless explicitly set.\n- `relative` → Positions relatively.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `px-2` → Adds horizontal padding.\n- `py-1.5` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `data-[inset]:pl-8` → Adds left padding when inset.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**DropdownMenuCheckboxItem:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `relative` → Positions relatively.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `py-1.5` → Adds vertical padding.\n- `pr-2` → Adds right padding.\n- `pl-8` → Adds left padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**DropdownMenuRadioItem:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `relative` → Positions relatively.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `py-1.5` → Adds vertical padding.\n- `pr-2` → Adds right padding.\n- `pl-8` → Adds left padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**DropdownMenuLabel:**\n- `px-2` → Adds horizontal padding.\n- `py-1.5` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `font-medium` → Applies medium font weight.\n- `data-[inset]:pl-8` → Adds left padding when inset.\n\n**DropdownMenuSeparator:**\n- `bg-border` → Sets background color to border theme.\n- `-mx-1` → Adds negative horizontal margins.\n- `my-1` → Adds vertical margins.\n- `h-px` → Sets height to 1px.\n\n**DropdownMenuShortcut:**\n- `text-muted-foreground` → Sets text color to muted.\n- `ml-auto` → Pushes to the right.\n- `text-xs` → Sets extra small text size.\n- `tracking-widest` → Applies widest letter spacing.\n\n**DropdownMenuSubTrigger:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `data-[state=open]:bg-accent` → Sets background when submenu is open.\n- `data-[state=open]:text-accent-foreground` → Sets text color when submenu is open.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` → Sets SVG color to muted unless explicitly set.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `px-2` → Adds horizontal padding.\n- `py-1.5` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[inset]:pl-8` → Adds left padding when inset.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**DropdownMenuSubContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out to 95% when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in from 95% when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top when positioned below.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right when positioned left.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left when positioned right.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom when positioned above.\n- `z-50` → Sets high z-index.\n- `min-w-[8rem]` → Sets minimum width.\n- `origin-(--radix-dropdown-menu-content-transform-origin)` → Sets transform origin.\n- `overflow-hidden` → Hides overflowing content.\n- `rounded-md` → Applies medium border radius.\n- `border` → Adds border.\n- `p-1` → Adds padding.\n- `shadow-lg` → Applies large shadow.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">Open</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Keyboard className="mr-2 h-4 w-4" />
						<span>Keyboard shortcuts</span>
						<DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Users className="mr-2 h-4 w-4" />
						<span>Team</span>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<UserPlus className="mr-2 h-4 w-4" />
							<span>Invite users</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>
								<Mail className="mr-2 h-4 w-4" />
								<span>Email</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<MessageSquare className="mr-2 h-4 w-4" />
								<span>Message</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<PlusCircle className="mr-2 h-4 w-4" />
								<span>More...</span>
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuItem>
						<Plus className="mr-2 h-4 w-4" />
						<span>New Team</span>
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Github className="mr-2 h-4 w-4" />
						<span>GitHub</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LifeBuoy className="mr-2 h-4 w-4" />
						<span>Support</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Cloud className="mr-2 h-4 w-4" />
						<span>API</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive">
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</>
		),
	},
};

export const Checkboxes: Story = {
	args: {
		children: (
			<>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">Open</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Appearance</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked>
						Status Bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Activity Bar</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</>
		),
	},
};

export const RadioGroup: Story = {
	args: {
		children: (
			<>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">Open</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuLabel>Panel Position</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value="bottom">
						<DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</>
		),
	},
};
