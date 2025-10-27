import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from 'lucide-react';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '../../ui/command';

const meta = {
	title: 'UI/Command',
	component: Command,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A command palette component for search and selection interfaces.\n\n**Theming classes applied:**\n\n**Command (root):**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `flex` → Displays as flex container.\n- `h-full` → Takes full height of parent.\n- `w-full` → Takes full width of parent.\n- `flex-col` → Arranges children vertically.\n- `overflow-hidden` → Hides overflowing content.\n- `rounded-md` → Applies medium border radius.\n\n**CommandDialog (Command inside dialog):**\n- `[&_[cmdk-group-heading]]:text-muted-foreground` → Sets group heading text to muted color.\n- `**:data-[slot=command-input-wrapper]:h-12` → Sets input wrapper height to 3rem.\n- `[&_[cmdk-group-heading]]:px-2` → Adds horizontal padding to group headings.\n- `[&_[cmdk-group-heading]]:font-medium` → Applies medium font weight to group headings.\n- `[&_[cmdk-group]]:px-2` → Adds horizontal padding to groups.\n- `[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0` → Removes top padding from groups following non-hidden groups.\n- `[&_[cmdk-input-wrapper]_svg]:h-5` → Sets height of SVG icons in input wrapper to 1.25rem.\n- `[&_[cmdk-input-wrapper]_svg]:w-5` → Sets width of SVG icons in input wrapper to 1.25rem.\n- `[&_[cmdk-input]]:h-12` → Sets input height to 3rem.\n- `[&_[cmdk-item]]:px-2` → Adds horizontal padding to items.\n- `[&_[cmdk-item]]:py-3` → Adds vertical padding to items.\n- `[&_[cmdk-item]_svg]:h-5` → Sets height of SVG icons in items to 1.25rem.\n- `[&_[cmdk-item]_svg]:w-5` → Sets width of SVG icons in items to 1.25rem.\n\n**CommandInput wrapper:**\n- `flex` → Displays as flex container.\n- `h-9` → Sets height to 2.25rem.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `border-b` → Adds bottom border.\n- `px-3` → Adds horizontal padding.\n\n**CommandInput:**\n- `placeholder:text-muted-foreground` → Sets placeholder text to muted color.\n- `flex` → Displays as flex container.\n- `h-10` → Sets height to 2.5rem.\n- `w-full` → Takes full width.\n- `rounded-md` → Applies medium border radius.\n- `bg-transparent` → Sets transparent background.\n- `py-3` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `disabled:cursor-not-allowed` → Changes cursor when disabled.\n- `disabled:opacity-50` → Reduces opacity when disabled.\n\n**CommandList:**\n- `max-h-[300px]` → Sets maximum height to 300px.\n- `scroll-py-1` → Adds scroll padding.\n- `overflow-x-hidden` → Hides horizontal overflow.\n- `overflow-y-auto` → Enables vertical scrolling.\n\n**CommandEmpty:**\n- `py-6` → Adds vertical padding.\n- `text-center` → Centers text.\n- `text-sm` → Sets small text size.\n\n**CommandGroup:**\n- `text-foreground` → Sets text color to foreground theme.\n- `[&_[cmdk-group-heading]]:text-muted-foreground` → Sets group heading text to muted color.\n- `overflow-hidden` → Hides overflowing content.\n- `p-1` → Adds padding.\n- `[&_[cmdk-group-heading]]:px-2` → Adds horizontal padding to group headings.\n- `[&_[cmdk-group-heading]]:py-1.5` → Adds vertical padding to group headings.\n- `[&_[cmdk-group-heading]]:text-xs` → Sets group heading text size to extra small.\n- `[&_[cmdk-group-heading]]:font-medium` → Applies medium font weight to group headings.\n\n**CommandSeparator:**\n- `bg-border` → Sets background color to border theme.\n- `-mx-1` → Adds negative horizontal margins.\n- `h-px` → Sets height to 1px.\n\n**CommandItem:**\n- `data-[selected=true]:bg-accent` → Sets background when selected.\n- `data-[selected=true]:text-accent-foreground` → Sets text color when selected.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` → Sets SVG color to muted unless explicitly set.\n- `relative` → Positions relatively.\n- `flex` → Displays as flex container.\n- `cursor-default` → Sets default cursor.\n- `items-center` → Centers items vertically.\n- `gap-2` → Adds gap between flex children.\n- `rounded-sm` → Applies small border radius.\n- `px-2` → Adds horizontal padding.\n- `py-1.5` → Adds vertical padding.\n- `text-sm` → Sets small text size.\n- `outline-hidden` → Hides default outline.\n- `select-none` → Prevents text selection.\n- `data-[disabled=true]:pointer-events-none` → Disables pointer events when disabled.\n- `data-[disabled=true]:opacity-50` → Reduces opacity when disabled.\n- `[&_svg]:pointer-events-none` → Disables pointer events on SVGs.\n- `[&_svg]:shrink-0` → Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` → Sets default SVG size unless explicitly set.\n\n**CommandShortcut:**\n- `text-muted-foreground` → Sets text color to muted.\n- `ml-auto` → Pushes to the right.\n- `text-xs` → Sets extra small text size.\n- `tracking-widest` → Applies widest letter spacing.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<Calendar className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<Smile className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<Calculator className="mr-2 h-4 w-4" />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</>
		),
		className: 'w-[400px]',
	},
};

export const WithGroups: Story = {
	args: {
		children: (
			<>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<Calendar className="mr-2 h-4 w-4" />
							<span>Calendar</span>
							<CommandShortcut>⌘C</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Smile className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
							<CommandShortcut>⌘E</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Calculator className="mr-2 h-4 w-4" />
							<span>Calculator</span>
							<CommandShortcut>⌘L</CommandShortcut>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</>
		),
		className: 'w-[400px]',
	},
};

export const Empty: Story = {
	args: {
		children: (
			<>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
				</CommandList>
			</>
		),
		className: 'w-[400px]',
	},
};

export const Dialog: Story = {
	args: {
		children: (
			<CommandDialog>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<Calendar className="mr-2 h-4 w-4" />
							<span>Calendar</span>
							<CommandShortcut>⌘C</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Smile className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
							<CommandShortcut>⌘E</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Calculator className="mr-2 h-4 w-4" />
							<span>Calculator</span>
							<CommandShortcut>⌘L</CommandShortcut>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard className="mr-2 h-4 w-4" />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		),
	},
};
