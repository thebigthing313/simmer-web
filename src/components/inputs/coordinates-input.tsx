import { ClipboardCopy, ClipboardPaste } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import type { Coordinates } from '@/lib/types';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface CoordinatesInputProps {
	value: Coordinates;
	// mapRef: React.Ref<>;  // Uncomment and define the type once I have map reference
	onChange?: (coords: Coordinates) => void;
}

type LatState = { value: string; cardinal: 'N' | 'S'; invalid: boolean };
type LngState = { value: string; cardinal: 'E' | 'W'; invalid: boolean };

export function CoordinatesInput({
	value,
	// mapRef,
	onChange,
}: CoordinatesInputProps) {
	const [lat, setLat] = React.useState<LatState>({ value: '', cardinal: 'N', invalid: false });
	const [lng, setLng] = React.useState<LngState>({ value: '', cardinal: 'E', invalid: false });

	React.useEffect(() => {
		setLat({
			value: Math.abs(value.latitude).toString(),
			cardinal: value.latitude >= 0 ? 'N' : 'S',
			invalid: false,
		});
		setLng({
			value: Math.abs(value.longitude).toString(),
			cardinal: value.longitude >= 0 ? 'E' : 'W',
			invalid: false,
		});
	}, [value]);

	const parseDMS = (dms: string, type: 'lat' | 'lng'): number | null => {
		const regex =
			/^(-?\d+(?:\.\d+)?)\s*°?\s*(\d+(?:\.\d+)?)\s*'?\s*(\d+(?:\.\d+)?)\s*"?\s*([NSEW])$/i;
		const match = dms.trim().match(regex);
		if (match) {
			const degrees = parseFloat(match[1]);
			const minutes = parseFloat(match[2]);
			const seconds = parseFloat(match[3]);
			const dir = match[4].toUpperCase();
			if (type === 'lat' && !['N', 'S'].includes(dir)) return null;
			if (type === 'lng' && !['E', 'W'].includes(dir)) return null;
			let decimal = degrees + minutes / 60 + seconds / 3600;
			if (dir === 'S' || dir === 'W') decimal = -decimal;
			return decimal;
		}
		return null;
	};

	const updateCoord = (type: 'lat' | 'lng', num: number) => {
		const newCardinal = num >= 0 ? (type === 'lat' ? 'N' : 'E') : (type === 'lat' ? 'S' : 'W');
		const absStr = Math.abs(num).toString();
		if (type === 'lat') {
			setLat({ value: absStr, cardinal: newCardinal as 'N' | 'S', invalid: false });
		} else {
			setLng({ value: absStr, cardinal: newCardinal as 'E' | 'W', invalid: false });
		}
		const signedLat = type === 'lat' ? (newCardinal === 'S' ? -Math.abs(num) : Math.abs(num)) : (lat.cardinal === 'S' ? -Math.abs(parseFloat(lat.value)) : Math.abs(parseFloat(lat.value)));
		const signedLng = type === 'lng' ? (newCardinal === 'W' ? -Math.abs(num) : Math.abs(num)) : (lng.cardinal === 'W' ? -Math.abs(parseFloat(lng.value)) : Math.abs(parseFloat(lng.value)));
		onChange?.({ latitude: signedLat, longitude: signedLng });
	};

	const handleBlur = (type: 'lat' | 'lng') => {
		const current = type === 'lat' ? lat : lng;
		const trimmed = current.value.trim();
		if (trimmed === '') {
			if (type === 'lat') setLat(prev => ({ ...prev, invalid: true }));
			else setLng(prev => ({ ...prev, invalid: true }));
			return;
		}
		let num: number | null = parseDMS(trimmed, type);
		if (num === null) num = parseFloat(trimmed);
		const max = type === 'lat' ? 90 : 180;
		if (num === null || Number.isNaN(num) || num < -max || num > max) {
			if (type === 'lat') setLat(prev => ({ ...prev, invalid: true }));
			else setLng(prev => ({ ...prev, invalid: true }));
			return;
		}
		updateCoord(type, num);
	};

	const handleLatBlur = () => handleBlur('lat');
	const handleLngBlur = () => handleBlur('lng');

	const handleChange = (type: 'lat' | 'lng', value: string) => {
		if (type === 'lat') setLat(prev => ({ ...prev, value }));
		else setLng(prev => ({ ...prev, value }));
	};

	const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => handleChange('lat', e.target.value);
	const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => handleChange('lng', e.target.value);

	const handlePasteIntoInput = (e: React.ClipboardEvent<HTMLInputElement>, type: 'lat' | 'lng') => {
		e.preventDefault();
		const pasted = e.clipboardData.getData('text').trim();
		let num: number | null = parseDMS(pasted, type);
		if (num === null) num = parseFloat(pasted);
		const max = type === 'lat' ? 90 : 180;
		if (num !== null && !Number.isNaN(num) && num >= -max && num <= max) {
			updateCoord(type, num);
		} else {
			handleChange(type, pasted);
		}
	};

	const handlePaste = async () => {
		try {
			const text = await navigator.clipboard.readText();
			const parts = text
				.split(/[,\s]+/)
				.map((p) => p.trim())
				.filter((p) => p);
			if (parts.length >= 2) {
				const latStr = parts[0];
				const lngStr = parts[1];
				let lat: number | null = parseDMS(latStr, 'lat');
				if (lat === null) lat = parseFloat(latStr);
				let lng: number | null = parseDMS(lngStr, 'lng');
				if (lng === null) lng = parseFloat(lngStr);
				if (
					lat !== null &&
					!Number.isNaN(lat) &&
					lat >= -90 &&
					lat <= 90 &&
					lng !== null &&
					!Number.isNaN(lng) &&
					lng >= -180 &&
					lng <= 180
				) {
					setLat({ value: Math.abs(lat).toString(), cardinal: lat >= 0 ? 'N' : 'S', invalid: false });
					setLng({ value: Math.abs(lng).toString(), cardinal: lng >= 0 ? 'E' : 'W', invalid: false });
					onChange?.({ latitude: lat, longitude: lng });
					toast.success('Coordinates pasted from clipboard');
				} else {
					toast.error('Invalid coordinates format in clipboard');
				}
			} else {
				toast.error('Invalid coordinates format in clipboard');
			}
		} catch (error) {
			console.error('Failed to paste from clipboard:', error);
			toast.error('Failed to read from clipboard');
		}
	};

	const handleCopy = async () => {
		try {
			const latVal = lat.cardinal === 'S' ? -parseFloat(lat.value) : parseFloat(lat.value);
			const lngVal = lng.cardinal === 'W' ? -parseFloat(lng.value) : parseFloat(lng.value);
			if (!Number.isNaN(latVal) && !Number.isNaN(lngVal)) {
				await navigator.clipboard.writeText(`${latVal}, ${lngVal}`);
				toast.success('Coordinates copied to clipboard');
			}
		} catch (error) {
			console.error('Failed to copy to clipboard:', error);
			toast.error('Failed to copy to clipboard');
		}
	};

	return (
		<div className="grid grid-cols-2 grid-rows-2 gap-2">
			<ButtonGroup>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setLat(prev => ({ ...prev, cardinal: prev.cardinal === 'N' ? 'S' : 'N' }))}
				>
					{lat.cardinal}
				</Button>
				<Input
					type="text"
					inputMode="decimal"
					placeholder="Latitude"
					value={lat.value}
					onChange={handleLatChange}
					onBlur={handleLatBlur}
					onPaste={(e) => handlePasteIntoInput(e, 'lat')}
					aria-invalid={lat.invalid}
				/>
			</ButtonGroup>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="outline" size="icon" onClick={handlePaste}>
						<ClipboardPaste />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Paste from Clipboard</TooltipContent>
			</Tooltip>
			<ButtonGroup>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setLng(prev => ({ ...prev, cardinal: prev.cardinal === 'E' ? 'W' : 'E' }))}
				>
					{lng.cardinal}
				</Button>
				<Input
					type="text"
					inputMode="decimal"
					placeholder="Longitude"
					value={lng.value}
					onChange={handleLngChange}
					onBlur={handleLngBlur}
					onPaste={(e) => handlePasteIntoInput(e, 'lng')}
					aria-invalid={lng.invalid}
				/>
			</ButtonGroup>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="outline" size="icon" onClick={handleCopy}>
						<ClipboardCopy />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Copy to Clipboard</TooltipContent>
			</Tooltip>
		</div>
	);
}
