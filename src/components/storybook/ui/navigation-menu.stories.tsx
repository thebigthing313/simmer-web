import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { cn } from '../../../lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '../../ui/navigation-menu';

const meta = {
	title: 'UI/NavigationMenu',
	component: NavigationMenu,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A navigation menu component with dropdown content and smooth animations.\n\n**Theming classes applied:**\n\n**NavigationMenu:**\n- `group/navigation-menu` → Creates a CSS group for styling child elements.\n- `relative` → Establishes positioning context.\n- `flex` → Uses flexbox layout.\n- `max-w-max` → Maximum width based on content.\n- `flex-1` → Takes remaining space.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n\n**NavigationMenuList:**\n- `group` → Creates a CSS group.\n- `flex` → Uses flexbox layout.\n- `flex-1` → Takes remaining space.\n- `list-none` → Removes list styling.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `gap-1` → Gap between items.\n\n**NavigationMenuItem:**\n- `relative` → Establishes positioning context.\n\n**NavigationMenuTrigger:**\n- `group` → Creates a CSS group.\n- `inline-flex` → Uses inline flexbox layout.\n- `h-9` → Sets height to 2.25rem.\n- `w-max` → Maximum width based on content.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `rounded-md` → Medium border radius.\n- `bg-background` → Background color.\n- `px-4` → Horizontal padding.\n- `py-2` → Vertical padding.\n- `text-sm` → Small text size.\n- `font-medium` → Medium font weight.\n- `hover:bg-accent` → Accent background on hover.\n- `hover:text-accent-foreground` → Accent foreground text on hover.\n- `focus:bg-accent` → Accent background on focus.\n- `focus:text-accent-foreground` → Accent foreground text on focus.\n- `disabled:pointer-events-none` → Disables pointer events when disabled.\n- `disabled:opacity-50` → Reduces opacity when disabled.\n- `data-[state=open]:hover:bg-accent` → Accent background on hover when open.\n- `data-[state=open]:text-accent-foreground` → Accent foreground text when open.\n- `data-[state=open]:focus:bg-accent` → Accent background on focus when open.\n- `data-[state=open]:bg-accent/50` → Semi-transparent accent background when open.\n- `focus-visible:ring-ring/50` → Ring color on focus.\n- `outline-none` → Removes outline.\n- `transition-[color,box-shadow]` → Smooth transitions.\n- `focus-visible:ring-[3px]` → Ring width on focus.\n- `focus-visible:outline-1` → Outline on focus.\n\n**NavigationMenuTrigger (ChevronDownIcon):**\n- `relative` → Establishes positioning context.\n- `top-[1px]` → Slight top offset.\n- `ml-1` → Left margin.\n- `size-3` → Size of 0.75rem.\n- `transition` → Smooth transitions.\n- `duration-300` → 300ms transition duration.\n- `group-data-[state=open]:rotate-180` → Rotates when open.\n\n**NavigationMenuContent:**\n- `data-[motion^=from-]:animate-in` → Animates in from motion.\n- `data-[motion^=to-]:animate-out` → Animates out to motion.\n- `data-[motion^=from-]:fade-in` → Fades in from motion.\n- `data-[motion^=to-]:fade-out` → Fades out to motion.\n- `data-[motion=from-end]:slide-in-from-right-52` → Slides in from right.\n- `data-[motion=from-start]:slide-in-from-left-52` → Slides in from left.\n- `data-[motion=to-end]:slide-out-to-right-52` → Slides out to right.\n- `data-[motion=to-start]:slide-out-to-left-52` → Slides out to left.\n- `top-0` → Positioned at top.\n- `left-0` → Positioned at left.\n- `w-full` → Full width.\n- `p-2` → Padding.\n- `pr-2.5` → Right padding.\n- `md:absolute` → Absolute positioning on medium screens.\n- `md:w-auto` → Auto width on medium screens.\n- `group-data-[viewport=false]/navigation-menu:bg-popover` → Popover background when no viewport.\n- `group-data-[viewport=false]/navigation-menu:text-popover-foreground` → Popover foreground when no viewport.\n- `group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in` → Animation when opening without viewport.\n- `group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out` → Animation when closing without viewport.\n- `group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95` → Zoom out when closing without viewport.\n- `group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95` → Zoom in when opening without viewport.\n- `group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0` → Fade in when opening without viewport.\n- `group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0` → Fade out when closing without viewport.\n- `group-data-[viewport=false]/navigation-menu:top-full` → Position below trigger without viewport.\n- `group-data-[viewport=false]/navigation-menu:mt-1.5` → Top margin without viewport.\n- `group-data-[viewport=false]/navigation-menu:overflow-hidden` → Hidden overflow without viewport.\n- `group-data-[viewport=false]/navigation-menu:rounded-md` → Border radius without viewport.\n- `group-data-[viewport=false]/navigation-menu:border` → Border without viewport.\n- `group-data-[viewport=false]/navigation-menu:shadow` → Shadow without viewport.\n- `**:data-[slot=navigation-menu-link]:focus:ring-0` → Removes ring on links.\n- `**:data-[slot=navigation-menu-link]:focus:outline-none` → Removes outline on links.\n\n**NavigationMenuViewport:**\n- `absolute` → Absolute positioning.\n- `top-full` → Positioned below.\n- `left-0` → Positioned at left.\n- `isolate` → Creates stacking context.\n- `z-50` → High z-index.\n- `flex` → Uses flexbox layout.\n- `justify-center` → Centers horizontally.\n- `bg-popover` → Popover background.\n- `text-popover-foreground` → Popover foreground.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:zoom-out-95` → Zooms out when closing.\n- `data-[state=open]:zoom-in-90` → Zooms in when opening.\n- `relative` → Establishes positioning context.\n- `mt-1.5` → Top margin.\n- `h-[var(--radix-navigation-menu-viewport-height)]` → Dynamic height.\n- `w-full` → Full width.\n- `overflow-hidden` → Hides overflow.\n- `rounded-md` → Medium border radius.\n- `border` → Adds border.\n- `shadow` → Adds shadow.\n- `md:w-[var(--radix-navigation-menu-viewport-width)]` → Dynamic width on medium screens.\n\n**NavigationMenuLink:**\n- `data-[active=true]:focus:bg-accent` → Accent background on focus when active.\n- `data-[active=true]:hover:bg-accent` → Accent background on hover when active.\n- `data-[active=true]:bg-accent/50` → Semi-transparent accent background when active.\n- `data-[active=true]:text-accent-foreground` → Accent foreground text when active.\n- `hover:bg-accent` → Accent background on hover.\n- `hover:text-accent-foreground` → Accent foreground text on hover.\n- `focus:bg-accent` → Accent background on focus.\n- `focus:text-accent-foreground` → Accent foreground text on focus.\n- `focus-visible:ring-ring/50` → Ring color on focus.\n- `flex` → Uses flexbox layout.\n- `flex-col` → Vertical layout.\n- `gap-1` → Gap between items.\n- `rounded-sm` → Small border radius.\n- `p-2` → Padding.\n- `text-sm` → Small text size.\n- `transition-all` → Smooth transitions for all properties.\n- `outline-none` → Removes outline.\n- `focus-visible:ring-[3px]` → Ring width on focus.\n- `focus-visible:outline-1` → Outline on focus.\n- `[&_svg:not([class*='text-'])]:text-muted-foreground` → Muted icon color.\n- `[&_svg:not([class*='size-'])]:size-4` → Default icon size.\n\n**NavigationMenuIndicator:**\n- `data-[state=visible]:animate-in` → Animates in when visible.\n- `data-[state=hidden]:animate-out` → Animates out when hidden.\n- `data-[state=hidden]:fade-out` → Fades out when hidden.\n- `data-[state=visible]:fade-in` → Fades in when visible.\n- `top-full` → Positioned below.\n- `z-[1]` → Z-index above content.\n- `flex` → Uses flexbox layout.\n- `h-1.5` → Height of 0.375rem.\n- `items-end` → Aligns items to bottom.\n- `justify-center` → Centers horizontally.\n- `overflow-hidden` → Hides overflow.\n- `bg-border` → Border background color.\n- `relative` → Establishes positioning context.\n- `top-[60%]` → Positioned 60% from top.\n- `h-2` → Height of 0.5rem.\n- `w-2` → Width of 0.5rem.\n- `rotate-45` → Rotated 45 degrees.\n- `rounded-tl-sm` → Top-left border radius.\n- `shadow-md` → Medium shadow.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = 'ListItem';

export const Basic: Story = {
	args: {
		children: (
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<li className="row-span-3">
								<NavigationMenuLink asChild>
									<a
										className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
										href="/"
									>
										<div className="mb-2 mt-4 text-lg font-medium">
											shadcn/ui
										</div>
										<p className="text-sm leading-tight text-muted-foreground">
											Beautifully designed components built with Radix UI and
											Tailwind CSS.
										</p>
									</a>
								</NavigationMenuLink>
							</li>
							<ListItem href="/docs" title="Introduction">
								Re-usable components built using Radix UI and Tailwind CSS.
							</ListItem>
							<ListItem href="/docs/installation" title="Installation">
								How to install dependencies and structure your app.
							</ListItem>
							<ListItem href="/docs/primitives/typography" title="Typography">
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Components</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
							{[
								{
									title: 'Alert Dialog',
									href: '/docs/primitives/alert-dialog',
									description:
										'A modal dialog that interrupts the user with important content and expects a response.',
								},
								{
									title: 'Hover Card',
									href: '/docs/primitives/hover-card',
									description:
										'For sighted users to preview content available behind a link.',
								},
								{
									title: 'Progress',
									href: '/docs/primitives/progress',
									description:
										'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
								},
								{
									title: 'Scroll-area',
									href: '/docs/primitives/scroll-area',
									description: 'Visually or semantically separates content.',
								},
								{
									title: 'Tabs',
									href: '/docs/primitives/tabs',
									description:
										'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
								},
								{
									title: 'Tooltip',
									href: '/docs/primitives/tooltip',
									description:
										'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
								},
							].map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}
								>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<a
							href="/docs"
							className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
						>
							Documentation
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		),
	},
};

export const Simple: Story = {
	args: {
		children: (
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Home</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<div className="row-span-3">
								<div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6">
									<div className="mb-2 mt-4 text-lg font-medium">Welcome</div>
									<p className="text-sm leading-tight text-muted-foreground">
										Your starting point for everything.
									</p>
								</div>
							</div>
							<div className="grid gap-1">
								<h4 className="font-medium leading-none">Quick Links</h4>
								<p className="text-sm text-muted-foreground">
									Navigate to your most visited sections.
								</p>
							</div>
							<div className="grid gap-1">
								<h4 className="font-medium leading-none">Recent</h4>
								<p className="text-sm text-muted-foreground">
									Access your recently viewed content.
								</p>
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Products</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
							<div className="grid gap-1">
								<h4 className="font-medium leading-none">Web Apps</h4>
								<p className="text-sm text-muted-foreground">
									Modern web applications.
								</p>
							</div>
							<div className="grid gap-1">
								<h4 className="font-medium leading-none">Mobile Apps</h4>
								<p className="text-sm text-muted-foreground">
									Native mobile experiences.
								</p>
							</div>
							<div className="grid gap-1">
								<h4 className="font-medium leading-none">APIs</h4>
								<p className="text-sm text-muted-foreground">
									Powerful developer tools.
								</p>
							</div>
							<div className="grid gap-1">
								<h4 className="font-medium leading-none">Integrations</h4>
								<p className="text-sm text-muted-foreground">
									Connect with your favorite tools.
								</p>
							</div>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink asChild>
						<a
							href="/pricing"
							className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
						>
							Pricing
						</a>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		),
	},
};
