import type { ButtonHTMLAttributes, Ref } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface SubmitButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	label?: string;
	isLoading?: boolean;
	className?: string;
	ref?: Ref<HTMLButtonElement>;
}

export function SubmitButton({
	label,
	isLoading,
	children,
	ref,
	className,
	...props
}: SubmitButtonProps) {
	return (
		<Button
			key={props.id}
			ref={ref}
			type="submit"
			variant="default"
			aria-busy={isLoading || props['aria-busy']}
			disabled={isLoading || props.disabled}
			{...props}
			className={className}
		>
			{children}
			{isLoading ? <Spinner /> : label}
		</Button>
	);
}
