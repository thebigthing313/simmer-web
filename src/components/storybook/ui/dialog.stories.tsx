/** biome-ignore-all lint/a11y/noLabelWithoutControl: <sample storybook> */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../ui/dialog';

const meta = {
	title: 'UI/Dialog',
	component: Dialog,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					"A modal dialog component for displaying content in an overlay.\n\n**Theming classes applied:**\n\n**DialogOverlay:**\n- `data-[state=open]:animate-in` -> Animates in when opening.\n- `data-[state=closed]:animate-out` -> Animates out when closing.\n- `data-[state=closed]:fade-out-0` -> Fades out to 0 opacity when closing.\n- `data-[state=open]:fade-in-0` -> Fades in from 0 opacity when opening.\n- `fixed` -> Fixed positioning.\n- `inset-0` -> Inset 0.\n- `z-50` -> Z-index 50.\n- `bg-black/50` -> Black background with 50% opacity.\n\n**DialogContent:**\n- `bg-background` -> Background color.\n- `data-[state=open]:animate-in` -> Animates in when opening.\n- `data-[state=closed]:animate-out` -> Animates out when closing.\n- `data-[state=closed]:fade-out-0` -> Fades out to 0 opacity when closing.\n- `data-[state=open]:fade-in-0` -> Fades in from 0 opacity when opening.\n- `data-[state=closed]:zoom-out-95` -> Zooms out to 95% when closing.\n- `data-[state=open]:zoom-in-95` -> Zooms in from 95% when opening.\n- `fixed` -> Fixed positioning.\n- `top-[50%]` -> Top position 50%.\n- `left-[50%]` -> Left position 50%.\n- `z-50` -> Z-index 50.\n- `grid` -> Display grid.\n- `w-full` -> Full width.\n- `max-w-[calc(100%-2rem)]` -> Max width calc(100% - 2rem).\n- `translate-x-[-50%]` -> Translate X -50%.\n- `translate-y-[-50%]` -> Translate Y -50%.\n- `gap-4` -> Gap 4.\n- `rounded-lg` -> Large border radius.\n- `border` -> Border.\n- `p-6` -> Padding 6.\n- `shadow-lg` -> Large shadow.\n- `duration-200` -> Transition duration 200ms.\n- `sm:max-w-lg` -> Max width large on small screens.\n\n**DialogHeader:**\n- `flex` -> Display flex.\n- `flex-col` -> Flex direction column.\n- `gap-2` -> Gap 2.\n- `text-center` -> Text center.\n- `sm:text-left` -> Text left on small screens.\n\n**DialogTitle:**\n- `text-lg` -> Large text size.\n- `font-semibold` -> Semibold font weight.\n- `leading-none` -> No line height.\n- `tracking-tight` -> Tight letter spacing.\n\n**DialogDescription:**\n- `text-muted-foreground` -> Muted foreground text color.\n- `text-sm` -> Small text size.\n\n**DialogFooter:**\n- `flex` -> Display flex.\n- `flex-col-reverse` -> Flex direction column reverse.\n- `gap-2` -> Gap 2.\n- `sm:flex-row` -> Flex direction row on small screens.\n- `sm:justify-end` -> Justify end on small screens.\n\n**DialogClose:**\n- `ring-offset-background` -> Ring offset background.\n- `focus:ring-ring` -> Ring color on focus.\n- `data-[state=open]:bg-accent` -> Accent background when open.\n- `data-[state=open]:text-muted-foreground` -> Muted foreground text when open.\n- `absolute` -> Absolute positioning.\n- `top-4` -> Top 4.\n- `right-4` -> Right 4.\n- `rounded-xs` -> Extra small border radius.\n- `opacity-70` -> Opacity 70%.\n- `transition-opacity` -> Transition opacity.\n- `hover:opacity-100` -> Opacity 100% on hover.\n- `focus:ring-2` -> Ring width 2 on focus.\n- `focus:ring-offset-2` -> Ring offset 2 on focus.\n- `focus:outline-hidden` -> Hidden outline on focus.\n- `disabled:pointer-events-none` -> No pointer events when disabled.\n- `[&_svg]:pointer-events-none` -> No pointer events on SVG.\n- `[&_svg]:shrink-0` -> No shrink on SVG.\n- `[&_svg:not([class*='size-'])]:size-4` -> Size 4 on SVG if no size class.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<DialogTrigger asChild>
					<Button>Open Dialog</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Dialog Title</DialogTitle>
						<DialogDescription>
							This is a description of the dialog.
						</DialogDescription>
					</DialogHeader>
					<p>Dialog content goes here.</p>
					<DialogFooter>
						<Button variant="outline">Cancel</Button>
						<Button>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</>
		),
	},
};

export const WithTrigger: Story = {
	args: {
		children: (
			<>
				<DialogTrigger asChild>
					<Button>Open Dialog</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Triggered Dialog</DialogTitle>
						<DialogDescription>
							This dialog was opened by a trigger.
						</DialogDescription>
					</DialogHeader>
					<p>Content.</p>
				</DialogContent>
			</>
		),
	},
};
