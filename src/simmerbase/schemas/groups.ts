// Auto-generated schema file for groups table
// Generated on: 2025-10-29T03:31:04.725Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
// - Fields named 'geom': PostGIS geometry data (GeoJSON when queried via RPC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodGroupsRow.parse(dataFromSupabase);

import z from 'zod';
import { NameSchema, PhoneNumberSchema } from './fields';

export const ZodGroupsRow = z.object({
	address: z.string(),
	created_at: z.preprocess(
		(val) => (typeof val === 'string' ? new Date(val) : val),
		z.date(),
	),
	created_by: z.uuid().nullable(),
	deleted_at: z
		.preprocess(
			(val) => (typeof val === 'string' ? new Date(val) : val),
			z.date(),
		)
		.nullable(),
	deleted_by: z.uuid().nullable(),
	fax: z.string().nullable(),
	group_name: NameSchema,
	id: z.uuid(),
	logo_url: z.url().nullable(),
	phone: PhoneNumberSchema,
	short_name: NameSchema,
	updated_at: z
		.preprocess(
			(val) => (typeof val === 'string' ? new Date(val) : val),
			z.date(),
		)
		.nullable(),
	updated_by: z.uuid().nullable(),
	website_url: z.url().nullable(),
});

export const ZodGroupsInsert = z.object({
	address: z.string(),
	fax: z.string().nullable().optional(),
	group_name: NameSchema,
	logo_url: z.url().nullable().optional(),
	phone: PhoneNumberSchema,
	short_name: NameSchema,
	website_url: z.url().nullable().optional(),
});

export const ZodGroupsUpdate = ZodGroupsInsert.partial();

export type ZodGroupsRowType = z.infer<typeof ZodGroupsRow>;
export type ZodGroupsInsertType = z.infer<typeof ZodGroupsInsert>;
export type ZodGroupsUpdateType = z.infer<typeof ZodGroupsUpdate>;
