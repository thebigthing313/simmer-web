import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '../../ui/hover-card';

const meta = {
	title: 'UI/HoverCard',
	component: HoverCard,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A hover card component for displaying additional information on hover.\n\n**Theming classes applied:**\n\n**HoverCardContent:**\n- `bg-popover` → Sets background color to popover theme.\n- `text-popover-foreground` → Sets text color to popover foreground theme.\n- `data-[state=open]:animate-in` → Animates in when opening.\n- `data-[state=closed]:animate-out` → Animates out when closing.\n- `data-[state=closed]:fade-out-0` → Fades out completely when closing.\n- `data-[state=open]:fade-in-0` → Fades in from transparent when opening.\n- `data-[state=closed]:zoom-out-95` → Zooms out to 95% when closing.\n- `data-[state=open]:zoom-in-95` → Zooms in from 95% when opening.\n- `data-[side=bottom]:slide-in-from-top-2` → Slides in from top when positioned below.\n- `data-[side=left]:slide-in-from-right-2` → Slides in from right when positioned left.\n- `data-[side=right]:slide-in-from-left-2` → Slides in from left when positioned right.\n- `data-[side=top]:slide-in-from-bottom-2` → Slides in from bottom when positioned above.\n- `z-50` → Sets high z-index.\n- `w-64` → Sets width to 16rem.\n- `origin-(--radix-hover-card-content-transform-origin)` → Sets transform origin.\n- `rounded-md` → Applies medium border radius.\n- `border` → Adds border.\n- `p-4` → Adds padding.\n- `shadow-md` → Applies medium shadow.\n- `outline-hidden` → Hides default outline.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<>
				<HoverCardTrigger asChild>
					<Button variant="link">@nextjs</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-80">
					<div className="flex justify-between space-x-4">
						<Avatar>
							<AvatarImage src="https://github.com/vercel.png" />
							<AvatarFallback>VC</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<h4 className="text-sm font-semibold">@nextjs</h4>
							<p className="text-sm">
								The React Framework – created and maintained by @vercel.
							</p>
							<div className="flex items-center pt-2">
								<span className="text-xs text-muted-foreground">
									Joined December 2021
								</span>
							</div>
						</div>
					</div>
				</HoverCardContent>
			</>
		),
	},
};

export const WithList: Story = {
	args: {
		children: (
			<>
				<HoverCardTrigger asChild>
					<Button variant="link">@johndoe</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-80">
					<div className="space-y-2">
						<div className="flex items-center space-x-4">
							<Avatar>
								<AvatarImage src="https://github.com/johndoe.png" />
								<AvatarFallback>JD</AvatarFallback>
							</Avatar>
							<div>
								<h4 className="text-sm font-semibold">@johndoe</h4>
								<p className="text-sm text-muted-foreground">
									Software Engineer
								</p>
							</div>
						</div>
						<div className="space-y-1">
							<p className="text-sm">
								Passionate about building great user experiences and writing
								clean code.
							</p>
							<div className="flex items-center space-x-4 text-sm text-muted-foreground">
								<span>📍 San Francisco</span>
								<span>👥 1.2k followers</span>
							</div>
						</div>
					</div>
				</HoverCardContent>
			</>
		),
	},
};
