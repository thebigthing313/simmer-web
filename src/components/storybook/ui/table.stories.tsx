import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '../../ui/table';

const meta = {
	title: 'UI/Table',
	component: Table,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A table component with various parts.\n\n**Theming classes applied:**\n\n**Table Container:**\n- `relative` → Relative positioning.\n- `w-full` → Full width.\n- `overflow-x-auto` → Horizontal scroll if needed.\n\n**Table:**\n- `w-full` → Full width.\n- `caption-bottom` → Caption at bottom.\n- `text-sm` → Small text size.\n\n**TableHeader:**\n- `[&_tr]:border-b` → Border bottom on table rows.\n\n**TableBody:**\n- `[&_tr:last-child]:border-0` → No border on last row.\n\n**TableFooter:**\n- `bg-muted/50` → 50% opacity muted background.\n- `border-t` → Top border.\n- `font-medium` → Medium font weight.\n- `[&>tr]:last:border-b-0` → No border on last row in footer.\n\n**TableRow:**\n- `hover:bg-muted/50` → 50% opacity muted background on hover.\n- `data-[state=selected]:bg-muted` → Muted background when selected.\n- `border-b` → Bottom border.\n- `transition-colors` → Smooth color transitions.\n\n**TableHead:**\n- `text-foreground` → Foreground text color.\n- `h-10` → Height 40px.\n- `px-2` → Horizontal padding 2.\n- `text-left` → Left-aligned text.\n- `align-middle` → Middle alignment.\n- `font-medium` → Medium font weight.\n- `whitespace-nowrap` → No text wrapping.\n- `[&:has([role=checkbox])]:pr-0` → No right padding if has checkbox.\n- `[&>[role=checkbox]]:translate-y-[2px]` → Translate checkbox up 2px.\n\n**TableCell:**\n- `p-2` → Padding 2.\n- `align-middle` → Middle alignment.\n- `whitespace-nowrap` → No text wrapping.\n- `[&:has([role=checkbox])]:pr-0` → No right padding if has checkbox.\n- `[&>[role=checkbox]]:translate-y-[2px]` → Translate checkbox up 2px.\n\n**TableCaption:**\n- `text-muted-foreground` → Muted foreground text color.\n- `mt-4` → Top margin 4.\n- `text-sm` → Small text size.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell className="text-right">$250.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell className="text-right">$150.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">INV003</TableCell>
					<TableCell>Unpaid</TableCell>
					<TableCell>Bank Transfer</TableCell>
					<TableCell className="text-right">$350.00</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$750.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};

export const WithoutFooter: Story = {
	render: () => (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell className="text-right">$250.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell className="text-right">$150.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const WithoutCaption: Story = {
	render: () => (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell className="text-right">$250.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell className="font-medium">INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell className="text-right">$150.00</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$400.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};

export const Selectable: Story = {
	render: () => (
		<Table>
			<TableCaption>Select invoices to process.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[50px]">
						<input type="checkbox" />
					</TableHead>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>
						<input type="checkbox" />
					</TableCell>
					<TableCell className="font-medium">INV001</TableCell>
					<TableCell>Paid</TableCell>
					<TableCell>Credit Card</TableCell>
					<TableCell className="text-right">$250.00</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<input type="checkbox" />
					</TableCell>
					<TableCell className="font-medium">INV002</TableCell>
					<TableCell>Pending</TableCell>
					<TableCell>PayPal</TableCell>
					<TableCell className="text-right">$150.00</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};

export const Empty: Story = {
	render: () => (
		<Table>
			<TableCaption>No invoices found.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>{/* Empty body */}</TableBody>
		</Table>
	),
};
