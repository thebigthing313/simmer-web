import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormLayoutProps {
	showReturnToLogin?: boolean;
	className?: string;
}
export function FormLayout({
	className,
	children,
	showReturnToLogin,
	...props
}: FormLayoutProps & React.ComponentPropsWithRef<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)}>
			<Card>
				<CardContent {...props}>
					{showReturnToLogin && (
						<div className="flex w-full justify-end">
							<Link to="/login">
								<span className="flex flex-row items-center text-xs mb-2">
									<ChevronLeft size={12} /> Return To Login
								</span>
							</Link>
						</div>
					)}

					{children}
				</CardContent>
			</Card>

			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				TODO: PRIVACY POLICY AND TERMS OF SERVICE LINKS AND COPYRIGHT
			</div>
		</div>
	);
}
