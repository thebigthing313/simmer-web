import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Calendar, Mail, Settings, User } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../../ui/sheet';
import { Textarea } from '../../ui/textarea';

const meta = {
	title: 'UI/Sheet',
	component: Sheet,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A sheet component for displaying content in a slide-out panel.\n\n**Theming classes applied:**\n\n**SheetOverlay:**\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `fixed` → Fixed positioning.\n- `inset-0` → Full viewport coverage.\n- `z-50` → High z-index.\n- `bg-black/50` → Semi-transparent black background.\n\n**SheetContent (base styles):**\n- `bg-background` → Sets background color to background theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `fixed` → Fixed positioning.\n- `z-50` → High z-index.\n- `flex` → Uses flexbox layout.\n- `flex-col` → Vertical layout.\n- `gap-4` → Gap between items.\n- `shadow-lg` → Large shadow.\n- `transition` → Smooth transitions.\n- `ease-in-out` → Ease-in-out timing function.\n- `data-[state=closed]:duration-300` → 300ms close duration.\n- `data-[state=open]:duration-500` → 500ms open duration.\n\n**SheetContent (right side):**\n- `data-[state=closed]:slide-out-to-right` → Slides out to right when closing.\n- `data-[state=open]:slide-in-from-right` → Slides in from right when opening.\n- `inset-y-0` → Full height.\n- `right-0` → Positioned at right edge.\n- `h-full` → Full height.\n- `w-3/4` → 75% width.\n- `border-l` → Left border.\n- `sm:max-w-sm` → Max width on small screens and up.\n\n**SheetContent (left side):**\n- `data-[state=closed]:slide-out-to-left` → Slides out to left when closing.\n- `data-[state=open]:slide-in-from-left` → Slides in from left when opening.\n- `inset-y-0` → Full height.\n- `left-0` → Positioned at left edge.\n- `h-full` → Full height.\n- `w-3/4` → 75% width.\n- `border-r` → Right border.\n- `sm:max-w-sm` → Max width on small screens and up.\n\n**SheetContent (top side):**\n- `data-[state=closed]:slide-out-to-top` → Slides out to top when closing.\n- `data-[state=open]:slide-in-from-top` → Slides in from top when opening.\n- `inset-x-0` → Full width.\n- `top-0` → Positioned at top edge.\n- `h-auto` → Auto height.\n- `border-b` → Bottom border.\n\n**SheetContent (bottom side):**\n- `data-[state=closed]:slide-out-to-bottom` → Slides out to bottom when closing.\n- `data-[state=open]:slide-in-from-bottom` → Slides in from bottom when opening.\n- `inset-x-0` → Full width.\n- `bottom-0` → Positioned at bottom edge.\n- `h-auto` → Auto height.\n- `border-t` → Top border.\n\n**SheetClose (close button):**\n- `ring-offset-background` → Ring offset color.\n- `focus:ring-ring` → Ring color on focus.\n- `data-[state=open]:bg-secondary` → Secondary background when open.\n- `absolute` → Absolute positioning.\n- `top-4` → Top offset.\n- `right-4` → Right offset.\n- `rounded-xs` → Extra small border radius.\n- `opacity-70` → 70% opacity.\n- `transition-opacity` → Smooth opacity transitions.\n- `hover:opacity-100` → Full opacity on hover.\n- `focus:ring-2` → Ring width on focus.\n- `focus:ring-offset-2` → Ring offset width on focus.\n- `focus:outline-hidden` → Hides outline on focus.\n- `disabled:pointer-events-none` → Disables pointer events when disabled.\n\n**SheetHeader:**\n- `flex` → Uses flexbox layout.\n- `flex-col` → Vertical layout.\n- `gap-1.5` → Gap between items.\n- `p-4` → Padding.\n\n**SheetFooter:**\n- `mt-auto` → Auto top margin.\n- `flex` → Uses flexbox layout.\n- `flex-col` → Vertical layout.\n- `gap-2` → Gap between items.\n- `p-4` → Padding.\n\n**SheetTitle:**\n- `text-foreground` → Foreground text color.\n- `font-semibold` → Semibold font weight.\n\n**SheetDescription:**\n- `text-muted-foreground` → Muted foreground text color.\n- `text-sm` → Small text size.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
	args: {
		children: (
			<>
				<SheetTrigger asChild>
					<Button variant="outline">Open Sheet</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when you're done.
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Name
							</Label>
							<Input id="name" value="Pedro Duarte" className="col-span-3" />
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="username" className="text-right">
								Username
							</Label>
							<Input id="username" value="@peduarte" className="col-span-3" />
						</div>
					</div>
					<SheetFooter>
						<SheetClose asChild>
							<Button type="submit">Save changes</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</>
		),
	},
};

