import type { Ref } from 'react'
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
import { Spinner } from '@/components/ui/spinner'
import { HomeIcon, SearchIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'

interface AddressInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  errors?: Array<{ message?: string } | undefined>
  ref?: Ref<HTMLInputElement>
  isValid?: boolean
  isLoading?: boolean
  className?: string
}

function onGeocode() {
  toast.info('Geocoding is not implemented yet.')
}

export function AddressInput({
  label,
  description,
  errors,
  isValid = true,
  isLoading,
  className,
  ref,
  ...props
}: AddressInputProps) {
  return (
    <Field data-invalid={!isValid} className={className}>
      <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <HomeIcon />
        </InputGroupAddon>
        <InputGroupInput
          {...props}
          type="text"
          aria-invalid={!isValid}
          ref={ref}
        />
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger onClick={onGeocode}>
              <SearchIcon />
            </TooltipTrigger>
            <TooltipContent>Geocode</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
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
