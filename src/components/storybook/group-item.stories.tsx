import type { Meta, StoryObj } from '@storybook/react-vite';

import { GroupCard, GroupCardGroup } from '../blocks/group-item';

const meta = {
	title: 'Blocks/GroupCard',
	component: GroupCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithData: Story = {
	args: {
		group: {
			logo_url: 'https://avatar.iran.liara.run/public',
			group_name: 'Sample Group',
			address: '123 Main St, Anytown, USA',
			phone: '+1-555-123-4567',
		},
	},
};

export const WithoutLogo: Story = {
	args: {
		group: {
			group_name: 'Group Without Logo',
			address: '456 Elm St, Somewhere, USA',
			phone: '+1-555-987-6543',
		},
	},
};

export const Skeleton: Story = {
	args: {},
};

export const Group: Story = {
	render: () => (
		<GroupCardGroup>
			<GroupCard
				group={{
					logo_url: 'https://avatar.iran.liara.run/public',
					group_name: 'Tech Innovators',
					address: '123 Silicon Valley, CA',
					phone: '+1-555-123-4567',
				}}
			/>
			<GroupCard
				group={{
					group_name: 'Design Collective',
					address: '456 Creative Blvd, NY',
					phone: '+1-555-987-6543',
				}}
			/>
			<GroupCard />
		</GroupCardGroup>
	),
};
