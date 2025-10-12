import z from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const EmailSchema = z.email('Invalid email address');

export const NameSchema = z.string().min(2, 'Name must be at least two characters long').max(50, 'Name cannot exceed 50 characters');
export const PasswordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(32, 'Password cannot exceed 32 characters')
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter'
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter'
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain at least one number'
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must contain at least one special character'
  });

export const RedirectSchema = z.string();

export const GroupNameSchema = z.string().min(2, 'Group name must be at least two characters long');

// Phone number schema: accepts strings optionally suffixed with an extension in the
// form "x123" (e.g. +15551234567x123). We strip a trailing 'x' followed by digits
// before validating with libphonenumber-js's isPossible check.
export const PhoneNumberSchema = z
  .string()
  .min(1, 'Phone number is required')
  .refine(
    (raw) => {
      if (!raw) return false;
      // Strip whitespace
      const trimmed = raw.trim();

      // Remove extension in the format x123 (case-insensitive 'x') at the end
      const withoutExt = trimmed.replace(/x\d+$/i, '');

      // parsePhoneNumberFromString returns undefined on failure
      try {
        const parsed = parsePhoneNumberFromString(withoutExt);
        return parsed ? parsed.isPossible() : false;
      } catch (e) {
        return false;
      }
    },
    { message: 'Invalid or impossible phone number' }
  )
  .transform((v) => v.trim());
