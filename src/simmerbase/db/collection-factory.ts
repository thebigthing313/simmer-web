import {
	type QueryCollectionUtils,
	queryCollectionOptions,
} from '@tanstack/query-db-collection';
import {
	type Collection,
	type CollectionConfig,
	createCollection,
} from '@tanstack/react-db';
import type { QueryKey } from '@tanstack/react-query';
import type z from 'zod';
import * as TanstackQueryProvider from '@/integrations/tanstack-query/root-provider';
import { getSupabaseClient } from '../client';
import type { Table } from '../data-types';

const { queryClient } = TanstackQueryProvider.getContext();

/**
 * Configuration fields commonly passed to TanStack Query hooks.
 * Also supports custom mutation handlers (onInsert, onUpdate, onDelete)
 * for overriding default Supabase behavior.
 *
 * @example
 * ```typescript
 * const config: FactoryConfig<MyItem> = {
 *   staleTime: 5000,
 *   onInsert: async ({ transaction, collection }) => {
 *     // Custom insert logic here
 *     return { refetch: false };
 *   },
 *   onUpdate: async ({ transaction, collection }) => {
 *     // Custom update logic here
 *     return { refetch: false };
 *   },
 *   onDelete: async ({ transaction, collection }) => {
 *     // Custom delete logic here (e.g., hard delete)
 *     return { refetch: false };
 *   }
 * };
 * ```
 */
interface TanstackQueryConfig {
	staleTime?: number;
	enabled?: boolean;
	// Add any other common TanStack Query options you need to pass through
}

// Helper type to safely define the core configuration object for the factory
type FactoryConfig<TItem extends { id: string }> = Partial<
	Omit<
		// biome-ignore lint/suspicious/noExplicitAny: Required for TanStack DB type parameters
		CollectionConfig<TItem, string | number, never, any> & {
			schema?: undefined;
			// biome-ignore lint/suspicious/noExplicitAny: Required for QueryCollectionUtils type parameters
			utils: QueryCollectionUtils<TItem, string | number, any, any>;
		},
		'queryKey' | 'queryFn' | 'getKey'
	>
> &
	TanstackQueryConfig;

interface CollectionSchemas<TItem extends { id: string }, TInsert, TUpdate> {
	// Schema for the full item (Read/Output, with all server-generated fields)
	// biome-ignore lint/suspicious/noExplicitAny: Required for Zod ZodType parameters
	rowSchema: z.ZodType<TItem, any, any>;
	// Schema for the client input on Insert (Audit fields are optional/omitted)
	// biome-ignore lint/suspicious/noExplicitAny: Required for Zod ZodType parameters
	insertSchema: z.ZodType<TInsert, any, any>;
	// Schema for the client input on Update (Partial item)
	// biome-ignore lint/suspicious/noExplicitAny: Required for Zod ZodType parameters
	updateSchema: z.ZodType<TUpdate, any, any>;
}

// --- Overload 1: Parameterized factory with custom query function ---
export function createSupabaseCollection<
	// biome-ignore lint/suspicious/noExplicitAny: Generic parameter array type
	TParams extends any[],
	TItem extends { id: string },
	TInsert extends object,
	TUpdate extends object,
>(
	tableName: Table,
	schemas: CollectionSchemas<TItem, TInsert, TUpdate>,
	customQueryFn: (...params: TParams) => Promise<TItem[]>,
	config: FactoryConfig<TItem>,
): (...params: TParams) => Collection<TItem, string | number>;

// --- Overload 2: Non-parameterized factory with custom query function ---
export function createSupabaseCollection<
	TItem extends { id: string },
	TInsert extends object,
	TUpdate extends object,
>(
	tableName: Table,
	schemas: CollectionSchemas<TItem, TInsert, TUpdate>,
	customQueryFn: (...params: []) => Promise<TItem[]>,
	config: FactoryConfig<TItem>,
): () => Collection<TItem, string | number>;

// --- Overload 3: Simple non-parameterized factory with default query ---
export function createSupabaseCollection<
	TItem extends { id: string },
	TInsert extends object,
	TUpdate extends object,
>(
	tableName: Table,
	schemas: CollectionSchemas<TItem, TInsert, TUpdate>,
	config: FactoryConfig<TItem>,
): () => Collection<TItem, string | number>;

// --- Implementation ---
export function createSupabaseCollection<
	// biome-ignore lint/suspicious/noExplicitAny: Generic parameter array type
	TParams extends any[],
	TItem extends { id: string },
	TInsert extends object,
	TUpdate extends object,
