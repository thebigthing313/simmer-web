'use client';

import { CheckCircle, ClipboardPaste, EraserIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '../ui/input-group';
import { Spinner } from '../ui/spinner';

interface TextInputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	showSpinner?: boolean;
	ref?: React.Ref<HTMLInputElement>;
	showValid?: boolean;
	showPaste?: boolean;
	showClear?: boolean;
	className?: string;
}
export function TextInput({
	className,
	ref,
	showSpinner = false,
	showPaste = false,
	showClear = false,
	showValid = false,
	...props
}: TextInputProps) {
	function handlePaste() {
		try {
			navigator.clipboard.readText().then((text) => {
				props.onChange?.({
					target: { value: text },
				} as React.ChangeEvent<HTMLInputElement>);
			});
		} catch {
			toast.warning(
				'Failed to paste from clipboard. Please check clipboard permissions.',
			);
		}
	}

	return (
		<InputGroup className={className}>
			<InputGroupInput type="text" ref={ref} {...props} />
			<InputGroupAddon align="inline-end">
				{showSpinner && <Spinner />}
				{showPaste && (
					<InputGroupButton
						variant="ghost"
						size="icon-sm"
						onClick={handlePaste}
						aria-label="Paste from clipboard"
					>
						<ClipboardPaste />
					</InputGroupButton>
				)}
				{showClear && (
					<InputGroupButton
						variant="ghost"
						size="icon-sm"
						onClick={() =>
							props.onChange?.({
								target: { value: '' },
							} as React.ChangeEvent<HTMLInputElement>)
						}
						aria-label="Clear input"
					>
						<EraserIcon />
					</InputGroupButton>
				)}
				{showValid && <CheckCircle />}
			</InputGroupAddon>
		</InputGroup>
	);
}
