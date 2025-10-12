import type { InputHTMLAttributes, Ref } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'
import { EyeIcon } from 'lucide-react'

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  errors?: ({ message?: string } | undefined)[]
  ref?: Ref<HTMLInputElement>
  className?: string
}

export function PasswordInput({
  label = 'Password',
  description,
  errors,
  className,
  ref,
  ...inputProps
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  // Safety: if pointerup happens outside the button (drag off), ensure we hide the password.
  useEffect(() => {
    function onUp() {
      setVisible(false)
    }

    if (visible) {
      window.addEventListener('pointerup', onUp)
      window.addEventListener('keyup', onUp)
    }
    return () => {
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('keyup', onUp)
    }
  }, [visible])

  // Keyboard handlers: show while Space or Enter is held down on the button
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault()
      setVisible(true)
    }
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      e.preventDefault()
      setVisible(false)
    }
  }

  return (
    <Field data-invalid={errors && errors.length > 0} className={className}>
      <FieldLabel>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <InputGroup>
        <InputGroupInput
          type={visible ? 'text' : 'password'}
          aria-invalid={errors && errors.length > 0}
          ref={ref}
          {...inputProps}
        />
        <InputGroupAddon align="inline-end">
          <Button
            ref={btnRef}
            variant="ghost"
            size="icon-sm"
            type="button"
            aria-label="Show password (hold)"
            onPointerDown={() => setVisible(true)}
            onPointerUp={() => setVisible(false)}
            onPointerCancel={() => setVisible(false)}
            onPointerLeave={() => setVisible(false)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          >
            <EyeIcon />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      {errors && <FieldError errors={errors} />}
    </Field>
  )
}