>(
	tableName: Table,
	schemas: CollectionSchemas<TItem, TInsert, TUpdate>,
	customQueryFnOrConfig:
		| ((...params: TParams) => Promise<TItem[]>)
		| FactoryConfig<TItem>,
	config?: FactoryConfig<TItem>,
):
	| ((...params: TParams) => Collection<TItem, string | number>)
	| (() => Collection<TItem, string | number>) {
	const { rowSchema, insertSchema, updateSchema } = schemas;

	// Determine if customQueryFn was provided or if config is the third argument
	let finalCustomQueryFn: (...params: TParams) => Promise<TItem[]>;
	let finalConfig: FactoryConfig<TItem>;

	if (typeof customQueryFnOrConfig === 'function') {
		// Custom query function provided
		finalCustomQueryFn = customQueryFnOrConfig;
		finalConfig = config ?? {};
	} else {
		// No custom query function, use default
		finalConfig = customQueryFnOrConfig;
		finalCustomQueryFn = (async () => {
			const supabase = getSupabaseClient();
			const { data, error } = await supabase.from(tableName).select('*');
			if (error) {
				throw new Error(`Failed to query ${tableName}: ${error.message}`, {
					cause: error,
				});
			}
			return data.map((item) => rowSchema.parse(item));
		}) as (...params: TParams) => Promise<TItem[]>;
	}

	const collectionCreator = (
		...params: TParams
	): Collection<TItem, string | number> => {
		const queryKey: QueryKey = [tableName, ...params];

		return createCollection<TItem>(
			queryCollectionOptions<TItem>({
				queryKey,
				queryClient,
				getKey: (item) => item.id,

				queryFn: async () => {
					const result = await finalCustomQueryFn(...params);
					return result;
				},

				onInsert:
					finalConfig.onInsert ??
					(async ({ transaction, collection }) => {
						const localNewItems = transaction.mutations.map((m) => m.modified);

						const parsedLocalNewItems = localNewItems.map((item) =>
							insertSchema.parse(item),
						);

						const supabase = getSupabaseClient();
						const { data: serverNewItems, error: insertError } = await supabase
							.from(tableName)
							// biome-ignore lint/suspicious/noExplicitAny: Generic types don't match Supabase's specific table types
							.insert(parsedLocalNewItems as any)
							.select('*');

						if (insertError || !serverNewItems) {
							throw new Error(
								`Failed to insert into ${tableName}: ${insertError?.message ?? 'No data returned'}`,
								{ cause: insertError },
							);
						}

						const parsedServerNewItems = serverNewItems.map((item) =>
							rowSchema.parse(item),
						);

						collection.utils.writeBatch(() => {
							parsedServerNewItems.forEach((item) => {
								collection.utils.writeUpsert(item);
							});
						});

						return { refetch: false };
					}),

				onUpdate:
					finalConfig.onUpdate ??
					(async ({ transaction, collection }) => {
						if (transaction.mutations.length === 0) {
							return { refetch: false };
						}
						const localUpdatedKeys = transaction.mutations.map((m) => m.key);
						const localChangesToApply = transaction.mutations[0].changes;

						const parsedChangesToApply =
							updateSchema.parse(localChangesToApply);

						const supabase = getSupabaseClient();
						const { data: serverUpdatedItems, error: updateError } =
							await supabase
								.from(tableName)
								// biome-ignore lint/suspicious/noExplicitAny: Generic types don't match Supabase's specific table types
								.update(parsedChangesToApply as any)
								.in('id', localUpdatedKeys)
								.select('*');

						if (updateError || !serverUpdatedItems) {
							throw new Error(
								`Failed to update ${tableName}: ${updateError?.message ?? 'No data returned'}`,
								{ cause: updateError },
							);
						}

						const parsedServerUpdatedItems = serverUpdatedItems.map((item) =>
							rowSchema.parse(item),
						);

						collection.utils.writeBatch(() => {
							parsedServerUpdatedItems.forEach((item) => {
								collection.utils.writeUpsert(item);
							});
						});

						return { refetch: false };
					}),

				onDelete:
					finalConfig.onDelete ??
					(async ({ transaction, collection }) => {
						const localDeletedItemIds = transaction.mutations.map((m) => m.key);

						const supabase = getSupabaseClient();
						const { error: deleteError } = await supabase.rpc(
							'soft_delete_record',
							{
								p_record_ids: localDeletedItemIds,
								p_table_name: tableName,
							},
						);

						if (deleteError) {
							throw new Error(
								`Failed to delete from ${tableName}: ${deleteError.message}`,
								{ cause: deleteError },
							);
						}

						collection.utils.writeBatch(() => {
							localDeletedItemIds.forEach((id) => {
								collection.utils.writeDelete(id);
							});
						});

						return { refetch: false };
					}),

				...finalConfig,
			}),
		);
	};

	return collectionCreator;
}
