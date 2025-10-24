import { AlertCircleIcon } from "lucide-react";
import { Typography } from "../typography";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface FormErrorAlertProps {
  errors: Array<{ message?: string } | undefined>;
}
export function FormErrorAlert({ errors }: FormErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to Submit Form</AlertTitle>
      <AlertDescription>
        <Typography tag="p">
          Please fix the errors in the form and try again.
        </Typography>
        <Typography tag="ul" className="list-inside list-disc text-sm">
          {errors.map((error, index) => (
            <li key={index}>{error?.message}</li>
          ))}
        </Typography>
      </AlertDescription>
    </Alert>
  );
}
