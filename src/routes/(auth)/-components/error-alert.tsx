import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'

interface ErrorAlertProps {
  errorTitle: string
  errorMsg: string
}

export function ErrorAlert({ errorTitle, errorMsg }: ErrorAlertProps) {
  return (
    <Alert className="mb-2" variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{errorTitle}</AlertTitle>
      <AlertDescription>{errorMsg}</AlertDescription>
    </Alert>
  )
}
