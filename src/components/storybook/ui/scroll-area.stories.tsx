import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea, ScrollBar } from '../../ui/scroll-area';

const meta = {
	title: 'UI/ScrollArea',
	component: ScrollArea,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A scroll area component with custom scrollbars for better styling control.\n\n**Theming classes applied:**\n\n**ScrollArea:**\n- `relative` → Establishes positioning context.\n\n**ScrollAreaViewport:**\n- `focus-visible:ring-ring/50` → Ring color on focus.\n- `size-full` → Takes full width and height.\n- `rounded-[inherit]` → Inherits border radius.\n- `transition-[color,box-shadow]` → Smooth transitions for color and shadow.\n- `outline-none` → Removes default outline.\n- `focus-visible:ring-[3px]` → Ring width on focus.\n- `focus-visible:outline-1` → Outline on focus.\n\n**ScrollBar:**\n- `flex` → Uses flexbox layout.\n- `touch-none` → Disables touch scrolling.\n- `p-px` → Padding.\n- `transition-colors` → Smooth color transitions.\n- `select-none` → Prevents text selection.\n\n**ScrollBar (vertical orientation):**\n- `h-full` → Takes full height.\n- `w-2.5` → Sets width to 0.625rem.\n- `border-l` → Left border.\n- `border-l-transparent` → Transparent left border.\n\n**ScrollBar (horizontal orientation):**\n- `h-2.5` → Sets height to 0.625rem.\n- `flex-col` → Vertical layout.\n- `border-t` → Top border.\n- `border-t-transparent` → Transparent top border.\n\n**ScrollAreaThumb:**\n- `bg-border` → Sets background color to border theme.\n- `relative` → Establishes positioning context.\n- `flex-1` → Takes remaining space.\n- `rounded-full` → Fully rounded corners.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		className: 'h-[200px] w-[350px] rounded-md border p-4',
		children: (
			<div className="space-y-4">
				<h4 className="text-sm font-medium leading-none">Scrollable Content</h4>
				<p className="text-sm">
					This is a scrollable area with custom styled scrollbars. The content
					can be much longer than the container.
				</p>
				<div className="space-y-2">
					{Array.from({ length: 20 }, (_, i) => (
						<div key={i} className="text-sm">
							Item {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
							elit.
						</div>
					))}
				</div>
			</div>
		),
	},
};

export const WithHorizontalScroll: Story = {
	args: {
		className: 'h-[150px] w-[300px] rounded-md border p-4',
		children: (
			<div className="whitespace-nowrap">
				<div className="flex space-x-4">
					{Array.from({ length: 10 }, (_, i) => (
						<div
							key={i}
							className="w-32 h-20 bg-muted rounded flex items-center justify-center text-sm"
						>
							Card {i + 1}
						</div>
					))}
				</div>
			</div>
		),
	},
	render: (args) => (
		<ScrollArea {...args}>
			{args.children}
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	),
};

export const WithBothScrollbars: Story = {
	args: {
		className: 'h-[200px] w-[400px] rounded-md border p-4',
		children: (
			<div className="space-y-4">
				<h4 className="text-sm font-medium leading-none">Wide Content</h4>
				<div className="space-y-2">
					{Array.from({ length: 15 }, (_, i) => (
						<div key={i} className="flex space-x-4">
							<span className="text-sm w-20">Row {i + 1}:</span>
							<span className="text-sm flex-1">
								This is a very long line of text that will cause horizontal
								scrolling when the container is not wide enough to display it
								all at once. Lorem ipsum dolor sit amet, consectetur adipiscing
								elit, sed do eiusmod tempor incididunt ut labore et dolore magna
								aliqua.
							</span>
						</div>
					))}
				</div>
			</div>
		),
	},
	render: (args) => (
		<ScrollArea {...args}>
			{args.children}
			<ScrollBar orientation="vertical" />
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	),
};

export const CodeSnippet: Story = {
	args: {
		className: 'h-[300px] w-[500px] rounded-md border bg-muted/20 p-4',
		children: (
			<pre className="text-sm">
				<code>{`import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CodeExample() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium leading-none">
          Scrollable Code
        </h4>
        <p className="text-sm">
          This is a scrollable area containing code content.
          The scrollbar is custom styled and matches the theme.
        </p>
        <div className="space-y-2 font-mono text-xs">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="text-muted-foreground">
              console.log('Line {i + 1}: This is a code line');
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}`}</code>
			</pre>
		),
	},
};

export const TableData: Story = {
	args: {
		className: 'h-[250px] w-[600px] rounded-md border',
		children: (
			<table className="w-full">
				<thead className="sticky top-0 bg-background border-b">
					<tr>
						<th className="text-left p-2 font-medium">Name</th>
						<th className="text-left p-2 font-medium">Email</th>
						<th className="text-left p-2 font-medium">Role</th>
						<th className="text-left p-2 font-medium">Status</th>
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 25 }, (_, i) => (
						<tr key={i} className="border-b">
							<td className="p-2 text-sm">User {i + 1}</td>
							<td className="p-2 text-sm">user{i + 1}@example.com</td>
							<td className="p-2 text-sm">
								{i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer'}
							</td>
							<td className="p-2 text-sm">
								<span
									className={`px-2 py-1 rounded-full text-xs ${
										i % 2 === 0
											? 'bg-green-100 text-green-800'
											: 'bg-yellow-100 text-yellow-800'
									}`}
								>
									{i % 2 === 0 ? 'Active' : 'Pending'}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		),
	},
};
