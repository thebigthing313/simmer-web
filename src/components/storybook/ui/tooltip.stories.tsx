import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

const meta = {
	title: 'UI/Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `A tooltip component for displaying additional information on hover or focus.\n\n**Theming classes applied:**\n\n**TooltipContent:**\n- \`bg-foreground\` → Foreground background color.\n- \`text-background\` → Background text color.\n- \`animate-in\` → Animate in.\n- \`fade-in-0\` → Fade in from 0.\n- \`zoom-in-95\` → Zoom in from 95%.\n- \`data-[state=closed]:animate-out\` → Animate out when closed.\n- \`data-[state=closed]:fade-out-0\` → Fade out to 0.\n- \`data-[state=closed]:zoom-out-95\` → Zoom out to 95%.\n- \`data-[side=bottom]:slide-in-from-top-2\` → Slide in from top for bottom side.\n- \`data-[side=left]:slide-in-from-right-2\` → Slide in from right for left side.\n- \`data-[side=right]:slide-in-from-left-2\` → Slide in from left for right side.\n- \`data-[side=top]:slide-in-from-bottom-2\` → Slide in from bottom for top side.\n- \`z-50\` → Z-index 50.\n- \`w-fit\` → Fit width.\n- \`origin-(--radix-tooltip-content-transform-origin)\` → Transform origin.\n- \`rounded-md\` → Medium border radius.\n- \`px-3\` → Horizontal padding 3.\n- \`py-1.5\` → Vertical padding 1.5.\n- \`text-xs\` → Extra small text size.\n- \`text-balance\` → Balanced text.\n\n**TooltipPrimitive.Arrow:**\n- \`bg-foreground\` → Foreground background.\n- \`fill-foreground\` → Foreground fill.\n- \`z-50\` → Z-index 50.\n- \`size-2.5\` → Size 10px.\n- \`translate-y-[calc(-50%_-_2px)]\` → Translate Y.\n- \`rotate-45\` → 45 degree rotation.\n- \`rounded-[2px]\` → Small border radius.`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger asChild>
				<button type="button">Hover me</button>
			</TooltipTrigger>
			<TooltipContent>
				<p>This is a tooltip</p>
			</TooltipContent>
		</Tooltip>
	),
};
