import { queryCollectionOptions } from '@tanstack/query-db-collection';
import { createCollection } from '@tanstack/react-db';
import { dataProviders } from '@/simmerbase/client';
import {
	ZodProfilesInsertToDb,
	ZodProfilesRow,
	ZodProfilesUpdateToDb,
} from '@/simmerbase/schemas/profiles';

const { queryClient, supabase } = dataProviders;

const table = 'profiles';

export const profiles = createCollection(
	queryCollectionOptions({
		queryKey: [table],
		queryFn: async () => {
			const { data, error } = await supabase.from(table).select('*');
			if (error)
				throw new Error(`Error fetching table <>${table}: ${error.message}`);
			const parsed = data.map((item) => ZodProfilesRow.parse(item));
			return parsed;
		},
		queryClient,
		schema: ZodProfilesRow,
		getKey: (item) => item.id,
		staleTime: Infinity,
		onInsert: async ({ transaction, collection }) => {
			const localNewItems = transaction.mutations.map((m) => m.modified);
			const parsedLocalNewItems = localNewItems.map((item) =>
				ZodProfilesInsertToDb.parse(item),
			);
			const { data, error } = await supabase
				.from(table)
				.insert(parsedLocalNewItems)
				.select('*');
			if (error) {
				throw new Error(
					`Error inserting into table <>${table}: ${error.message}`,
				);
			}
			const parsedServerNewItems = data.map((item) =>
				ZodProfilesRow.parse(item),
			);
			collection.utils.writeBatch(() => {
				parsedServerNewItems.forEach((item) => {
					collection.utils.writeUpsert(item);
				});
			});
			return { refetch: false };
		},
		onUpdate: async ({ transaction, collection }) => {
			const localUpdatedKeys = transaction.mutations.map((m) => m.key);
			const localChanges = transaction.mutations[0].changes;

			const parsedLocalChanges = ZodProfilesUpdateToDb.parse(localChanges);

			const { data, error } = await supabase
				.from(table)
				.update(parsedLocalChanges)
				.in('id', localUpdatedKeys)
				.select('*');

			if (error) {
				throw new Error(`Error updating table <>${table}: ${error.message}`);
			}

			const parsedServerUpdatedItems = data.map((item) =>
				ZodProfilesRow.parse(item),
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
