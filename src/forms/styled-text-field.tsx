import { FormField } from '@/components/blocks/form-field';
import { StylableTextAreaInput } from '@/components/inputs/stylable-text-area-input';
import { useFieldContext } from './form-context';

export function StyledTextField({
	...props
}: Omit<
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
			<StylableTextAreaInput
				id={field.name}
				value={field.state.value ?? ''}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				aria-invalid={!field.state.meta.isValid}
			/>
		</FormField>
	);
}
