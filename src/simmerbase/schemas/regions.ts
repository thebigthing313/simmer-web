// Auto-generated schema file for regions table
// Generated on: 2025-10-29T04:17:54.781Z
//
// IMPORTANT: Automatic preprocessing is enabled for date fields:
// - Fields ending in '_at' (timestamps): ISO strings are automatically converted to Date objects
// - Fields ending in '_date' (dates): Date strings are automatically converted to Date objects (UTC)
// - Fields named 'geom': PostGIS geometry data (GeoJSON when queried via RPC)
//
// You can validate data directly without manual transformation:
//   const validated = ZodRegionsRow.parse(dataFromSupabase);

import z from 'zod';
import { GeoJSONSchema, NameSchema } from './fields';

export const ZodRegionsRow = z.object({
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
	geom: GeoJSONSchema,
	group_id: z.uuid().nullable(),
	id: z.uuid(),
	parent_id: z.uuid().nullable(),
	region_name: NameSchema,
	updated_at: z.preprocess(
		(val) => (typeof val === 'string' ? new Date(val) : val),
		z.date(),
	),
	updated_by: z.uuid().nullable(),
});

export const ZodRegionsInsert = z.object({
	geom: GeoJSONSchema,
	group_id: z.uuid().nullable().optional(),
	parent_id: z.uuid().nullable().optional(),
	region_name: NameSchema,
});

export const ZodRegionsUpdate = ZodRegionsInsert.partial();

export type ZodRegionsRowType = z.infer<typeof ZodRegionsRow>;
export type ZodRegionsInsertType = z.infer<typeof ZodRegionsInsert>;
export type ZodRegionsUpdateType = z.infer<typeof ZodRegionsUpdate>;
