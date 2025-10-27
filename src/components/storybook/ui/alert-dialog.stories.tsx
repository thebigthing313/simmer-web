import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../ui/alert-dialog';

const meta = {
	title: 'UI/AlertDialog',
	component: AlertDialog,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A modal dialog for displaying alerts and confirmations.\n\n**Theming classes applied:**\n\n**AlertDialogOverlay:**\n- `data-[state=open]:animate-in` -> Animate in when open.\n- `data-[state=closed]:animate-out` -> Animate out when closed.\n- `data-[state=closed]:fade-out-0` -> Fade out to 0 when closed.\n- `data-[state=open]:fade-in-0` -> Fade in from 0 when open.\n- `fixed` -> Fixed positioning.\n- `inset-0` -> Full viewport.\n- `z-50` -> High z-index.\n- `bg-black/50` -> 50% black background.\n\n**AlertDialogContent:**\n- `bg-background` -> Background color.\n- `data-[state=open]:animate-in` -> Animate in when open.\n- `data-[state=closed]:animate-out` -> Animate out when closed.\n- `data-[state=closed]:fade-out-0` -> Fade out to 0 when closed.\n- `data-[state=open]:fade-in-0` -> Fade in from 0 when open.\n- `data-[state=closed]:zoom-out-95` -> Zoom out to 95% when closed.\n- `data-[state=open]:zoom-in-95` -> Zoom in from 95% when open.\n- `fixed` -> Fixed positioning.\n- `top-[50%]` -> Top 50%.\n- `left-[50%]` -> Left 50%.\n- `z-50` -> High z-index.\n- `grid` -> Display grid.\n- `w-full` -> Full width.\n- `max-w-[calc(100%-2rem)]` -> Max width 100% minus 2rem.\n- `translate-x-[-50%]` -> Translate X -50%.\n- `translate-y-[-50%]` -> Translate Y -50%.\n- `gap-4` -> Gap 16px.\n- `rounded-lg` -> Large border radius.\n- `border` -> Border.\n- `p-6` -> Padding 24px.\n- `shadow-lg` -> Large shadow.\n- `duration-200` -> 200ms duration.\n- `sm:max-w-lg` -> Max width lg on small screens.\n\n**AlertDialogHeader:**\n- `flex` -> Display flex.\n- `flex-col` -> Column direction.\n- `gap-2` -> Gap 8px.\n- `text-center` -> Center text.\n- `sm:text-left` -> Left text on small screens.\n\n**AlertDialogFooter:**\n- `flex` -> Display flex.\n- `flex-col-reverse` -> Reverse column direction.\n- `gap-2` -> Gap 8px.\n- `sm:flex-row` -> Row direction on small screens.\n- `sm:justify-end` -> Justify end on small screens.\n\n**AlertDialogTitle:**\n- `text-lg` -> Large text size.\n- `font-semibold` -> Semibold font weight.\n\n**AlertDialogDescription:**\n- `text-muted-foreground` -> Muted foreground text.\n- `text-sm` -> Small text size.\n\n**AlertDialogAction:**\n- Uses `buttonVariants()` from button component.\n\n**AlertDialogCancel:**\n- Uses `buttonVariants({ variant: "outline" })` from button component.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<AlertDialogTrigger asChild>
					<button
						type="button"
						className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
					>
						Open Alert Dialog
					</button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</>
		),
	},
};
