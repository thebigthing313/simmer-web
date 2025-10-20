import type { Insert, Row, Table, Update } from '@/types/data-types'
import { supabase } from '@/main.tsx'

export async function dbSelectAll<T extends Table>(
  table: T,
): Promise<Array<Row<T>>> {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return data as unknown as Array<Row<T>>
}

export async function dbInsert<T extends Table>(
  table: T,
  values: Array<Insert<T>>,
): Promise<Array<Row<T>>> {
  const { data, error } = await supabase
    .from(table)
    .insert(values as any)
    .select()
  if (error) throw error
  return data as unknown as Array<Row<T>>
}

export async function dbUpdate<T extends Table>(
  table: T,
  items: Array<{ id: string; changes: Update<T> }>,
): Promise<Array<{ data: Array<Row<T>> | null; error: any }>> {
  const persistUpdate = async ({
    id,
    changes,
  }: {
    id: string
    changes: Update<T>
  }) => {
    // This inner function should NOT throw, but rather return the {data, error} tuple.
    const { data, error } = await supabase
      .from(table)
      .update(changes as any)
      .eq('id', id as any)
      .select()

    return { data: (data ?? []) as unknown as Array<Row<T>>, error }
  }

  // Use Promise.allSettled to wait for all, and extract the fulfillment value.
  const results = await Promise.allSettled(
    items.map((item) => persistUpdate(item)),
  )

  // Map the settled results to your desired array format {data, error}
  return results.map((result) => {
    if (result.status === 'fulfilled') {
      // result.value is { data, error } from persistUpdate
      return {
        data: result.value.error ? null : result.value.data,
        error: result.value.error,
      }
    }
    // This handles cases where persistUpdate itself failed to execute (e.g., network down)
    return {
      data: null,
      error: result.reason,
    }
  })
}

export async function dbDelete<T extends Table>(
  table: T,
  ids: Array<string>,
): Promise<{
  success: Array<string>
  failed: Array<{ id: string; error: Error }>
}> {
  const deletePromises = ids.map((id) =>
    supabase
      .rpc('soft_delete_record', {
        p_record_id: id,
        p_table_name: table,
      })
      .then((result) => ({ id, result })),
  )

  const results = await Promise.allSettled(deletePromises)
  const success: Array<string> = []
  const failed: Array<{ id: string; error: Error }> = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const { id, result: queryResult } = result.value
      if (queryResult.error) {
        failed.push({ id, error: queryResult.error })
      } else {
        success.push(id)
      }
    } else {
      failed.push({ id: ids[index], error: result.reason })
    }
  })

  return { success, failed }
}
