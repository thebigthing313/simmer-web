import { useState, useEffect } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  getCountries,
  AsYouType,
  parsePhoneNumberFromString,
  getCountryCallingCode,
} from 'libphonenumber-js/min'
import { CountryCode } from 'libphonenumber-js'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
  CommandInput,
} from '@/components/ui/command'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'

const countries = getCountries()

// Intl helper for country names; fallback to code
function getCountryName(code: string): string {
  try {
    // runtime-only access to Intl.DisplayNames to avoid typing issues
    const IntlAny = Intl as unknown as { DisplayNames?: any }
    if (IntlAny.DisplayNames) {
      const dn = new IntlAny.DisplayNames(['en'], { type: 'region' })
      return dn.of(code) || code
    }
    return code
  } catch {
    return code
  }
}

interface PhoneInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  /** stored phone value (E.164) with optional extension separated by `x`, e.g. +17325490665x12 - when provided, component is controlled */
  value?: string | null
  label?: string
  description?: string
  errors?: ({ message?: string } | undefined)[]
  /** called with the stored value (E.164 + optional `x` + ext) whenever user changes input */
  onChange?: (stored: string) => void
  className?: string
}

export function PhoneInput({
  label = 'Phone',
  className,
  value,
  description,
  errors,
  onChange,
  ...props
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState('')
  // internal stored value used only when uncontrolled (E.164 + optional x + ext)
  const [internalStored, setInternalStored] = useState('')
  // extension only (digits)
  const [internalExt, setInternalExt] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US')

  const isControlled = value !== undefined

  // derive the source stored value depending on controlled/uncontrolled mode
  const currentStored = isControlled ? value! : internalStored

  // parse stored into E.164 and extension
  function splitStored(stored: string | undefined) {
    if (!stored) return { e164: '', ext: '' }
    // split on x or ext (case-insensitive)
    const parts = stored.split(/(?:x|ext\.?)/i)
    const e164 = (parts[0] || '').trim()
    const ext = (parts[1] || '').trim()
    return { e164, ext }
  }

  // keep displayValue and extension in sync when the stored value changes
  // Parse the stored value (E.164 or local) and set selected country when possible.
  // Update display and ext when the stored value changes, but don't mutate/canonicalize stored here.
  useEffect(() => {
    const { e164, ext } = splitStored(currentStored)
    setInternalExt(ext || '')

    try {
      if (e164) {
        const parsed = e164.startsWith('+')
          ? parsePhoneNumberFromString(e164)
          : parsePhoneNumberFromString(e164, 'US')

        if (parsed) {
          setDisplayValue(parsed.formatNational())
          // Only overwrite the selected country when the source was canonical E.164
          if (e164.startsWith('+') && parsed.country)
            setSelectedCountry(parsed.country as CountryCode)
          return
        }
      }

      setDisplayValue(new AsYouType(selectedCountry).input(e164 || ''))
    } catch {
      setDisplayValue(e164 || '')
    }
  }, [currentStored, selectedCountry])

  // When the user changes the selected country, reformat the display if we don't have a canonical E.164 value
  useEffect(() => {
    const { e164 } = splitStored(currentStored)
    // only reformat when base isn't an E.164 (starting with +) so we don't override canonical formats
    if (!e164 || !e164.startsWith('+')) {
      try {
        setDisplayValue(new AsYouType(selectedCountry).input(e164 || ''))
      } catch {
        // noop
      }
    }
  }, [selectedCountry, currentStored])

  // When a user explicitly selects a country, reparse the current display and update stored value
  function handleCountrySelect(country: CountryCode) {
    setSelectedCountry(country)

    // no dynamic import here; the trigger uses the CDN-hosted SVG so we don't bundle flag assets

    // If there is any input, attempt to parse it in the context of the newly selected country
    const currentDisplay = displayValue || splitStored(currentStored).e164 || ''
    if (!currentDisplay) return

    try {
      const parsed = parsePhoneNumberFromString(currentDisplay, country)
      if (parsed) {
        const canonical = parsed.number
        setDisplayValue(parsed.formatNational())
        const ext = internalExt || splitStored(currentStored).ext
        const newStored = ext ? `${canonical}x${ext}` : canonical
        if (!isControlled) setInternalStored(newStored)
        if (onChange) onChange(newStored)
        return
      }
    } catch {
      // fallthrough to fallback
    }

    // fallback: reformat using AsYouType and emit digits-only stored value
    try {
      const asYou = new AsYouType(country).input(currentDisplay)
      setDisplayValue(asYou)
    } catch {
      // noop
    }
    const digitsFallback = currentDisplay.replace(/[^+\d]/g, '')
    const ext = internalExt || splitStored(currentStored).ext
    const newStored = ext ? `${digitsFallback}x${ext}` : digitsFallback
    if (!isControlled) setInternalStored(newStored)
    if (onChange) onChange(newStored)
  }

  // no dynamic SVG loading; we use the CDN-hosted SVGs instead

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let typed = e.target.value
    // strip control characters except + and digits and common separators; let AsYouType handle formatting
    // keep printable ASCII characters; remove other control/non-printable chars
    typed = typed.replace(/[^\t\n\r -~]/g, '')
    // raw: best-effort unformatted input (lib will strip formatting)
    // formatted display with selected country
    const newDisplay = new AsYouType(selectedCountry).input(typed)
    setDisplayValue(newDisplay)

    // attempt to parse to E.164
    const parsed = parsePhoneNumberFromString(typed, selectedCountry)
    if (parsed) {
      const canonical = parsed.number
      const ext = internalExt || splitStored(currentStored).ext
      const newStored = ext ? `${canonical}x${ext}` : canonical

      if (!isControlled) setInternalStored(newStored)
      if (onChange) onChange(newStored)
    } else {
      // fallback: keep a digits-only fallback so stored doesn't contain formatting
      const digitsFallback = typed.replace(/[^+\d]/g, '')
      const ext = internalExt || splitStored(currentStored).ext
      const newStored = ext ? `${digitsFallback}x${ext}` : digitsFallback

      if (!isControlled) setInternalStored(newStored)
      if (onChange) onChange(newStored)
    }
  }

  function handleExtChange(e: React.ChangeEvent<HTMLInputElement>) {
    const typed = e.target.value.replace(/[^\d]/g, '')
    setInternalExt(typed)

    const { e164 } = splitStored(currentStored)
    // Determine base canonical number: try to parse current displayed phone first
    const parsed = parsePhoneNumberFromString(displayValue, selectedCountry)
    const base = parsed
      ? parsed.number
      : e164 || displayValue.replace(/[^+\d]/g, '')

    const stored = typed ? `${base}x${typed}` : base
    if (!isControlled) setInternalStored(stored)
    if (onChange) onChange(stored)
  }

  return (
    <Field data-invalid={errors && errors.length > 0} className={className}>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-row flex-wrap items-end gap-2">
        <InputGroup className="flex-1 min-w-0">
          <InputGroupInput
            {...props}
            type="tel"
            value={displayValue}
            onChange={handleInputChange}
          />
          <InputGroupAddon align="inline-start">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  <img
                    src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry}.svg`}
                    alt={getCountryName(selectedCountry)}
                    className="mr-2 inline-block w-6 h-4 object-cover"
                    onError={(e) => {
                      // fallback: hide broken image and show ISO code
                      const el = e.currentTarget as HTMLImageElement
                      el.style.display = 'none'
                    }}
                  />
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-1">
                <Command>
                  <CommandInput placeholder="e.g. US" className="h-9" />
                  <CommandList>
                    <CommandEmpty>Country code not found.</CommandEmpty>
                    {countries.map((country) => {
                      const name = getCountryName(country)
                      const calling = getCountryCallingCode(country)
                      return (
                        <CommandItem
                          key={country}
                          value={country}
                          onSelect={(value) => {
                            handleCountrySelect(value as CountryCode)
                            setOpen(false)
                          }}
                        >
                          <img
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                            alt={name}
                            className="mr-2 inline-block w-6 h-4 object-cover"
                          />
                          {country} — {name} (+{calling})
                        </CommandItem>
                      )
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="w-24">
          <InputGroupAddon align="inline-start">ext.</InputGroupAddon>
          <InputGroupInput value={internalExt} onChange={handleExtChange} />
        </InputGroup>
      </div>

      {description && <FieldDescription>{description}</FieldDescription>}
      {errors && <FieldError errors={errors} />}
    </Field>
  )
}
