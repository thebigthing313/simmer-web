import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';

import { StylableTextAreaInput } from '../inputs/stylable-text-area-input';

const meta = {
	title: 'Inputs/StylableTextAreaInput',
	component: StylableTextAreaInput,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof StylableTextAreaInput>;

export default meta;

export const Default = () => {
	const [value, setValue] = useState('');

	return (
		<div className="space-y-4">
			<StylableTextAreaInput
				className="w-96 h-32"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<div className="p-4 bg-gray-100 rounded border">
				<h3 className="font-semibold mb-2">Raw HTML Output:</h3>
				<pre className="text-sm whitespace-pre-wrap">
					{value || 'No content yet'}
				</pre>
			</div>
		</div>
	);
};
