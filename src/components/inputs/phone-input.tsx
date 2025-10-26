import 'flag-icons/css/flag-icons.min.css';
import {
	AsYouType,
	type CountryCode,
	getCountries,
	isSupportedCountry,
	type PhoneNumber,
	parsePhoneNumber,
} from 'libphonenumber-js/min';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '../ui/command';
import { Input } from '../ui/input';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '../ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface PhoneInputProps {
	value?: PhoneNumber;
	onChange?: (value: PhoneNumber | undefined) => void;
	className?: string;
	showExt?: boolean;
}

const validCodes = getCountries();

function getCountryCode(): CountryCode {
	const locale = new Intl.NumberFormat().resolvedOptions().locale;
	const parts = locale.split('-');
	const potentialCode = (parts[1] || parts[0]).toUpperCase();
	return validCodes.includes(potentialCode as CountryCode)
		? (potentialCode as CountryCode)
		: 'US';
}

export function PhoneInput({
	value,
	onChange,
	className,
	showExt = true,
}: PhoneInputProps) {
	const [countryCode, setCountryCode] = React.useState<CountryCode>(
		getCountryCode(),
	);

	const [rawPhone, setRawPhone] = React.useState('');
	const [displayPhone, setDisplayPhone] = React.useState('');
	const [ext, setExt] = React.useState('');
	const [isValid, setIsValid] = React.useState(true);

	React.useEffect(() => {
		if (value) {
			setRawPhone(value.nationalNumber);
			setExt(value.ext || '');
		}
	}, [value]);

	React.useEffect(() => {
		const formatter = new AsYouType(countryCode);
		setDisplayPhone(formatter.input(rawPhone));
	}, [rawPhone, countryCode]);

	const handleBlur = () => {
		if (!rawPhone.trim()) {
			onChange?.(undefined);
			setIsValid(true);
			return;
		}
		try {
			const fullText = ext ? `${rawPhone};${ext}` : rawPhone;
			const parsed = parsePhoneNumber(fullText, countryCode);
			onChange?.(parsed);
			setIsValid(true);
		} catch {
			onChange?.(undefined);
			setIsValid(false);
		}
	};

	return (
		<div className={cn('flex gap-2', className)}>
			<ButtonGroup>
				<FlagButton onSelect={setCountryCode} currentCode={countryCode} />
				<Input
					type="text"
					value={displayPhone}
					onChange={(e) => setRawPhone(e.target.value.replace(/\D/g, ''))}
					onBlur={handleBlur}
					aria-invalid={!isValid}
				/>
			</ButtonGroup>
			{showExt && (
				<InputGroup className="w-[120px]">
					<InputGroupAddon align="inline-start">ext.</InputGroupAddon>
					<InputGroupInput
						type="text"
						value={ext}
						onChange={(e) => setExt(e.target.value)}
						onBlur={handleBlur}
					/>
				</InputGroup>
			)}
		</div>
	);
}

interface ButtonImageProps {
	countryCode?: string;
	className?: string;
}

function ButtonImage({ countryCode, className }: ButtonImageProps) {
	if (!countryCode) {
		return <span className={className}>--</span>;
	}
	if (isSupportedCountry(countryCode)) {
		return (
			<span className={cn(`fi fi-${countryCode.toLowerCase()}`, className)} />
		);
	} else {
		return <span className={className}>{countryCode.toUpperCase()}</span>;
	}
}

interface FlagButtonProps {
	onSelect: (code: CountryCode) => void;
	currentCode: CountryCode;
}

function FlagButton({ onSelect, currentCode }: FlagButtonProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" size="icon">
					<ButtonImage className="p-1" countryCode={currentCode} />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-[150px]">
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandEmpty>None found.</CommandEmpty>
					<CommandGroup
						className="max-h-64 overflow-y-auto"
						heading="Country Codes"
					>
						{validCodes.map((code) => (
							<CommandItem
								key={code}
								value={code}
								onSelect={(currentValue) => {
									onSelect(currentValue as CountryCode);
									setOpen(false);
								}}
							>
								{code}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
