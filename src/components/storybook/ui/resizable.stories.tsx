import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '../../ui/resizable';

const meta = {
	title: 'UI/Resizable',
	component: ResizablePanelGroup,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A resizable panel component for creating adjustable layouts with draggable handles.\n\n**Theming classes applied:**\n\n**ResizablePanelGroup:**\n- `flex` → Uses flexbox layout.\n- `h-full` → Takes full height.\n- `w-full` → Takes full width.\n- `data-[panel-group-direction=vertical]:flex-col` → Vertical layout when direction is vertical.\n\n**ResizableHandle:**\n- `bg-border` → Sets background color to border theme.\n- `focus-visible:ring-ring` → Ring color on focus.\n- `relative` → Establishes positioning context.\n- `flex` → Uses flexbox layout.\n- `w-px` → Sets width to 1px.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `after:absolute` → Creates pseudo-element.\n- `after:inset-y-0` → Full height for pseudo-element.\n- `after:left-1/2` → Centers pseudo-element horizontally.\n- `after:w-1` → Sets pseudo-element width to 4px.\n- `after:-translate-x-1/2` → Translates pseudo-element to center.\n- `focus-visible:ring-1` → Ring width on focus.\n- `focus-visible:ring-offset-1` → Ring offset on focus.\n- `focus-visible:outline-hidden` → Hides outline on focus.\n- `data-[panel-group-direction=vertical]:h-px` → Height of 1px when vertical.\n- `data-[panel-group-direction=vertical]:w-full` → Full width when vertical.\n- `data-[panel-group-direction=vertical]:after:left-0` → Left position for vertical pseudo-element.\n- `data-[panel-group-direction=vertical]:after:h-1` → Height for vertical pseudo-element.\n- `data-[panel-group-direction=vertical]:after:w-full` → Full width for vertical pseudo-element.\n- `data-[panel-group-direction=vertical]:after:translate-x-0` → No horizontal translation for vertical.\n- `data-[panel-group-direction=vertical]:after:-translate-y-1/2` → Vertical centering for vertical pseudo-element.\n- `[&[data-panel-group-direction=vertical]>div]:rotate-90` → Rotates handle content when vertical.\n\n**Handle (withHandle variant):**\n- `bg-border` → Sets background color to border theme.\n- `z-10` → High z-index.\n- `flex` → Uses flexbox layout.\n- `h-4` → Sets height to 1rem.\n- `w-3` → Sets width to 0.75rem.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `rounded-xs` → Small border radius.\n- `border` → Adds border.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: {
		direction: 'horizontal',
		className: 'h-[400px] w-full',
		children: (
			<>
				<ResizablePanel defaultSize={25}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Sidebar</span>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={75}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Content</span>
					</div>
				</ResizablePanel>
			</>
		),
	},
};

export const Vertical: Story = {
	args: {
		direction: 'vertical',
		className: 'h-[600px] w-full',
		children: (
			<>
				<ResizablePanel defaultSize={50}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Top Panel</span>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Bottom Panel</span>
					</div>
				</ResizablePanel>
			</>
		),
	},
};

export const ThreePanels: Story = {
	args: {
		direction: 'horizontal',
		className: 'h-[400px] w-full',
		children: (
			<>
				<ResizablePanel defaultSize={20}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Left</span>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={60}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Center</span>
					</div>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={20}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Right</span>
					</div>
				</ResizablePanel>
			</>
		),
	},
};

export const WithHandle: Story = {
	args: {
		direction: 'horizontal',
		className: 'h-[400px] w-full',
		children: (
			<>
				<ResizablePanel defaultSize={30}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Navigation</span>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={70}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="font-semibold">Main Content</span>
					</div>
				</ResizablePanel>
			</>
		),
	},
};

export const CodeEditor: Story = {
	args: {
		direction: 'horizontal',
		className: 'h-[500px] w-full',
		children: (
			<>
				<ResizablePanel defaultSize={25} minSize={15}>
					<div className="flex h-full flex-col">
						<div className="flex items-center justify-between p-4 border-b">
							<span className="font-semibold">Explorer</span>
						</div>
						<div className="flex-1 p-4">
							<div className="space-y-2">
								<div className="text-sm">📁 src</div>
								<div className="text-sm ml-4">📄 index.js</div>
								<div className="text-sm ml-4">📄 App.js</div>
								<div className="text-sm">📁 public</div>
								<div className="text-sm ml-4">📄 index.html</div>
							</div>
						</div>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={75}>
					<div className="flex h-full flex-col">
						<div className="flex items-center justify-between p-4 border-b">
							<span className="font-semibold">Editor</span>
							<span className="text-sm text-muted-foreground">App.js</span>
						</div>
						<div className="flex-1 p-4 font-mono text-sm bg-muted/20">
							<div className="space-y-1">
								<div>import React from 'react';</div>
								<div></div>
								<div>function App() {'{'}</div>
								<div className="ml-4">return (</div>
								<div className="ml-8">&lt;div&gt;</div>
								<div className="ml-12">Hello World</div>
								<div className="ml-8">&lt;/div&gt;</div>
								<div className="ml-4">);</div>
								<div>{'}'}</div>
								<div></div>
								<div>export default App;</div>
							</div>
						</div>
					</div>
				</ResizablePanel>
			</>
		),
	},
};
