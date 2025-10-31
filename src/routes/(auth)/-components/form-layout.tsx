import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormLayoutProps {
	title: string;
	description?: string;
	className?: string;
}
export function FormLayout({
	className,
	title,
	description,
	children,
	...props
}: FormLayoutProps & React.ComponentPropsWithRef<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{title}</CardTitle>
					{description && <CardDescription>{description}</CardDescription>}
				</CardHeader>
				<CardContent {...props}>{children}</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				TODO: PRIVACY POLICY AND TERMS OF SERVICE LINKS AND COPYRIGHT
			</div>
		</div>
	);
}
