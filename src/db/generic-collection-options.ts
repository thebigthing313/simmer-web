import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { Row, Table } from '@/types/data-types'
import { dbSelectAll } from '@/db/db-generic-crud-functions'
import * as TanstackQueryProvider from '@/integrations/tanstack-query/root-provider'
import {
  collectionOnDelete,
  collectionOnInsert,
  collectionOnUpdate,
} from '@/db/collection-functions'

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
    onInsert: ({ transaction, collection }) =>
      collectionOnInsert(table, transaction, collection),
    onUpdate: ({ transaction, collection }) =>
      collectionOnUpdate(table, transaction, collection),
    onDelete: ({ transaction, collection }) =>
      collectionOnDelete(table, transaction, collection),
  })
