import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../../ui/accordion';

const meta = {
	title: 'UI/Accordion',
	component: Accordion,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A collapsible accordion component for displaying content in expandable sections.\n\n**Theming classes applied:**\n\n**Item:**\n- `border-b` → Adds a bottom border to each item.\n- `last:border-b-0` → Removes the bottom border from the last item.\n\n**Trigger:**\n- `focus-visible:border-ring` → Changes border color when focused.\n- `focus-visible:ring-ring/50` → Adds a semi-transparent ring around the trigger on focus.\n- `flex` → Displays the trigger as a flex container.\n- `flex-1` → Allows the trigger to grow and fill available space.\n- `items-start` → Aligns flex items to the start.\n- `justify-between` → Distributes space between flex items.\n- `gap-4` → Adds a gap between flex children.\n- `rounded-md` → Applies medium border radius.\n- `py-4` → Adds vertical padding.\n- `text-left` → Left-aligns the text.\n- `text-sm` → Sets small text size.\n- `font-medium` → Applies medium font weight.\n- `transition-all` → Transitions all properties on state change.\n- `outline-none` → Removes default outline.\n- `hover:underline` → Underlines text on hover.\n- `focus-visible:ring-[3px]` → Adds a 3px ring on focus.\n- `disabled:pointer-events-none` → Disables pointer events when disabled.\n- `disabled:opacity-50` → Reduces opacity to 50% when disabled.\n- `[&[data-state=open]>svg]:rotate-180` → Rotates the SVG icon 180 degrees when open.\n\n**Content:**\n- `data-[state=closed]:animate-accordion-up` → Animates content upward when closing.\n- `data-[state=open]:animate-accordion-down` → Animates content downward when opening.\n- `overflow-hidden` → Hides overflowing content.\n- `text-sm` → Sets small text size.\n\n**Content div:**\n- `pt-0` → Removes top padding.\n- `pb-4` → Adds bottom padding.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
	args: {
		type: 'single',
		collapsible: true,
		children: (
			<>
				<AccordionItem value="item-1">
					<AccordionTrigger>Is it accessible?</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Is it styled?</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that match the other components'
						aesthetic.
					</AccordionContent>
				</AccordionItem>
			</>
		),
	},
};

export const Multiple: Story = {
	args: {
		type: 'multiple',
		children: (
			<>
				<AccordionItem value="item-1">
					<AccordionTrigger>What is React?</AccordionTrigger>
					<AccordionContent>
						React is a JavaScript library for building user interfaces.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>What is TypeScript?</AccordionTrigger>
					<AccordionContent>
						TypeScript is a superset of JavaScript that adds static typing.
					</AccordionContent>
				</AccordionItem>
			</>
		),
	},
};

export const Disabled: Story = {
	args: {
		type: 'single',
		collapsible: true,
		children: (
			<>
				<AccordionItem value="item-1">
					<AccordionTrigger disabled>Disabled Item</AccordionTrigger>
					<AccordionContent>This item is disabled.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Enabled Item</AccordionTrigger>
					<AccordionContent>This item is enabled.</AccordionContent>
				</AccordionItem>
			</>
		),
	},
};
