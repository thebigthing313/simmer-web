// Auto-generated schema file for groups table
// Generated on: 2025-11-01T22:19:29.147Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodGroupsRow.parse(dataFromSupabase);

import z from 'zod';
import { PhoneNumberSchema } from './fields';

export const ZodGroupsRow = z.object({
	address: z.string(),
	created_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).optional(),
	created_by: z.uuid().nullable().optional(),
	deleted_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable().optional(),
	deleted_by: z.uuid().nullable().optional(),
	fax: z.string().nullable(),
	group_name: z.string(),
	id: z.uuid(),
	logo_url: z.url().nullable(),
	phone: PhoneNumberSchema,
	short_name: z.string(),
	updated_at: z.preprocess((val) => typeof val === "string" ? new Date(val) : val, z.date()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
	website_url: z.url().nullable(),
});

export const ZodGroupsInsert = z.object({
	address: z.string(),
	fax: z.string().nullable().optional(),
	group_name: z.string(),
	id: z.uuid().optional(),
	logo_url: z.url().nullable().optional(),
	phone: PhoneNumberSchema,
	short_name: z.string(),
	website_url: z.url().nullable().optional(),
});

export const ZodGroupsUpdate = ZodGroupsInsert.partial();

// Schemas for converting back to database format (Date -> ISO string)
export const ZodGroupsRowToDb = z.object({
	address: z.string(),
	created_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).optional(),
	created_by: z.uuid().nullable().optional(),
	deleted_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).nullable().optional(),
	deleted_by: z.uuid().nullable().optional(),
	fax: z.string().nullable(),
	group_name: z.string(),
	id: z.uuid(),
	logo_url: z.url().nullable(),
	phone: PhoneNumberSchema,
	short_name: z.string(),
	updated_at: z.preprocess((val) => val instanceof Date ? val.toISOString() : val, z.string()).nullable().optional(),
	updated_by: z.uuid().nullable().optional(),
	website_url: z.url().nullable(),
});

export const ZodGroupsInsertToDb = z.object({
	address: z.string(),
	fax: z.string().nullable().optional(),
	group_name: z.string(),
	id: z.uuid().optional(),
	logo_url: z.url().nullable().optional(),
	phone: PhoneNumberSchema,
	short_name: z.string(),
	website_url: z.url().nullable().optional(),
});

export const ZodGroupsUpdateToDb = ZodGroupsInsertToDb.partial();

export type ZodGroupsRowType = z.infer<typeof ZodGroupsRow>;
export type ZodGroupsInsertType = z.infer<typeof ZodGroupsInsert>;
export type ZodGroupsUpdateType = z.infer<typeof ZodGroupsUpdate>;
export type ZodGroupsRowToDbType = z.infer<typeof ZodGroupsRowToDb>;
export type ZodGroupsInsertToDbType = z.infer<typeof ZodGroupsInsertToDb>;
export type ZodGroupsUpdateToDbType = z.infer<typeof ZodGroupsUpdateToDb>;
