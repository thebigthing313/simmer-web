import { AlertTriangle, Home } from 'lucide-react';
import { H1, H2, P } from './typography';
import { Button } from './ui/button';

interface RootErrorComponentProps {
	error: Error;
	isDevelopment?: boolean;
	onGoHome?: () => void;
}

export function RootErrorComponent({
	error,
	isDevelopment,
	onGoHome,
}: RootErrorComponentProps) {
	const errorMessage = error.message;

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-background">
			<div className="max-w-xl w-full p-8 space-y-6 bg-card text-card-foreground rounded-lg shadow-2xl border border-destructive/50">
				<div className="flex items-center space-x-4">
					<AlertTriangle className="w-8 h-8 text-destructive" />
					<H1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-destructive">
						Application Error
					</H1>
				</div>
				<hr className="border-border" />

				<P className="text-muted-foreground">
					We're sorry, but an unexpected error occurred while loading the page.
					The issue has been logged.
				</P>

				{isDevelopment && (
					<div className="space-y-4 pt-4 border-t border-border">
						<H2 className="text-xl font-semibold text-foreground">
							Debugging Information
						</H2>

						<div className="p-4 rounded-md border border-destructive/80 bg-destructive/10">
							<span className="font-bold block mb-1">Error Message:</span>
							<P className="font-mono text-sm text-accent-foreground">
								{errorMessage}
							</P>
						</div>

						{error.stack && (
							<details className="text-sm text-muted-foreground">
								<summary className="cursor-pointer font-medium text-primary hover:text-primary/80 transition-colors">
									View Stack Trace
								</summary>
								<pre className="mt-2 p-3 bg-secondary rounded-md overflow-auto text-xs text-secondary-foreground whitespace-pre-wrap">
									{error.stack}
								</pre>
							</details>
						)}
					</div>
				)}

				<div className="mt-8">
					<Button variant="link" asChild onClick={onGoHome}>
						<span>
							<Home className="w-4 h-4" />
							Go to Homepage
						</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
