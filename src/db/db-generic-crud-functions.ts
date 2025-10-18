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
  changes: Array<{ id: string; change: Update<T> }>,
): Promise<{
  success: Array<Row<T>>
  failed: Array<{ id: string; error: Error }>
}> {
  const updatePromises = changes.map(({ id, change }) =>
    supabase
      .from(table)
      .update(change as any)
      .eq('id', id as any)
      .select()
      .then((result) => ({ id, result })),
  )

  const results = await Promise.allSettled(updatePromises)
  const success: Array<Row<T>> = []
  const failed: Array<{ id: string; error: Error }> = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      const { id, result: queryResult } = result.value
      if (queryResult.error) {
        failed.push({ id, error: queryResult.error })
      } else {
        success.push(...(queryResult.data as unknown as Array<Row<T>>))
      }
    } else {
      failed.push({ id: changes[index].id, error: result.reason })
    }
  })

  return { success, failed }
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
