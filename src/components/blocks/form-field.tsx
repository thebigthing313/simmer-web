import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from '../ui/field';

interface FormFieldProps {
	label?: string;
	description?: string;
	htmlFor?: string;
	errors?: Array<{ message?: string | undefined } | undefined>;
}

export function FormField({
	label,
	description,
	htmlFor,
	className,
	children,
	ref,
	errors,
	...props
}: FormFieldProps & React.ComponentPropsWithRef<'div'>) {
	return (
		<Field orientation="responsive" className={className} ref={ref} {...props}>
			{label && description ? (
				<FieldContent>
					<FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
					<FieldDescription>{description}</FieldDescription>
				</FieldContent>
			) : (
				<>
					{label && <FieldLabel>{label}</FieldLabel>}
					{description && <FieldDescription>{description}</FieldDescription>}
				</>
			)}
			{children}
			<FieldError errors={errors} />
		</Field>
	);
}