export const Left: Story = {
	args: {
		children: (
			<>
				<SheetTrigger asChild>
					<Button variant="outline">Open Left Sheet</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Navigation</SheetTitle>
						<SheetDescription>
							Access different sections of the application.
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<Button variant="ghost" className="justify-start">
							<User className="mr-2 h-4 w-4" />
							Profile
						</Button>
						<Button variant="ghost" className="justify-start">
							<Settings className="mr-2 h-4 w-4" />
							Settings
						</Button>
						<Button variant="ghost" className="justify-start">
							<Bell className="mr-2 h-4 w-4" />
							Notifications
						</Button>
						<Button variant="ghost" className="justify-start">
							<Mail className="mr-2 h-4 w-4" />
							Messages
						</Button>
					</div>
				</SheetContent>
			</>
		),
	},
};

export const Top: Story = {
	args: {
		children: (
			<>
				<SheetTrigger asChild>
					<Button variant="outline">Open Top Sheet</Button>
				</SheetTrigger>
				<SheetContent side="top">
					<SheetHeader>
						<SheetTitle>Confirm Action</SheetTitle>
						<SheetDescription>
							This action cannot be undone. Are you sure you want to continue?
						</SheetDescription>
					</SheetHeader>
					<div className="flex justify-end gap-2 pt-4">
						<SheetClose asChild>
							<Button variant="outline">Cancel</Button>
						</SheetClose>
						<Button variant="destructive">Delete</Button>
					</div>
				</SheetContent>
			</>
		),
	},
};

export const Bottom: Story = {
	args: {
		children: (
			<>
				<SheetTrigger asChild>
					<Button variant="outline">Open Bottom Sheet</Button>
				</SheetTrigger>
				<SheetContent side="bottom">
					<SheetHeader>
						<SheetTitle>Share Document</SheetTitle>
						<SheetDescription>
							Choose how you'd like to share this document.
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-2 gap-4">
							<Button variant="outline" className="h-20 flex-col gap-2">
								<Mail className="h-6 w-6" />
								<span>Email</span>
							</Button>
							<Button variant="outline" className="h-20 flex-col gap-2">
								<Calendar className="h-6 w-6" />
								<span>Calendar</span>
							</Button>
						</div>
					</div>
				</SheetContent>
			</>
		),
	},
};

export const WithForm: Story = {
	args: {
		children: (
			<>
				<SheetTrigger asChild>
					<Button variant="outline">Create Project</Button>
				</SheetTrigger>
				<SheetContent className="sm:max-w-[425px]">
					<SheetHeader>
						<SheetTitle>Create New Project</SheetTitle>
						<SheetDescription>
							Add a new project to your workspace. Fill in the details below.
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="project-name" className="text-right">
								Name
							</Label>
							<Input
								id="project-name"
								placeholder="My Project"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Textarea
								id="description"
								placeholder="Project description..."
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="priority" className="text-right">
								Priority
							</Label>
							<div className="col-span-3 flex gap-2">
								<Badge variant="secondary">Low</Badge>
								<Badge variant="default">Medium</Badge>
								<Badge variant="secondary">High</Badge>
							</div>
						</div>
					</div>
					<SheetFooter>
						<SheetClose asChild>
							<Button variant="outline">Cancel</Button>
						</SheetClose>
						<Button type="submit">Create Project</Button>
					</SheetFooter>
				</SheetContent>
			</>
		),
	},
};
