/** biome-ignore-all lint/correctness/useUniqueElementIds: <storybook> */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

const meta = {
	title: 'UI/RadioGroup',
	component: RadioGroup,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A radio group component for selecting one option from multiple choices.\n\n**Theming classes applied:**\n\n**Group:**\n- `grid` -> Display as grid.\n- `gap-3` -> Gap between items.\n\n**Item:**\n- `border-input` -> Input border color.\n- `text-primary` -> Primary text color.\n- `focus-visible:border-ring` -> Ring border on focus.\n- `focus-visible:ring-ring/50` -> 50% opacity ring on focus.\n- `aria-invalid:ring-destructive/20` -> 20% opacity destructive ring when invalid.\n- `dark:aria-invalid:ring-destructive/40` -> 40% opacity destructive ring in dark mode when invalid.\n- `aria-invalid:border-destructive` -> Destructive border when invalid.\n- `dark:bg-input/30` -> 30% opacity input background in dark mode.\n- `aspect-square` -> Square aspect ratio.\n- `size-4` -> Size 16px.\n- `shrink-0` -> Prevents shrinking.\n- `rounded-full` -> Full border radius.\n- `border` -> Border.\n- `shadow-xs` -> Extra small shadow.\n- `transition-[color,box-shadow]` -> Transitions color and box-shadow.\n- `outline-none` -> No outline.\n- `focus-visible:ring-[3px]` -> 3px ring on focus.\n- `disabled:cursor-not-allowed` -> Not allowed cursor when disabled.\n- `disabled:opacity-50` -> 50% opacity when disabled.\n\n**Indicator:**\n- `relative` -> Relative positioning.\n- `flex` -> Display flex.\n- `items-center` -> Centers items vertically.\n- `justify-center` -> Centers items horizontally.\n\n**Icon:**\n- `fill-primary` -> Primary fill color.\n- `absolute` -> Absolute positioning.\n- `top-1/2` -> Top 50%.\n- `left-1/2` -> Left 50%.\n- `size-2` -> Size 8px.\n- `-translate-x-1/2` -> Translate X -50%.\n- `-translate-y-1/2` -> Translate Y -50%.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: 'option1',
		children: (
			<>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option1" id="r1" />
					<Label htmlFor="r1">Option 1</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option2" id="r2" />
					<Label htmlFor="r2">Option 2</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="option3" id="r3" />
					<Label htmlFor="r3">Option 3</Label>
				</div>
			</>
		),
	},
};
