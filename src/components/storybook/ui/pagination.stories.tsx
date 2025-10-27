import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../../ui/pagination';

const meta = {
	title: 'UI/Pagination',
	component: Pagination,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A pagination component for navigating through multiple pages of content.\n\n**Theming classes applied:**\n\n**Pagination:**\n- `mx-auto` → Centers horizontally with auto margins.\n- `flex` → Uses flexbox layout.\n- `w-full` → Takes full width.\n- `justify-center` → Centers content horizontally.\n\n**PaginationContent:**\n- `flex` → Uses flexbox layout.\n- `flex-row` → Horizontal layout.\n- `items-center` → Centers items vertically.\n- `gap-1` → Gap between items.\n\n**PaginationLink:**\n- Uses button variants (outline when active, ghost when inactive).\n- `aria-current` → Sets current page for accessibility.\n- `data-active` → Data attribute for active state.\n\n**PaginationPrevious:**\n- `gap-1` → Gap between icon and text.\n- `px-2.5` → Horizontal padding.\n- `sm:pl-2.5` → Left padding on small screens and up.\n\n**PaginationNext:**\n- `gap-1` → Gap between text and icon.\n- `px-2.5` → Horizontal padding.\n- `sm:pr-2.5` → Right padding on small screens and up.\n\n**PaginationEllipsis:**\n- `flex` → Uses flexbox layout.\n- `size-9` → Sets width and height to 2.25rem.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		children: (
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		),
	},
};

export const WithEllipsis: Story = {
	args: {
		children: (
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">8</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">9</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">10</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		),
	},
};

export const LargeDataset: Story = {
	args: {
		children: (
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">45</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						46
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">47</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">100</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		),
	},
};

export const Compact: Story = {
	args: {
		children: (
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" size="sm">
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" size="sm" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" size="sm">
						3
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		),
	},
};
