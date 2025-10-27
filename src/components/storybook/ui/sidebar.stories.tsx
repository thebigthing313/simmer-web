import type { Meta, StoryObj } from '@storybook/react-vite';
import {
	BarChart3,
	Bell,
	Calendar,
	FileText,
	Home,
	MessageSquare,
	Settings,
	Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
} from '../../ui/sidebar';

const meta: Meta<typeof Sidebar> = {
	title: 'UI/Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
A flexible sidebar component built on top of Radix UI primitives with multiple variants and collapsible options.

## Variants
- **sidebar**: Default sidebar with fixed positioning
- **floating**: Sidebar that floats above content with rounded corners and shadow
- **inset**: Sidebar that creates an inset effect with the main content

## Collapsible Options
- **offcanvas**: Sidebar slides off-screen when collapsed
- **icon**: Sidebar collapses to show only icons
- **none**: Sidebar is always visible and not collapsible

## Side Options
- **left**: Sidebar positioned on the left (default)
- **right**: Sidebar positioned on the right

## CSS Variables
- \`--sidebar-width\`: Width of the expanded sidebar (default: 16rem)
- \`--sidebar-width-icon\`: Width of the collapsed sidebar (default: 3rem)

## Tailwind Classes (SidebarProvider wrapper)
- \`group/sidebar-wrapper\`: Main wrapper group for sidebar state management
- \`has-data-[variant=inset]:bg-sidebar\`: Background color for inset variant
- \`flex\`: Flex display
- \`min-h-svh\`: Minimum height of small viewport height
- \`w-full\`: Full width

## Tailwind Classes (Sidebar component)
- \`bg-sidebar\`: Sidebar background color
- \`text-sidebar-foreground\`: Sidebar foreground text color
- \`flex\`: Flex display
- \`h-full\`: Full height
- \`w-(--sidebar-width)\`: Width using CSS variable for sidebar width
- \`flex-col\`: Flex direction column
- \`group\`: Group class for state management
- \`peer\`: Peer class for sibling interactions
- \`text-sidebar-foreground\`: Sidebar foreground text color
- \`hidden\`: Hidden by default
- \`md:block\`: Block display on medium screens and up
- \`data-state="expanded|collapsed"\`: Data attribute for current state
- \`data-collapsible="offcanvas|icon|none"\`: Data attribute for collapsible type
- \`data-variant="sidebar|floating|inset"\`: Data attribute for variant type
- \`data-side="left|right"\`: Data attribute for side positioning

## Tailwind Classes (SidebarGap)
- \`relative\`: Relative positioning
- \`w-(--sidebar-width)\`: Width using CSS variable for sidebar width
- \`bg-transparent\`: Transparent background
- \`transition-[width]\`: Width transition
- \`duration-200\`: 200ms transition duration
- \`ease-linear\`: Linear easing function
- \`group-data-[collapsible=offcanvas]:w-0\`: Zero width for offcanvas when collapsed
- \`group-data-[side=right]:rotate-180\`: 180 degree rotation for right-side positioning

## Tailwind Classes (SidebarContainer)
- \`fixed\`: Fixed positioning
- \`inset-y-0\`: Full height positioning
- \`z-10\`: Z-index of 10
- \`hidden\`: Hidden by default
- \`h-svh\`: Height of small viewport height
- \`w-(--sidebar-width)\`: Width using CSS variable for sidebar width
- \`transition-[left,right,width]\`: Left, right, and width transitions
- \`duration-200\`: 200ms transition duration
- \`ease-linear\`: Linear easing function
- \`md:flex\`: Flex display on medium screens and up
- \`left-0\`: Left position of 0
- \`group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]\`: Negative left position for offcanvas animation
- \`right-0\`: Right position of 0
- \`group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]\`: Negative right position for offcanvas animation
- \`p-2\`: Padding of 2
- \`group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]\`: Calculated width for icon collapsible state
- \`group-data-[collapsible=icon]:w-(--sidebar-width-icon)\`: Width using CSS variable for icon width
- \`group-data-[side=left]:border-r\`: Right border for left-side sidebar
- \`group-data-[side=right]:border-l\`: Left border for right-side sidebar

## Tailwind Classes (SidebarInner)
- \`bg-sidebar\`: Sidebar background color
- \`group-data-[variant=floating]:border-sidebar-border\`: Border for floating variant
- \`flex\`: Flex display
- \`h-full\`: Full height
- \`w-full\`: Full width
- \`flex-col\`: Flex direction column
- \`group-data-[variant=floating]:rounded-lg\`: Large border radius for floating variant
- \`group-data-[variant=floating]:border\`: Border for floating variant
- \`group-data-[variant=floating]:shadow-sm\`: Small shadow for floating variant
        `,
			},
		},
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<div className="h-screen w-full">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SampleSidebarContent = () => (
	<>
		<SidebarHeader>
			<div className="flex items-center gap-2 px-2 py-1">
				<div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
					<BarChart3 className="size-4" />
				</div>
				<div className="flex flex-col">
					<span className="text-sm font-semibold">Dashboard</span>
					<span className="text-xs text-muted-foreground">v2.1.0</span>
				</div>
			</div>
		</SidebarHeader>

		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>Navigation</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton isActive>
								<Home className="size-4" />
								<span>Home</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Users className="size-4" />
								<span>Team</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Calendar className="size-4" />
								<span>Calendar</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<FileText className="size-4" />
								<span>Documents</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>

			<SidebarSeparator />

			<SidebarGroup>
				<SidebarGroupLabel>Tools</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<BarChart3 className="size-4" />
								<span>Analytics</span>
								<Badge
									variant="secondary"
									className="ml-auto size-5 shrink-0 items-center justify-center rounded px-1 text-xs"
								>
									3
								</Badge>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<MessageSquare className="size-4" />
								<span>Messages</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Settings className="size-4" />
								<span>Settings</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>

		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size="lg">
						<Avatar className="size-8">
							<AvatarImage src="/avatars/01.png" alt="User" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">John Doe</span>
							<span className="truncate text-xs text-muted-foreground">
								john@example.com
							</span>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	</>
);

const MainContent = () => (
	<SidebarInset>
		<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1" />
			<div className="flex items-center gap-2">
				<h1 className="text-lg font-semibold">Dashboard</h1>
			</div>
			<div className="ml-auto flex items-center gap-2">
				<SidebarInput placeholder="Search..." />
				<Button variant="ghost" size="icon">
					<Bell className="size-4" />
				</Button>
			</div>
		</header>
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
			</div>
			<div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
		</div>
	</SidebarInset>
);

export const Default: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar>
				<SampleSidebarContent />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};

export const Floating: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar variant="floating">
				<SampleSidebarContent />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};

export const Inset: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar variant="inset">
				<SampleSidebarContent />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};

export const RightSide: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar side="right">
				<SampleSidebarContent />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};

export const IconCollapsible: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar collapsible="icon">
				<SampleSidebarContent />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};

export const OffcanvasCollapsible: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar collapsible="offcanvas">
				<SampleSidebarContent />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};

export const NoCollapsible: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar collapsible="none">
				<SampleSidebarContent />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};

export const WithRail: Story = {
	render: () => (
		<SidebarProvider>
			<Sidebar>
				<SampleSidebarContent />
				<SidebarRail />
			</Sidebar>
			<MainContent />
		</SidebarProvider>
	),
};
