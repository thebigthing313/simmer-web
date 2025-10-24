import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { forgotPassword } from "@/db/auth/forgot-password";
import { ErrorAlert } from "./-components/error-alert";
import { ForgotPasswordForm } from "./-components/forgot-password-form";

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      await forgotPassword(email);
    },
    onError: (error: Error) => {
      setErrorMsg(error.message);
    },
    onSuccess: () => {
      toast.success("Recovery email has been sent.");
    },
  });

  return (
    <>
      {errorMsg && (
        <ErrorAlert errorTitle="Forgot Password Error" errorMsg={errorMsg} />
      )}
      <ForgotPasswordForm
        handleSubmit={(email: string) => forgotPasswordMutation.mutate(email)}
      />
    </>
  );
}
