import { cn } from '@/lib/utils';
import { H1, H2 } from './typography';
import { Button } from './ui/button';

interface NotFoundProps {
	onGoHome?: () => void;
}

export function NotFound({
	className,
	onGoHome,
}: NotFoundProps & React.ComponentPropsWithRef<'main'>) {
	return (
		<main className={cn('max-w-lg grid grid-rows gap-2', className)}>
			<H1>404 - Page Not Found</H1>
			<H2>Sorry, the page you are looking for does not exist.</H2>

			<Button onClick={onGoHome}>Go Home</Button>
		</main>
	);
}
