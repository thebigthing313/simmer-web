import { queryCollectionOptions } from '@tanstack/query-db-collection';
import { createCollection, parseLoadSubsetOptions } from '@tanstack/react-db';
import { dataProviders } from '@/simmerbase/client';
import {
	ZodRegionsRow,
	ZodRegionsUpdateToDb,
} from '@/simmerbase/schemas/regions';

const { queryClient, supabase } = dataProviders;

const table = 'regions';
const rowSchema = ZodRegionsRow;
const updateSchema = ZodRegionsUpdateToDb;

export const regions = createCollection(
	queryCollectionOptions({
		id: table,
		queryKey: (opts) => {
			const parsed = parseLoadSubsetOptions(opts);
			const cacheKey = [table];

			parsed.filters.forEach((f) => {
				cacheKey.push(`${f.field.join('.')}-${f.operator}-${f.value}`);
			});

			if (parsed.limit) {
				cacheKey.push(`limit-${parsed.limit}`);
			}

			return cacheKey;
		},
		queryClient,
		schema: rowSchema,
		getKey: (item) => item.id,
		syncMode: 'on-demand',
		staleTime: Infinity,
		queryFn: async (ctx) => {
			const { filters, sorts, limit } = parseLoadSubsetOptions(
				//@ts-expect-error: following documentation
				ctx.meta?.loadSubsetOptions,
			);
			let query = supabase
				.from(table)
				.select(
					'id, group_id, region_name, created_by, created_at, updated_by, updated_at, parent_id',
				);

			filters.forEach((filter) => {
				switch (filter.operator) {
					case 'eq':
						query = query.eq(filter.field.join('.'), filter.value);
						break;
					case 'lt':
						query = query.lt(filter.field.join('.'), filter.value);
						break;
					case 'lte':
						query = query.lte(filter.field.join('.'), filter.value);
						break;
					case 'gt':
						query = query.gt(filter.field.join('.'), filter.value);
						break;
					case 'gte':
						query = query.gte(filter.field.join('.'), filter.value);
						break;
					case 'in':
						query = query.in(filter.field.join('.'), filter.value);
						break;
					default:
						throw new Error(
							`Unsupported filter operator <>${filter.operator} in <${table}> collection`,
						);
				}
			});

			sorts.forEach((sort) => {
				query = query.order(sort.field.join('.'), {
					ascending: sort.direction === 'asc',
				});
			});

			if (limit) {
				query = query.limit(limit);
			}

			const { data, error } = await query;

			if (error)
				throw new Error(`Error fetching table <>${table}: ${error.message}`);
			const parsed = data.map((item) => rowSchema.parse(item));
			return parsed;
		},

		onUpdate: async ({ transaction, collection }) => {
			const localUpdatedKeys = transaction.mutations.map((m) => m.key);
			const localChanges = transaction.mutations[0].changes;

			const parsedLocalChanges = updateSchema.parse(localChanges);

			const { data, error } = await supabase
				.from(table)
				.update(parsedLocalChanges)
				.in('id', localUpdatedKeys)
				.select('*');

			if (error) {
				throw new Error(`Error updating table <>${table}: ${error.message}`);
			}

			const parsedServerUpdatedItems = data.map((item) =>
				rowSchema.parse(item),
			);
			collection.utils.writeBatch(() => {
				parsedServerUpdatedItems.forEach((item) => {
					collection.utils.writeUpsert(item);
				});
			});
			return { refetch: false };
		},
		onDelete: async ({ transaction, collection }) => {
			const localDeletedKeys = transaction.mutations.map((m) => m.key);
			const { error } = await supabase
				.from(table)
				.delete()
				.in('id', localDeletedKeys);

			if (error) {
				throw new Error(
					`Error deleting from table <>${table}: ${error.message}`,
				);
			}
			collection.utils.writeBatch(() => {
				localDeletedKeys.forEach((key) => {
					collection.utils.writeDelete(key);
				});
			});
			return { refetch: false };
		},
	}),
);
