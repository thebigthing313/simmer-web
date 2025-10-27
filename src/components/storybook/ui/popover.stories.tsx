/** biome-ignore-all lint/correctness/useUniqueElementIds: <storybook> */
/** biome-ignore-all lint/a11y/noLabelWithoutControl: <storybook> */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
} from '../../ui/popover';

const meta = {
	title: 'UI/Popover',
	component: Popover,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A popover component for displaying floating content relative to a trigger element.\n\n**Theming classes applied:**\n\n**PopoverContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out to 95% when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in from 95% when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top when positioned below.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right when positioned left.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left when positioned right.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom when positioned above.\n- `z-50` → Sets high z-index.\n- `w-72` → Sets width to 18rem.\n- `origin-(--radix-popover-content-transform-origin)` → Sets transform origin.\n- `rounded-md` → Applies medium border radius.\n- `border` → Adds border.\n- `p-4` → Adds padding.\n- `shadow-md` → Applies medium shadow.\n- `outline-hidden` → Hides default outline.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<PopoverTrigger asChild>
					<Button variant="outline">Open popover</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className="grid gap-4">
						<div className="space-y-2">
							<h4 className="font-medium leading-none">Dimensions</h4>
							<p className="text-sm text-muted-foreground">
								Set the dimensions for the layer.
							</p>
						</div>
						<div className="grid gap-2">
							<div className="grid grid-cols-3 items-center gap-4">
								<label htmlFor="width">Width</label>
								<input
									id="width"
									defaultValue="100%"
									className="col-span-2 h-8"
								/>
							</div>
							<div className="grid grid-cols-3 items-center gap-4">
								<label htmlFor="maxWidth">Max. width</label>
								<input
									id="maxWidth"
									defaultValue="300px"
									className="col-span-2 h-8"
								/>
							</div>
							<div className="grid grid-cols-3 items-center gap-4">
								<label htmlFor="height">Height</label>
								<input
									id="height"
									defaultValue="25px"
									className="col-span-2 h-8"
								/>
							</div>
							<div className="grid grid-cols-3 items-center gap-4">
								<label htmlFor="maxHeight">Max. height</label>
								<input
									id="maxHeight"
									defaultValue="none"
									className="col-span-2 h-8"
								/>
							</div>
						</div>
					</div>
				</PopoverContent>
			</>
		),
	},
};

export const WithProfile: Story = {
	args: {
		children: (
			<>
				<PopoverTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 rounded-full p-0">
						<img
							src="https://github.com/shadcn.png"
							alt="Avatar"
							className="h-8 w-8 rounded-full"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="grid gap-4">
						<div className="space-y-2">
							<h4 className="font-medium leading-none">@shadcn</h4>
							<p className="text-sm text-muted-foreground">
								Building the future of UI components.
							</p>
						</div>
						<div className="grid gap-2">
							<div className="grid grid-cols-2 gap-4">
								<Button variant="outline" size="sm">
									<Users className="mr-2 h-4 w-4" />
									Followers
								</Button>
								<Button variant="outline" size="sm">
									<MapPin className="mr-2 h-4 w-4" />
									Location
								</Button>
							</div>
							<Button variant="secondary" size="sm">
								<CalendarDays className="mr-2 h-4 w-4" />
								View Profile
							</Button>
						</div>
					</div>
				</PopoverContent>
			</>
		),
	},
};

export const WithNotification: Story = {
	args: {
		children: (
			<>
				<PopoverTrigger asChild>
					<Button variant="outline" size="icon" className="relative">
						<span className="sr-only">Notifications</span>
						<div className="h-2 w-2 rounded-full bg-red-500 absolute -top-1 -right-1"></div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<div className="grid gap-4">
						<div className="space-y-2">
							<h4 className="font-medium leading-none">Notifications</h4>
							<p className="text-sm text-muted-foreground">
								You have 3 unread notifications.
							</p>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
								<div className="h-2 w-2 rounded-full bg-blue-500"></div>
								<div className="grid gap-1">
									<p className="text-sm font-medium">New message</p>
									<p className="text-xs text-muted-foreground">From John Doe</p>
								</div>
							</div>
							<div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
								<div className="h-2 w-2 rounded-full bg-green-500"></div>
								<div className="grid gap-1">
									<p className="text-sm font-medium">Task completed</p>
									<p className="text-xs text-muted-foreground">
										Project Alpha is done
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
								<div className="h-2 w-2 rounded-full bg-orange-500"></div>
								<div className="grid gap-1">
									<p className="text-sm font-medium">Meeting reminder</p>
									<p className="text-xs text-muted-foreground">
										Starts in 15 minutes
									</p>
								</div>
							</div>
						</div>
					</div>
				</PopoverContent>
			</>
		),
	},
};

export const WithAnchor: Story = {
	args: {
		children: (
			<>
				<div className="grid gap-2">
					<label className="text-sm font-medium">Email</label>
					<PopoverAnchor asChild>
						<input
							type="email"
							placeholder="Enter your email"
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</PopoverAnchor>
				</div>
				<PopoverTrigger asChild>
					<Button variant="outline" size="sm" className="mt-2">
						Validate Email
					</Button>
				</PopoverTrigger>
				<PopoverContent side="top" className="w-80">
					<div className="grid gap-4">
						<div className="space-y-2">
							<h4 className="font-medium leading-none">Email Validation</h4>
							<p className="text-sm text-muted-foreground">
								We'll check if this email address is valid and available.
							</p>
						</div>
						<div className="flex gap-2">
							<Badge variant="secondary">Valid format</Badge>
							<Badge variant="secondary">Available</Badge>
						</div>
					</div>
				</PopoverContent>
			</>
		),
	},
};
