import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Skeleton } from '../../ui/skeleton';

const meta: Meta<typeof Skeleton> = {
	title: 'UI/Skeleton',
	component: Skeleton,
	parameters: {
		docs: {
			description: {
				component: `
A loading placeholder component that provides visual feedback while content is being loaded.

## Usage
Use skeletons to indicate loading states and prevent layout shifts. They should match the approximate size and shape of the content being loaded.

## Tailwind Classes
- \`bg-muted/50\`: Semi-transparent muted background color
- \`animate-pulse\`: CSS animation that creates a pulsing effect
- \`rounded-md\`: Medium border radius for smooth appearance
        `,
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
	render: () => (
		<div className="space-y-4">
			<Skeleton className="h-4 w-[250px]" />
			<Skeleton className="h-4 w-[200px]" />
			<Skeleton className="h-4 w-[150px]" />
		</div>
	),
};

export const Circle: Story = {
	render: () => (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	),
};

export const CardSkeleton: Story = {
	render: () => (
		<Card>
			<CardHeader className="space-y-2">
				<Skeleton className="h-4 w-[150px]" />
				<Skeleton className="h-4 w-[100px]" />
			</CardHeader>
			<CardContent className="space-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
			</CardContent>
		</Card>
	),
};

export const AvatarSkeleton: Story = {
	render: () => (
		<div className="flex items-center space-x-4">
			<Skeleton className="h-10 w-10 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[150px]" />
				<Skeleton className="h-4 w-[100px]" />
			</div>
		</div>
	),
};

export const ButtonSkeleton: Story = {
	render: () => (
		<div className="space-y-2">
			<Skeleton className="h-10 w-[100px]" />
			<Skeleton className="h-10 w-[120px]" />
			<Skeleton className="h-10 w-20" />
		</div>
	),
};

export const TableSkeleton: Story = {
	render: () => (
		<div className="space-y-3">
			<div className="flex space-x-4">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-[120px]" />
			</div>
			<div className="flex space-x-4">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-[120px]" />
			</div>
			<div className="flex space-x-4">
				<Skeleton className="h-4 w-[100px]" />
				<Skeleton className="h-4 w-[150px]" />
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-[120px]" />
			</div>
		</div>
	),
};

export const ComplexLayout: Story = {
	render: () => (
		<div className="space-y-6">
			<div className="flex items-center space-x-4">
				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[200px]" />
					<Skeleton className="h-4 w-[150px]" />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<Skeleton className="h-4 w-[100px]" />
					</CardHeader>
					<CardContent className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Skeleton className="h-4 w-[120px]" />
					</CardHeader>
					<CardContent className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-2/3" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Skeleton className="h-4 w-[90px]" />
					</CardHeader>
					<CardContent className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-4/5" />
					</CardContent>
				</Card>
			</div>
		</div>
	),
};
