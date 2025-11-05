import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { AvatarField } from './avatar-field';
import { PasswordField } from './password-field';
import { ResetFormButton } from './reset-form-button';
import { StyledTextField } from './styled-text-field';
import { SubmitFormButton } from './submit-form-button';
import { TextField } from './text-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm, withFieldGroup } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: { TextField, PasswordField, StyledTextField, AvatarField },
	formComponents: { SubmitFormButton, ResetFormButton },
});
