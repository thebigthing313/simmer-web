import type { Meta, StoryObj } from '@storybook/react-vite';
import { CreditCard, LogOut, Plus, Settings, User } from 'lucide-react';
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '../../ui/context-menu';

const meta = {
	title: 'UI/ContextMenu',
	component: ContextMenu,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A context menu component for right-click menus and dropdowns.\n\n**Theming classes applied:**\n\n**ContextMenuSubTrigger:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `data-[state=open]:bg-accent` → Sets background when submenu is open.\n- `data-[state=open]:text-accent-foreground` → Sets text color when submenu is open.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` → Sets SVG color to muted unless explicitly set.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `rounded-sm` → Applies small border radius.\n- `px-2` → Adds horizontal padding.\n- `py-1.5` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[inset]:pl-8` → Adds left padding when inset.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**ContextMenuSubContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out to 95% when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in from 95% when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top when positioned below.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right when positioned left.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left when positioned right.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom when positioned above.\n- `z-50` → Sets high z-index.\n- `min-w-[8rem]` → Sets minimum width.\n- `origin-(--radix-context-menu-content-transform-origin)` → Sets transform origin.\n- `overflow-hidden` → Hides overflowing content.\n- `rounded-md` → Applies medium border radius.\n- `border` → Adds border.\n- `p-1` → Adds padding.\n- `shadow-lg` → Applies large shadow.\n\n**ContextMenuContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out to 95% when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in from 95% when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top when positioned below.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right when positioned left.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left when positioned right.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom when positioned above.\n- `z-50` → Sets high z-index.\n- `max-h-(--radix-context-menu-content-available-height)` → Sets max height to available space.\n- `min-w-[8rem]` → Sets minimum width.\n- `origin-(--radix-context-menu-content-transform-origin)` → Sets transform origin.\n- `overflow-x-hidden` → Hides horizontal overflow.\n- `overflow-y-auto` → Enables vertical scrolling.\n- `rounded-md` → Applies medium border radius.\n- `border` → Adds border.\n- `p-1` → Adds padding.\n- `shadow-md` → Applies medium shadow.\n\n**ContextMenuItem:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `data-[variant=destructive]:text-destructive` → Sets destructive text color.\n- `data-[variant=destructive]:focus:bg-destructive/10` → Sets destructive focus background.\n- `dark:data-[variant=destructive]:focus:bg-destructive/20` → Sets dark mode destructive focus background.\n- `data-[variant=destructive]:focus:text-destructive` → Sets destructive focus text color.\n- `data-[variant=destructive]:*:[svg]:!text-destructive` → Forces destructive color on SVGs.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` → Sets SVG color to muted unless explicitly set.\n- `relative` → Positions relatively.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `px-2` → Adds horizontal padding.\n- `py-1.5` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `data-[inset]:pl-8` → Adds left padding when inset.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**ContextMenuCheckboxItem:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `relative` → Positions relatively.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `py-1.5` → Adds vertical padding.\n- `pr-2` → Adds right padding.\n- `pl-8` → Adds left padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**ContextMenuRadioItem:**\n- `focus:bg-accent` → Sets background color on focus.\n- `focus:text-accent-foreground` → Sets text color on focus.\n- `relative` → Positions relatively.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `py-1.5` → Adds vertical padding.\n- `pr-2` → Adds right padding.\n- `pl-8` → Adds left padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled]:opacity-50` → Reduces opacity when disabled.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**ContextMenuLabel:**\n- `text-foreground` → Sets text color to foreground theme.\n- `px-2` → Adds horizontal padding.\n- `py-1.5` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `font-medium` → Applies medium font weight.\n- `data-[inset]:pl-8` → Adds left padding when inset.\n\n**ContextMenuSeparator:**\n- `bg-border` → Sets background color to border theme.\n- `-mx-1` → Adds negative horizontal margins.\n- `my-1` → Adds vertical margins.\n- `h-px` → Sets height to 1px.\n\n**ContextMenuShortcut:**\n- `text-muted-foreground` → Sets text color to muted.\n- `ml-auto` → Pushes to the right.\n- `text-xs` → Sets extra small text size.\n- `tracking-widest` → Applies widest letter spacing.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
					Right click here
				</ContextMenuTrigger>
				<ContextMenuContent className="w-64">
					<ContextMenuItem inset>
						Back
						<ContextMenuShortcut>⌘[</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem inset disabled>
						Forward
						<ContextMenuShortcut>⌘]</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem inset>
						Reload
						<ContextMenuShortcut>⌘R</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuSub>
						<ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
						<ContextMenuSubContent className="w-48">
							<ContextMenuItem>
								Save Page As...
								<ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
							</ContextMenuItem>
							<ContextMenuItem>Create Shortcut...</ContextMenuItem>
							<ContextMenuItem>Name Window...</ContextMenuItem>
							<ContextMenuSeparator />
							<ContextMenuItem>Developer Tools</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuSeparator />
					<ContextMenuItem inset>
						<Plus className="mr-2 h-4 w-4" />
						New Tab
						<ContextMenuShortcut>⌘T</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem inset>
						New Window
						<ContextMenuShortcut>⌘N</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem inset disabled>
						New Private Window
						<ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuContent>
			</>
		),
	},
};

export const WithCheckboxes: Story = {
	args: {
		children: (
			<>
				<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
					Right click here
				</ContextMenuTrigger>
				<ContextMenuContent className="w-64">
					<ContextMenuLabel inset>People</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuCheckboxItem checked>
						Pedro Duarte
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem>Colm Tuite</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem>Pedro Duarte</ContextMenuCheckboxItem>
				</ContextMenuContent>
			</>
		),
	},
};

export const WithRadioGroup: Story = {
	args: {
		children: (
			<>
				<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
					Right click here
				</ContextMenuTrigger>
				<ContextMenuContent className="w-64">
					<ContextMenuLabel inset>Panel Position</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuRadioGroup value="bottom">
						<ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
						<ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
						<ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuContent>
			</>
		),
	},
};

export const WithDestructive: Story = {
	args: {
		children: (
			<>
				<ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
					Right click here
				</ContextMenuTrigger>
				<ContextMenuContent className="w-64">
					<ContextMenuLabel inset>Actions</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuItem>
						<User className="mr-2 h-4 w-4" />
						Profile
						<ContextMenuShortcut>⇧⌘P</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						<CreditCard className="mr-2 h-4 w-4" />
						Billing
						<ContextMenuShortcut>⌘B</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						Settings
						<ContextMenuShortcut>⌘S</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem variant="destructive">
						<LogOut className="mr-2 h-4 w-4" />
						Log out
						<ContextMenuShortcut>⇧⌘Q</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuContent>
			</>
		),
	},
};
