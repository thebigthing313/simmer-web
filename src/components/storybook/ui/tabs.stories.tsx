import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

const meta = {
	title: 'UI/Tabs',
	component: Tabs,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					"A tabbed interface component.\n\n**Theming classes applied:**\n\n**Tabs (Root):**\n- `flex` -> Display flex.\n- `flex-col` -> Column direction.\n- `gap-2` -> Gap 8px.\n\n**TabsList:**\n- `bg-muted` -> Muted background.\n- `text-muted-foreground` -> Muted foreground text.\n- `inline-flex` -> Inline flex display.\n- `h-9` -> Height 36px.\n- `w-fit` -> Width fit content.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n- `rounded-lg` -> Large border radius.\n- `p-[3px]` -> Padding 3px.\n\n**TabsTrigger:**\n- `data-[state=active]:bg-background` -> Background when active.\n- `dark:data-[state=active]:text-foreground` -> Foreground text in dark mode when active.\n- `focus-visible:border-ring` -> Ring border on focus.\n- `focus-visible:ring-ring/50` -> 50% opacity ring on focus.\n- `focus-visible:outline-ring` -> Ring outline on focus.\n- `dark:data-[state=active]:border-input` -> Input border in dark mode when active.\n- `dark:data-[state=active]:bg-input/30` -> 30% input background in dark mode when active.\n- `text-foreground` -> Foreground text.\n- `dark:text-muted-foreground` -> Muted foreground text in dark mode.\n- `inline-flex` -> Inline flex display.\n- `h-[calc(100%-1px)]` -> Height 100% minus 1px.\n- `flex-1` -> Grows to fill space.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n- `gap-1.5` -> Gap 6px.\n- `rounded-md` -> Medium border radius.\n- `border` -> Border.\n- `border-transparent` -> Transparent border.\n- `px-2` -> Horizontal padding 8px.\n- `py-1` -> Vertical padding 4px.\n- `text-sm` -> Small text size.\n- `font-medium` -> Medium font weight.\n- `whitespace-nowrap` -> No text wrapping.\n- `transition-[color,box-shadow]` -> Transitions color and box-shadow.\n- `focus-visible:ring-[3px]` -> Ring 3px on focus.\n- `focus-visible:outline-1` -> Outline 1 on focus.\n- `disabled:pointer-events-none` -> No pointer events when disabled.\n- `disabled:opacity-50` -> 50% opacity when disabled.\n- `data-[state=active]:shadow-sm` -> Small shadow when active.\n- `[&_svg]:pointer-events-none` -> No pointer events on SVG.\n- `[&_svg]:shrink-0` -> Prevents SVG shrinking.\n- `[&_svg:not([class*='size-'])]:size-4` -> Size 16px for SVG without size class.\n\n**TabsContent:**\n- `flex-1` -> Grows to fill space.\n- `outline-none` -> No outline.",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: 'tab1',
		children: (
			<>
				<TabsList>
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
					<TabsTrigger value="tab3">Tab 3</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1">Content for Tab 1</TabsContent>
				<TabsContent value="tab2">Content for Tab 2</TabsContent>
				<TabsContent value="tab3">Content for Tab 3</TabsContent>
			</>
		),
	},
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		defaultValue: 'tab1',
		children: (
			<>
				<TabsList className="flex-col h-auto">
					<TabsTrigger value="tab1">Tab 1</TabsTrigger>
					<TabsTrigger value="tab2">Tab 2</TabsTrigger>
				</TabsList>
				<TabsContent value="tab1">Vertical content 1</TabsContent>
				<TabsContent value="tab2">Vertical content 2</TabsContent>
			</>
		),
	},
};
