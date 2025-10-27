import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	Line,
	LineChart,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from 'recharts';
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '../../ui/chart';

const meta = {
	title: 'UI/Chart',
	component: ChartContainer,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					"A chart component built on top of Recharts with custom theming.\n\n**Theming classes applied:**\n\n**ChartContainer:**\n- `flex` -> Display flex.\n- `aspect-video` -> 16:9 aspect ratio.\n- `justify-center` -> Centers content horizontally.\n- `text-xs` -> Extra small text size.\n- `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground` -> Muted foreground for axis tick text.\n- `[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50` -> 50% border color for grid lines.\n- `[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border` -> Border color for tooltip cursor curve.\n- `[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border` -> Border color for polar grid.\n- `[&_.recharts-radial-bar-background-sector]:fill-muted` -> Muted fill for radial bar background.\n- `[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted` -> Muted fill for tooltip cursor rectangle.\n- `[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border` -> Border color for reference lines.\n- `[&_.recharts-dot[stroke='#fff']]:stroke-transparent` -> Transparent stroke for dots.\n- `[&_.recharts-layer]:outline-hidden` -> Hidden outline for layers.\n- `[&_.recharts-sector]:outline-hidden` -> Hidden outline for sectors.\n- `[&_.recharts-sector[stroke='#fff']]:stroke-transparent` -> Transparent stroke for sectors.\n- `[&_.recharts-surface]:outline-hidden` -> Hidden outline for surface.\n\n**ChartTooltipContent:**\n- `border-border/50` -> 50% border color.\n- `bg-background` -> Background color.\n- `grid` -> Display grid.\n- `min-w-[8rem]` -> Minimum width 128px.\n- `items-start` -> Items aligned to start.\n- `gap-1.5` -> Gap 6px.\n- `rounded-lg` -> Large border radius.\n- `border` -> Border.\n- `px-2.5` -> Horizontal padding 10px.\n- `py-1.5` -> Vertical padding 6px.\n- `text-xs` -> Extra small text size.\n- `shadow-xl` -> Extra large shadow.\n\n**ChartLegendContent:**\n- `flex` -> Display flex.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n- `gap-4` -> Gap 16px.\n- `pb-3` -> Bottom padding 12px (when verticalAlign is top).\n- `pt-3` -> Top padding 12px (when verticalAlign is bottom).",
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof ChartContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

export const LineChartExample: Story = {
	args: {
		config: chartConfig,
		className: 'h-[300px] w-full',
		children: (
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis hide />
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Line
					dataKey="desktop"
					type="monotone"
					stroke="var(--color-desktop)"
					strokeWidth={2}
					dot={false}
				/>
				<Line
					dataKey="mobile"
					type="monotone"
					stroke="var(--color-mobile)"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		),
	},
};

export const BarChartExample: Story = {
	args: {
		config: chartConfig,
		className: 'h-[300px] w-full',
		children: (
			<BarChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis hide />
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
				<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
			</BarChart>
		),
	},
};

export const AreaChartExample: Story = {
	args: {
		config: chartConfig,
		className: 'h-[300px] w-full',
		children: (
			<AreaChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis hide />
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Area
					dataKey="desktop"
					type="natural"
					fill="var(--color-desktop)"
					fillOpacity={0.4}
					stroke="var(--color-desktop)"
					stackId="a"
				/>
				<Area
					dataKey="mobile"
					type="natural"
					fill="var(--color-mobile)"
					fillOpacity={0.4}
					stroke="var(--color-mobile)"
					stackId="a"
				/>
			</AreaChart>
		),
	},
};

const pieData = [
	{ browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
	{ browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
	{ browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
	{ browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
	{ browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];

const pieConfig = {
	visitors: {
		label: 'Visitors',
	},
	chrome: {
		label: 'Chrome',
		color: 'hsl(var(--chart-1))',
	},
	safari: {
		label: 'Safari',
		color: 'hsl(var(--chart-2))',
	},
	firefox: {
		label: 'Firefox',
		color: 'hsl(var(--chart-3))',
	},
	edge: {
		label: 'Edge',
		color: 'hsl(var(--chart-4))',
	},
	other: {
		label: 'Other',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig;

export const PieChartExample: Story = {
	args: {
		config: pieConfig,
		className: 'h-[300px] w-full',
		children: (
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={pieData}
					dataKey="visitors"
					nameKey="browser"
					innerRadius={60}
					strokeWidth={5}
				/>
				<ChartLegend
					content={<ChartLegendContent nameKey="browser" />}
					className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
				/>
			</PieChart>
		),
	},
};
