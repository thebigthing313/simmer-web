import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { AppRow, Table } from '@/db/data-types'
import { dbSelectAll } from '@/db/generic-crud-functions'
import * as TanstackQueryProvider from '@/integrations/tanstack-query/root-provider'
import {
  collectionOnDelete,
  collectionOnInsert,
  collectionOnUpdate,
} from '@/db/collections/collection-functions'

const { queryClient } = TanstackQueryProvider.getContext()

export const DBWholeCollectionOptions = <T extends Table>(
  table: T,
  staleTime?: number,
) =>
  queryCollectionOptions({
    queryKey: [table as string],
    queryFn: async () => {
      const data = await dbSelectAll(table)
      return data as unknown as Array<AppRow<T>>
    },
    queryClient,
    staleTime: staleTime,
    getKey: (item) => item.id,
    onInsert: ({ transaction, collection }) =>
      collectionOnInsert(table, transaction, collection),
    onUpdate: ({ transaction, collection }) =>
      collectionOnUpdate(table, transaction, collection),
    onDelete: ({ transaction, collection }) =>
      collectionOnDelete(table, transaction, collection),
  })
