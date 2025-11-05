import { FormField } from '@/components/blocks/form-field';
import { AvatarInput } from '@/components/inputs/avatar-input';
import { useFieldContext } from './form-context';

interface AvatarFieldProps {
	onClick: () => void;
}
export function AvatarField({
	onClick,
	...props
}: AvatarFieldProps &
	Omit<
		React.ComponentPropsWithRef<typeof FormField>,
		'children' | 'errors' | 'htmlFor' | 'data-invalid'
	>) {
	const field = useFieldContext<string>();
	return (
		<FormField
			data-invalid={!field.state.meta.isValid}
			htmlFor={field.name}
			errors={field.state.meta.errors}
			{...props}
		>
			<AvatarInput
				id={field.name}
				value={field.state.value}
				onClick={onClick}
				aria-invalid={!field.state.meta.isValid}
			/>
		</FormField>
	);
}
