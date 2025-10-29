import { parsePhoneNumberFromString } from 'libphonenumber-js';
import z from 'zod';
import { GeoJSONSchema } from 'zod-geojson';

export const EmailSchema = z.email('Invalid email address');

export const AddressSchema = z
	.string()
	.min(5, 'Address must be at least five characters long')
	.max(255, 'Address cannot exceed 255 characters');

export const NameSchema = z
	.string()
	.min(2, 'Name must be at least two characters long')
	.max(50, 'Name cannot exceed 50 characters');

export const PasswordSchema = z
	.string()
	.min(6, 'Password must be at least 6 characters')
	.max(32, 'Password cannot exceed 32 characters')
	.refine((password) => /[A-Z]/.test(password), {
		message: 'Password must contain at least one uppercase letter',
	})
	.refine((password) => /[a-z]/.test(password), {
		message: 'Password must contain at least one lowercase letter',
	})
	.refine((password) => /[0-9]/.test(password), {
		message: 'Password must contain at least one number',
	})
	.refine((password) => /[!@#$%^&*]/.test(password), {
		message: 'Password must contain at least one special character',
	});

export const RedirectSchema = z.string();

export const GroupNameSchema = z
	.string()
	.min(2, 'Group name must be at least two characters long');

export const PhoneNumberSchema = z
	.string()
	.min(1, 'Phone number is required')
	.refine(
		(raw) => {
			if (!raw) return false;
			const trimmed = raw.trim();

			try {
				const parsed = parsePhoneNumberFromString(trimmed);
				return parsed ? parsed.isPossible() : false;
			} catch {
				return false;
			}
		},
		{ message: 'Invalid phone number' },
	)
	.transform((v) => v.trim());

export const URLSchema = z.url();

// Re-export GeoJSONSchema from zod-geojson for use in generated schemas
export { GeoJSONSchema };
