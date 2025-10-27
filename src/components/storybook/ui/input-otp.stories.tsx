import type { Meta, StoryObj } from '@storybook/react-vite';

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '../../ui/input-otp';

const meta = {
	title: 'UI/InputOTP',
	component: InputOTP,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A one-time password input component with individual slots for each digit.\n\n**Theming classes applied:**\n\n**InputOTP (main wrapper):**\n- `flex` → Uses flexbox layout.\n- `items-center` → Centers items vertically.\n- `gap-2` → Gap between items.\n- `has-disabled:opacity-50` → Reduces opacity when disabled.\n- `disabled:cursor-not-allowed` → Shows not-allowed cursor when disabled.\n\n**InputOTPGroup:**\n- `flex` → Uses flexbox layout.\n- `items-center` → Centers items vertically.\n\n**InputOTPSlot:**\n- `data-[active=true]:border-ring` → Ring border when active.\n- `data-[active=true]:ring-ring/50` → Ring color when active.\n- `data-[active=true]:aria-invalid:ring-destructive/20` → Destructive ring for invalid active state.\n- `dark:data-[active=true]:aria-invalid:ring-destructive/40` → Dark mode destructive ring.\n- `aria-invalid:border-destructive` → Destructive border for invalid state.\n- `data-[active=true]:aria-invalid:border-destructive` → Destructive border when active and invalid.\n- `dark:bg-input/30` → Background with transparency in dark mode.\n- `border-input` → Input-themed border.\n- `relative` → Establishes positioning context.\n- `flex` → Uses flexbox layout.\n- `h-9` → Sets height to 2.25rem.\n- `w-9` → Sets width to 2.25rem.\n- `items-center` → Centers items vertically.\n- `justify-center` → Centers items horizontally.\n- `border-y` → Adds top and bottom borders.\n- `border-r` → Adds right border.\n- `text-sm` → Small text size.\n- `shadow-xs` → Applies small shadow.\n- `transition-all` → Smooth transitions for all properties.\n- `outline-none` → Removes default outline.\n- `first:rounded-l-md` → Left border radius for first slot.\n- `first:border-l` → Left border for first slot.\n- `last:rounded-r-md` → Right border radius for last slot.\n- `data-[active=true]:z-10` → Higher z-index when active.\n- `data-[active=true]:ring-[3px]` → Ring width when active.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		maxLength: 6,
		children: (
			<>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</>
		),
	},
};

export const WithSeparator: Story = {
	args: {
		maxLength: 6,
		children: (
			<>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
				</InputOTPGroup>
				<InputOTPSeparator />
				<InputOTPGroup>
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</>
		),
	},
};

export const WithPattern: Story = {
	args: {
		maxLength: 6,
		children: (
			<>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'OTP input that only accepts numeric characters.',
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		maxLength: 6,
		disabled: true,
		children: (
			<>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</>
		),
	},
};

export const WithPlaceholder: Story = {
	args: {
		maxLength: 6,
		children: (
			<>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</>
		),
	},
	parameters: {
		docs: {
			description: {
				story: 'OTP input with placeholder characters.',
			},
		},
	},
};
