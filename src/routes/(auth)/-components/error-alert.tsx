import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorAlertProps {
	errorTitle: string;
	errorMsg: string;
}

export function ErrorAlert({ errorTitle, errorMsg }: ErrorAlertProps) {
	return (
		<Alert className="mb-2" variant="destructive">
			<AlertCircleIcon />
			<AlertTitle>{errorTitle}</AlertTitle>
			<AlertDescription>{errorMsg}</AlertDescription>
		</Alert>
	);
}
