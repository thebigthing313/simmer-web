/** biome-ignore-all lint/correctness/useUniqueElementIds: <storybook> */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoIcon } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

const meta = {
	title: 'UI/Label',
	component: Label,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A label component for form inputs with optional icons.\n\n**Theming classes applied:**\n- `flex` -> Displays as flex container.\n- `items-center` -> Centers items vertically.\n- `gap-2` -> Gap between items.\n- `text-sm` -> Small text size.\n- `leading-none` -> No line height.\n- `font-medium` -> Medium font weight.\n- `select-none` -> Prevents text selection.\n- `group-data-[disabled=true]:pointer-events-none` -> No pointer events when group is disabled.\n- `group-data-[disabled=true]:opacity-50` -> 50% opacity when group is disabled.\n- `peer-disabled:cursor-not-allowed` -> Not allowed cursor when peer is disabled.\n- `peer-disabled:opacity-50` -> 50% opacity when peer is disabled.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Label Text',
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<InfoIcon className="size-4" />
				Label with Icon
			</>
		),
	},
};

export const WithInput: Story = {
	args: {
		htmlFor: 'input-id',
		children: 'Email',
	},
	render: (args) => (
		<div>
			<Label {...args} />
			<Input id="input-id" placeholder="Enter email" />
		</div>
	),
};
