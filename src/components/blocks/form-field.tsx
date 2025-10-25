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
	className?: string;
	errors?: Array<{ message?: string | undefined } | undefined>;
	children?: React.ReactNode;
}
export function FormField({
	label,
	description,
	className,
	children,
	errors,
}: FormFieldProps) {
	return (
		<Field orientation="responsive" className={className}>
			{label && description ? (
				<FieldContent>
					<FieldLabel>{label}</FieldLabel>
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
