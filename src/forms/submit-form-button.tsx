import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useFormContext } from './form-context';

interface SubmitFormButtonProps {
	label?: string;
}
export function SubmitFormButton({
	label = 'Submit',
	ref,
	...props
}: SubmitFormButtonProps & React.ComponentPropsWithRef<'button'>) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					ref={ref}
					type="submit"
					variant="default"
					aria-busy={isSubmitting}
					disabled={isSubmitting}
					{...props}
				>
					<span>
						{label}
						{isSubmitting && <Spinner />}
					</span>
				</Button>
			)}
		</form.Subscribe>
	);
}
