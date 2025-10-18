import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { Row, Table, Update } from '@/types/data-types'
import {
  dbDelete,
  dbInsert,
  dbSelectAll,
  dbUpdate,
} from '@/db/db-generic-crud-functions'
import * as TanstackQueryProvider from '@/integrations/tanstack-query/root-provider'

const { queryClient } = TanstackQueryProvider.getContext()

export const DBWholeCollectionOptions = <T extends Table>(
  table: T,
  staleTime?: number,
) =>
  queryCollectionOptions({
    queryKey: [table as string],
    queryFn: async () => {
      const data = await dbSelectAll(table)
      return data
    },
    queryClient,
    staleTime: staleTime,
    getKey: (item: Row<T>) => item.id,
    onInsert: async ({ transaction, collection }) => {
      const localNewItems = transaction.mutations.map((m) => m.modified)
      const dbNewItems = await dbInsert(table, localNewItems)
      dbNewItems.forEach((item) => {
        collection.utils.writeUpsert(item)
      })
      return { refetch: false }
    },
    onUpdate: async ({ transaction, collection }) => {
      const localUpdatedItems = transaction.mutations.map((m) => ({
        id: m.key,
        change: m.changes as Update<T>,
      }))
      const dbUpdatedItems = await dbUpdate(table, localUpdatedItems)
      const dbSuccessfulUpdates = dbUpdatedItems.success
      const dbFailedUpdates = dbUpdatedItems.failed
      dbSuccessfulUpdates.forEach((item) => {
        collection.utils.writeUpsert(item)
      })
      dbFailedUpdates.forEach((item) => {
        const original = transaction.mutations.find(
          (m) => m.key === item.id,
        )?.original
        if (original) {
          collection.utils.writeUpsert(original)
        }
      })
      return { refetch: false }
    },
    onDelete: async ({ transaction, collection }) => {
      const localDeletedKeys = transaction.mutations.map((m) => m.key)
      const dbDeletedKeys = await dbDelete(table, localDeletedKeys)
      const dbSuccessfulDeletes = dbDeletedKeys.success
      const dbFailedDeletes = dbDeletedKeys.failed
      dbSuccessfulDeletes.forEach((key) => {
        collection.utils.writeDelete(key)
      })
      dbFailedDeletes.forEach((item) => {
        const original = transaction.mutations.find(
          (m) => m.key === item.id,
        )?.original
        if (original) {
          collection.utils.writeUpsert(original)
        }
      })
      return { refetch: false }
    },
  })
