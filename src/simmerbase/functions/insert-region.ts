import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { getSupabaseClient } from '../client';

const InsertRegionSchema = z.object({
	group_id: z.uuid(),
	region_name: z.string(),
	geom: z.any(),
	parent_id: z.uuid().optional(),
});

export const insertRegion = createServerFn({ method: 'POST' })
	.inputValidator(InsertRegionSchema)
	.handler(async ({ data }) => {
		const supabase = getSupabaseClient();
		console.log('Inserting region:', data);
		const { error } = await supabase.rpc('insert_region', {
			p_group_id: data.group_id,
			p_region_name: data.region_name,
			p_geom: data.geom,
			p_parent_id: data.parent_id,
		});

		if (error) {
			return { error: true, message: error.message };
		}
	});
