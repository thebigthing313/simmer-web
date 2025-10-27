/** biome-ignore-all lint/correctness/useUniqueElementIds: <storybook> */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../../ui/drawer';

const meta = {
	title: 'UI/Drawer',
	component: Drawer,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A drawer component for slide-out panels and mobile navigation.\n\n**Theming classes applied:**\n\n**DrawerOverlay:**\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `fixed` → Positions fixed to viewport.\n- `inset-0` → Covers entire viewport.\n- `z-50` → Sets high z-index.\n- `bg-black/50` → Sets semi-transparent black background.\n\n**DrawerContent:**\n- `group/drawer-content` → Creates a CSS group for styling child elements.\n- `bg-background` → Sets background color to theme background.\n- `fixed` → Positions fixed to viewport.\n- `z-50` → Sets high z-index.\n- `flex` → Displays as flex container.\n- `h-auto` → Allows height to adjust to content.\n- `flex-col` → Arranges children vertically.\n- `data-[vaul-drawer-direction=top]:inset-x-0` → Full width when positioned at top.\n- `data-[vaul-drawer-direction=top]:top-0` → Positions at top edge.\n- `data-[vaul-drawer-direction=top]:mb-24` → Adds bottom margin.\n- `data-[vaul-drawer-direction=top]:max-h-[80vh]` → Limits height to 80% of viewport.\n- `data-[vaul-drawer-direction=top]:rounded-b-lg` → Rounds bottom corners.\n- `data-[vaul-drawer-direction=top]:border-b` → Adds bottom border.\n- `data-[vaul-drawer-direction=bottom]:inset-x-0` → Full width when positioned at bottom.\n- `data-[vaul-drawer-direction=bottom]:bottom-0` → Positions at bottom edge.\n- `data-[vaul-drawer-direction=bottom]:mt-24` → Adds top margin.\n- `data-[vaul-drawer-direction=bottom]:max-h-[80vh]` → Limits height to 80% of viewport.\n- `data-[vaul-drawer-direction=bottom]:rounded-t-lg` → Rounds top corners.\n- `data-[vaul-drawer-direction=bottom]:border-t` → Adds top border.\n- `data-[vaul-drawer-direction=right]:inset-y-0` → Full height when positioned at right.\n- `data-[vaul-drawer-direction=right]:right-0` → Positions at right edge.\n- `data-[vaul-drawer-direction=right]:w-3/4` → Sets width to 75%.\n- `data-[vaul-drawer-direction=right]:border-l` → Adds left border.\n- `data-[vaul-drawer-direction=right]:sm:max-w-sm` → Limits max width on small screens.\n- `data-[vaul-drawer-direction=left]:inset-y-0` → Full height when positioned at left.\n- `data-[vaul-drawer-direction=left]:left-0` → Positions at left edge.\n- `data-[vaul-drawer-direction=left]:w-3/4` → Sets width to 75%.\n- `data-[vaul-drawer-direction=left]:border-r` → Adds right border.\n- `data-[vaul-drawer-direction=left]:sm:max-w-sm` → Limits max width on small screens.\n\n**Drawer handle (div):**\n- `bg-muted` → Sets background color to muted theme.\n- `mx-auto` → Centers horizontally.\n- `mt-4` → Adds top margin.\n- `hidden` → Hides by default.\n- `h-2` → Sets height to 0.5rem.\n- `w-[100px]` → Sets width to 100px.\n- `shrink-0` → Prevents shrinking.\n- `rounded-full` → Applies full border radius.\n- `group-data-[vaul-drawer-direction=bottom]/drawer-content:block` → Shows only for bottom drawers.\n\n**DrawerHeader:**\n- `flex` → Displays as flex container.\n- `flex-col` → Arranges children vertically.\n- `gap-0.5` → Adds small gap between children.\n- `p-4` → Adds padding.\n- `group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center` → Centers text for bottom drawers.\n- `group-data-[vaul-drawer-direction=top]/drawer-content:text-center` → Centers text for top drawers.\n- `md:gap-1.5` → Increases gap on medium screens.\n- `md:text-left` → Left-aligns text on medium screens.\n\n**DrawerFooter:**\n- `mt-auto` → Pushes footer to bottom.\n- `flex` → Displays as flex container.\n- `flex-col` → Arranges children vertically.\n- `gap-2` → Adds gap between children.\n- `p-4` → Adds padding.\n\n**DrawerTitle:**\n- `text-foreground` → Sets text color to foreground theme.\n- `font-semibold` → Applies semibold font weight.\n\n**DrawerDescription:**\n- `text-muted-foreground` → Sets text color to muted foreground.\n- `text-sm` → Sets small text size.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bottom: Story = {
	args: {
		children: (
			<>
				<DrawerTrigger asChild>
					<Button variant="outline">Open Drawer</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Are you absolutely sure?</DrawerTitle>
						<DrawerDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</>
		),
	},
};

export const Right: Story = {
	args: {
		direction: 'right',
		children: (
			<>
				<DrawerTrigger asChild>
					<Button variant="outline">Open Drawer</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Edit profile</DrawerTitle>
						<DrawerDescription>
							Make changes to your profile here. Click save when you're done.
						</DrawerDescription>
					</DrawerHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="drawer-right-name" className="text-right">
								Name
							</label>
							<input
								id="drawer-right-name"
								defaultValue="Pedro Duarte"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<label htmlFor="drawer-right-username" className="text-right">
								Username
							</label>
							<input
								id="drawer-right-username"
								defaultValue="@peduarte"
								className="col-span-3"
							/>
						</div>
					</div>
					<DrawerFooter>
						<Button type="submit">Save changes</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</>
		),
	},
};

export const Left: Story = {
	args: {
		direction: 'left',
		children: (
			<>
				<DrawerTrigger asChild>
					<Button variant="outline">Open Drawer</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Navigation</DrawerTitle>
						<DrawerDescription>Choose a page to navigate to.</DrawerDescription>
					</DrawerHeader>
					<div className="grid gap-2 py-4">
						<Button variant="ghost" className="justify-start">
							Home
						</Button>
						<Button variant="ghost" className="justify-start">
							About
						</Button>
						<Button variant="ghost" className="justify-start">
							Contact
						</Button>
						<Button variant="ghost" className="justify-start">
							Settings
						</Button>
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</>
		),
	},
};

export const Top: Story = {
	args: {
		direction: 'top',
		children: (
			<>
				<DrawerTrigger asChild>
					<Button variant="outline">Open Drawer</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Notifications</DrawerTitle>
						<DrawerDescription>You have 3 unread messages.</DrawerDescription>
					</DrawerHeader>
					<div className="grid gap-2 py-4">
						<div className="rounded-md border p-3">
							<p className="text-sm">New message from John</p>
							<p className="text-xs text-muted-foreground">2 minutes ago</p>
						</div>
						<div className="rounded-md border p-3">
							<p className="text-sm">Meeting reminder</p>
							<p className="text-xs text-muted-foreground">1 hour ago</p>
						</div>
						<div className="rounded-md border p-3">
							<p className="text-sm">System update available</p>
							<p className="text-xs text-muted-foreground">3 hours ago</p>
						</div>
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</>
		),
	},
};
