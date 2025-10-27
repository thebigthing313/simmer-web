import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Cloud,
	CreditCard,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
} from 'lucide-react';
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from '../../ui/menubar';

const meta = {
	title: 'UI/Menubar',
	component: Menubar,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A menubar component for desktop applications with various menu item types and submenus.\n\n**Theming classes applied:**\n\n**Menubar:**\n- `bg-background` → Sets background color to background theme.\n- `flex` → Uses flexbox layout.\n- `h-9` → Sets height to 2.25rem.\n- `items-center` → Centers items vertically.\n- `gap-1` → Gap between items.\n- `rounded-md` → Medium border radius.\n- `border` → Adds border.\n- `p-1` → Padding.\n- `shadow-xs` → Applies small shadow.\n\n**MenubarTrigger:**\n- `focus:bg-accent` → Accent background on focus.\n- `focus:text-accent-foreground` → Accent foreground text on focus.\n- `data-[state=open]:bg-accent` → Accent background when open.\n- `data-[state=open]:text-accent-foreground` → Accent foreground text when open.\n- `flex` → Uses flexbox layout.\n- `items-center` → Centers items vertically.\n- `rounded-sm` → Small border radius.\n- `px-2` → Horizontal padding.\n- `py-1` → Vertical padding.\n- `text-sm` → Small text size.\n- `font-medium` → Medium font weight.\n- `outline-hidden` → Hides outline.\n- `select-none` → Prevents text selection.\n\n**MenubarContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:fade-out-0` → Fades out when closing.\n- `data-[state=open]:fade-in-0` → Fades in when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom.\n- `z-50` → High z-index.\n- `min-w-[12rem]` → Minimum width.\n- `origin-(--radix-menubar-content-transform-origin)` → Transform origin.\n- `overflow-hidden` → Hides overflow.\n- `rounded-md` → Medium border radius.\n- `border` → Adds border.\n- `p-1` → Padding.\n- `shadow-md` → Medium shadow.\n\n**MenubarItem:**\n- `focus:bg-accent` → Accent background on focus.\n- `focus:text-accent-foreground` → Accent foreground text on focus.\n- `data-[variant=destructive]:text-destructive` → Destructive text color.\n- `data-[variant=destructive]:focus:bg-destructive/10` → Destructive background on focus.\n- `dark:data-[variant=destructive]:focus:bg-destructive/20` → Dark mode destructive background.\n- `data-[variant=destructive]:focus:text-destructive` → Destructive text on focus.\n- `data-[variant=destructive]:*:[svg]:!text-destructive` → Destructive icon color.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` → Muted icon color.\n- `relative` → Establishes positioning context.\n- `flex` → Uses flexbox layout.\n- `cursor-default` → Default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Gap between items.\n- `rounded-sm` → Small border radius.\n- `px-2` → Horizontal padding.\n- `py-1.5` → Vertical padding.\n- `text-sm` → Small text size.\n- `outline-hidden` → Hides outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `data-[inset]:pl-8` → Left padding when inset.\n- `[&_svg]:pointer-events-none` → Disables pointer events on icons.\n- `[&_svg]:shrink-0` → Prevents icon shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Default icon size.\n\n**MenubarCheckboxItem:**\n- `focus:bg-accent` → Accent background on focus.\n- `focus:text-accent-foreground` → Accent foreground text on focus.\n- `relative` → Establishes positioning context.\n- `flex` → Uses flexbox layout.\n- `cursor-default` → Default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Gap between items.\n- `rounded-xs` → Extra small border radius.\n- `py-1.5` → Vertical padding.\n- `pr-2` → Right padding.\n- `pl-8` → Left padding.\n- `text-sm` → Small text size.\n- `outline-hidden` → Hides outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `[&_svg]:pointer-events-none` → Disables pointer events on icons.\n- `[&_svg]:shrink-0` → Prevents icon shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Default icon size.\n\n**MenubarRadioItem:**\n- `focus:bg-accent` → Accent background on focus.\n- `focus:text-accent-foreground` → Accent foreground text on focus.\n- `relative` → Establishes positioning context.\n- `flex` → Uses flexbox layout.\n- `cursor-default` → Default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Gap between items.\n- `rounded-xs` → Extra small border radius.\n- `py-1.5` → Vertical padding.\n- `pr-2` → Right padding.\n- `pl-8` → Left padding.\n- `text-sm` → Small text size.\n- `outline-hidden` → Hides outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `[&_svg]:pointer-events-none` → Disables pointer events on icons.\n- `[&_svg]:shrink-0` → Prevents icon shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Default icon size.\n\n**MenubarLabel:**\n- `px-2` → Horizontal padding.\n- `py-1.5` → Vertical padding.\n- `text-sm` → Small text size.\n- `font-medium` → Medium font weight.\n- `data-[inset]:pl-8` → Left padding when inset.\n\n**MenubarSeparator:**\n- `bg-border` → Border background color.\n- `-mx-1` → Negative horizontal margins.\n- `my-1` → Vertical margins.\n- `h-px` → Height of 1px.\n\n**MenubarShortcut:**\n- `text-muted-foreground` → Muted text color.\n- `ml-auto` → Auto left margin.\n- `text-xs` → Extra small text size.\n- `tracking-widest` → Wide letter spacing.\n\n**MenubarSubTrigger:**\n- `focus:bg-accent` → Accent background on focus.\n- `focus:text-accent-foreground` → Accent foreground text on focus.\n- `data-[state=open]:bg-accent` → Accent background when open.\n- `data-[state=open]:text-accent-foreground` → Accent foreground text when open.\n- `flex` → Uses flexbox layout.\n- `cursor-default` → Default cursor.\n- `items-center` → Centers items vertically.\n- `rounded-sm` → Small border radius.\n- `px-2` → Horizontal padding.\n- `py-1.5` → Vertical padding.\n- `text-sm` → Small text size.\n- `outline-none` → Removes outline.\n- `select-none` → Prevents text selection.\n- `data-[inset]:pl-8` → Left padding when inset.\n\n**MenubarSubContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out when closing.\n- `data-[state=open]:fade-in-0` → Fades in when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom.\n- `z-50` → High z-index.\n- `min-w-[8rem]` → Minimum width.\n- `origin-(--radix-menubar-content-transform-origin)` → Transform origin.\n- `overflow-hidden` → Hides overflow.\n- `rounded-md` → Medium border radius.\n- `border` → Adds border.\n- `p-1` → Padding.\n- `shadow-lg` → Large shadow.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							New Window <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem disabled>New Incognito Window</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>
							Share <MenubarShortcut>⌘S</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>
							Print <MenubarShortcut>⌘P</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger>Edit</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							Undo <MenubarShortcut>⌘Z</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem>
							Cut <MenubarShortcut>⌘X</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Copy <MenubarShortcut>⌘C</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Paste <MenubarShortcut>⌘V</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</>
		),
	},
};

