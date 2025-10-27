import type React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TextInput } from './text-input';

interface AvatarInputProps {
	className?: string;
}

export function AvatarInput({
	className,
	onChange,
	ref,
	...props
}: AvatarInputProps &
	Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'accept' | 'className'>) {
	const [preview, setPreview] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => setPreview(reader.result as string);
			reader.readAsDataURL(file);
		} else {
			setPreview(null);
		}
		onChange?.(e);
	};

	return (
		<div
			className={cn(
				'flex items-center gap-4 ring-ring ring-1 rounded-md p-4',
				className,
			)}
		>
			<img
				src={preview || '/placeholder-img.png'}
				alt="Avatar preview"
				className="w-16 h-16 object-cover shrink-0"
			/>
			<div className="flex-1">
				<h3 className="text-sm font-medium">Image Upload</h3>
				<p className="text-sm text-muted-foreground mb-2">
					Please select a square image. Max 3MB.
				</p>
				<TextInput
					type="file"
					accept="image/*"
					onChange={handleChange}
					showClear
					ref={ref}
					{...props}
				/>
			</div>
		</div>
	);
}
