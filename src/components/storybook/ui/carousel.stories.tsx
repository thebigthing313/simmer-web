import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardContent } from '../../ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../../ui/carousel';

const meta = {
	title: 'UI/Carousel',
	component: Carousel,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A carousel component for displaying content in a scrollable, swipeable interface.\n\n**Theming classes applied:**\n\n**Carousel:**\n- `relative` -> Relative positioning for navigation buttons.\n\n**CarouselContent (Container):**\n- `overflow-hidden` -> Hides overflow for smooth scrolling.\n\n**CarouselContent (Inner):**\n- `flex` -> Display flex.\n- `-ml-4` -> Negative left margin for horizontal spacing (horizontal orientation).\n- `-mt-4` -> Negative top margin for vertical spacing (vertical orientation).\n- `flex-col` -> Column direction (vertical orientation).\n\n**CarouselItem:**\n- `min-w-0` -> Minimum width 0.\n- `shrink-0` -> Prevents shrinking.\n- `grow-0` -> Prevents growing.\n- `basis-full` -> Full basis width.\n- `pl-4` -> Left padding 16px (horizontal orientation).\n- `pt-4` -> Top padding 16px (vertical orientation).\n\n**CarouselPrevious/CarouselNext:**\n- `absolute` -> Absolute positioning.\n- `size-8` -> Size 32px.\n- `rounded-full` -> Full border radius.\n- `top-1/2` -> Top 50% (horizontal orientation).\n- `-left-12` -> Left -48px (horizontal orientation).\n- `-translate-y-1/2` -> Translate Y -50% (horizontal orientation).\n- `-top-12` -> Top -48px (vertical orientation).\n- `left-1/2` -> Left 50% (vertical orientation).\n- `-translate-x-1/2` -> Translate X -50% (vertical orientation).\n- `rotate-90` -> 90 degree rotation (vertical orientation).\n- `-right-12` -> Right -48px (horizontal orientation).\n- `-bottom-12` -> Bottom -48px (vertical orientation).',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		children: (
			<>
				<CarouselContent>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">1</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">2</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">3</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">4</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">5</span>
							</CardContent>
						</Card>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</>
		),
	},
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		className: 'max-w-xs',
		children: (
			<>
				<CarouselContent className="max-h-64">
					<CarouselItem>
						<Card>
							<CardContent className="flex items-center justify-center p-6">
								<span className="text-2xl font-semibold">Slide 1</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex items-center justify-center p-6">
								<span className="text-2xl font-semibold">Slide 2</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex items-center justify-center p-6">
								<span className="text-2xl font-semibold">Slide 3</span>
							</CardContent>
						</Card>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</>
		),
	},
};

export const Images: Story = {
	args: {
		opts: {
			align: 'start',
		},
		className: 'w-full max-w-sm',
		children: (
			<>
				<CarouselContent>
					<CarouselItem>
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<img
										src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center"
										alt="Mountain landscape"
										className="h-full w-full rounded-md object-cover"
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<img
										src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&crop=center"
										alt="Forest path"
										className="h-full w-full rounded-md object-cover"
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="p-1">
							<Card>
								<CardContent className="flex aspect-square items-center justify-center p-6">
									<img
										src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center"
										alt="Portrait"
										className="h-full w-full rounded-md object-cover"
									/>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</>
		),
	},
};

export const WithoutNavigation: Story = {
	args: {
		children: (
			<>
				<CarouselContent>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">A</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">B</span>
							</CardContent>
						</Card>
					</CarouselItem>
					<CarouselItem>
						<Card>
							<CardContent className="flex aspect-square items-center justify-center p-6">
								<span className="text-4xl font-semibold">C</span>
							</CardContent>
						</Card>
					</CarouselItem>
				</CarouselContent>
			</>
		),
	},
};
