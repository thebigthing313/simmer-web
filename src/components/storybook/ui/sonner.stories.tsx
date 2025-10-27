import type { Meta, StoryObj } from '@storybook/react-vite';

import { toast } from 'sonner';
import { Toaster } from '../../ui/sonner';

const meta = {
	title: 'UI/Toaster',
	component: Toaster,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A toaster component using Sonner for notifications.\n\n**Theming classes applied:**\n\n- `toaster` → Custom toaster class.\n- `group` → Group class for styling.\n- `size-4` → Size 16px for icons.\n- `animate-spin` → Spin animation for loading icon.',
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<button
				type="button"
				onClick={() => toast.success('Success message!')}
				className="px-4 py-2 bg-green-500 text-black rounded"
			>
				Show Success Toast
			</button>
			<button
				type="button"
				onClick={() => toast.info('Info message!')}
				className="px-4 py-2 bg-blue-500 text-black rounded"
			>
				Show Info Toast
			</button>
			<button
				type="button"
				onClick={() => toast.warning('Warning message!')}
				className="px-4 py-2 bg-yellow-500 text-black rounded"
			>
				Show Warning Toast
			</button>
			<button
				type="button"
				onClick={() => toast.error('Error message!')}
				className="px-4 py-2 bg-red-500 text-black rounded"
			>
				Show Error Toast
			</button>
			<button
				type="button"
				onClick={() => toast.loading('Loading message!')}
				className="px-4 py-2 bg-gray-500 text-black rounded"
			>
				Show Loading Toast
			</button>
			<Toaster />
		</div>
	),
};

export const Success: Story = {
	render: () => (
		<div>
			<button
				type="button"
				onClick={() => toast.success('Operation completed successfully!')}
				className="px-4 py-2 bg-green-500 text-white rounded"
			>
				Trigger Success Toast
			</button>
			<Toaster />
		</div>
	),
};

export const Info: Story = {
	render: () => (
		<div>
			<button
				type="button"
				onClick={() => toast.info('Here is some information.')}
				className="px-4 py-2 bg-blue-500 text-white rounded"
			>
				Trigger Info Toast
			</button>
			<Toaster />
		</div>
	),
};

export const Warning: Story = {
	render: () => (
		<div>
			<button
				type="button"
				onClick={() => toast.warning('This is a warning!')}
				className="px-4 py-2 bg-yellow-500 text-white rounded"
			>
				Trigger Warning Toast
			</button>
			<Toaster />
		</div>
	),
};

export const ErrorToast: Story = {
	render: () => (
		<div>
			<button
				type="button"
				onClick={() => toast.error('An error occurred!')}
				className="px-4 py-2 bg-red-500 text-white rounded"
			>
				Trigger Error Toast
			</button>
			<Toaster />
		</div>
	),
};

export const Loading: Story = {
	render: () => (
		<div>
			<button
				type="button"
				onClick={() => toast.loading('Processing...')}
				className="px-4 py-2 bg-gray-500 text-white rounded"
			>
				Trigger Loading Toast
			</button>
			<Toaster />
		</div>
	),
};
