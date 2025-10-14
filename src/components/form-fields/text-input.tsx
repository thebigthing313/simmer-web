import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { InputHTMLAttributes, Ref } from 'react'
import { Spinner } from '@/components/ui/spinner'

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  errors?: Array<{ message?: string } | undefined>
  ref?: Ref<HTMLInputElement>
  isValid?: boolean
  isLoading?: boolean
  className?: string
}

export function TextInput({
  label,
  description,
  errors,
  className,
  isValid = true,
  isLoading,
  ref,
  ...props
}: TextInputProps) {
  return (
    <Field data-invalid={!isValid} className={className}>
      <FieldContent>
        <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>

      <InputGroup>
        <InputGroupInput
          type="text"
          aria-invalid={!isValid}
          ref={ref}
          {...props}
        />
        {isLoading && (
          <InputGroupAddon align="inline-end">
            <Spinner />
          </InputGroupAddon>
        )}
      </InputGroup>
      {errors && <FieldError errors={errors} />}
    </Field>
  )
}
