import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '../../ui/breadcrumb';

const meta = {
	title: 'UI/Breadcrumb',
	component: Breadcrumb,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A breadcrumb component for navigation with links and separators.\n\n**Theming classes applied:**\n\n**BreadcrumbList:**\n- `text-muted-foreground` → Muted foreground text color.\n- `flex` → Displays as flex container.\n- `flex-wrap` → Wraps flex items.\n- `items-center` → Centers items vertically.\n- `gap-1.5` → Sets gap between items.\n- `text-sm` → Small text size.\n- `break-words` → Breaks long words.\n- `sm:gap-2.5` → On small screens and up, increases gap to 2.5.\n\n**BreadcrumbItem:**\n- `inline-flex` → Displays as inline flex container.\n- `items-center` → Centers items vertically.\n- `gap-1.5` → Sets gap between items.\n\n**BreadcrumbLink:**\n- `hover:text-foreground` → Changes text color to foreground on hover.\n- `transition-colors` → Transitions color changes.\n\n**BreadcrumbPage:**\n- `text-foreground` → Foreground text color.\n- `font-normal` → Normal font weight.\n\n**BreadcrumbSeparator:**\n- `[&>svg]:size-3.5` → Sets SVG size to 3.5.\n\n**BreadcrumbEllipsis:**\n- `flex` → Displays as flex container.\n- `size-9` → Sets size to 36px.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Components</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		),
	},
};

export const WithEllipsis: Story = {
	args: {
		children: (
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbEllipsis />
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Components</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		),
	},
};
