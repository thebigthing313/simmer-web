import { MailIcon } from 'lucide-react'
import type { InputHTMLAttributes, Ref } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

interface EmailInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  errors?: ({ message?: string } | undefined)[]
  ref?: Ref<HTMLInputElement>
  className?: string
}

export function EmailInput({
  label = 'Email',
  description,
  errors,
  className,
  ref,
  ...inputProps
}: EmailInputProps) {
  return (
    <Field data-invalid={errors && errors.length > 0} className={className}>
      <FieldLabel>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          type="email"
          aria-invalid={errors && errors.length > 0}
          ref={ref}
          {...inputProps}
        />
        <InputGroupAddon align="inline-start">
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
      {errors && <FieldError errors={errors} />}
    </Field>
  )
}