export const WithIcons: Story = {
	args: {
		children: (
			<>
				<MenubarMenu>
					<MenubarTrigger>
						<User className="mr-2 h-4 w-4" />
						Account
					</MenubarTrigger>
					<MenubarContent>
						<MenubarLabel inset>Account</MenubarLabel>
						<MenubarSeparator />
						<MenubarItem inset>
							<User className="mr-2 h-4 w-4" />
							Profile
						</MenubarItem>
						<MenubarItem inset>
							<CreditCard className="mr-2 h-4 w-4" />
							Billing
						</MenubarItem>
						<MenubarItem inset>
							<Settings className="mr-2 h-4 w-4" />
							Settings
						</MenubarItem>
						<MenubarItem inset>
							<Keyboard className="mr-2 h-4 w-4" />
							Keyboard shortcuts
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem inset>
							<LogOut className="mr-2 h-4 w-4" />
							Log out
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</>
		),
	},
};

export const WithCheckboxes: Story = {
	args: {
		children: (
			<>
				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarCheckboxItem checked>
							Always Show Bookmarks Bar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem>Always Show Full URLs</MenubarCheckboxItem>
						<MenubarSeparator />
						<MenubarItem inset>
							Reload <MenubarShortcut>⌘R</MenubarShortcut>
						</MenubarItem>
						<MenubarItem inset disabled>
							Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</>
		),
	},
};

export const WithRadioGroup: Story = {
	args: {
		children: (
			<>
				<MenubarMenu>
					<MenubarTrigger>Theme</MenubarTrigger>
					<MenubarContent>
						<MenubarRadioGroup value="light">
							<MenubarRadioItem value="light">Light</MenubarRadioItem>
							<MenubarRadioItem value="dark">Dark</MenubarRadioItem>
							<MenubarRadioItem value="system">System</MenubarRadioItem>
						</MenubarRadioGroup>
					</MenubarContent>
				</MenubarMenu>
			</>
		),
	},
};

export const WithSubmenu: Story = {
	args: {
		children: (
			<>
				<MenubarMenu>
					<MenubarTrigger>Help</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							<LifeBuoy className="mr-2 h-4 w-4" />
							Support
						</MenubarItem>
						<MenubarItem>
							<Cloud className="mr-2 h-4 w-4" />
							API
						</MenubarItem>
						<MenubarSeparator />
						<MenubarSub>
							<MenubarSubTrigger>
								<MessageSquare className="mr-2 h-4 w-4" />
								Feedback
							</MenubarSubTrigger>
							<MenubarSubContent>
								<MenubarItem>
									<Mail className="mr-2 h-4 w-4" />
									Email
								</MenubarItem>
								<MenubarItem>
									<MessageSquare className="mr-2 h-4 w-4" />
									Message
								</MenubarItem>
							</MenubarSubContent>
						</MenubarSub>
					</MenubarContent>
				</MenubarMenu>
			</>
		),
	},
};

export const DestructiveItems: Story = {
	args: {
		children: (
			<>
				<MenubarMenu>
					<MenubarTrigger>Actions</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							<Plus className="mr-2 h-4 w-4" />
							New Project
						</MenubarItem>
						<MenubarItem>
							<PlusCircle className="mr-2 h-4 w-4" />
							New Team
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem variant="destructive">
							<LogOut className="mr-2 h-4 w-4" />
							Delete Project
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</>
		),
	},
};
