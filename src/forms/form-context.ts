import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { PasswordField } from './password-field';
import { SubmitFormButton } from './submit-form-button';
import { TextField } from './text-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withFieldGroup } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: { TextField, PasswordField },
	formComponents: { SubmitFormButton },
});
