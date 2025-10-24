import { supabase } from "@/db/client";
import type { AppRow, Insert, Table, Update } from "@/db/data-types";
import { transformDates, transformDatesToStrings } from "./collection-utils";

/**
 * Fetches data from a Supabase table and transforms date strings to Date objects.
 * @returns A promise of an array of records with application-friendly Date types.
 */
export async function dbSelectAll<T extends Table>(
  table: T,
): Promise<Array<AppRow<T>>> {
  const { data, error } = await supabase.from(table).select("*");
  if (error) throw error;

  // FORWARD transformation: string -> Date
  const transformedData = data.map((item) => transformDates(item));

  // Assert to the correct AppRow type (with Date objects)
  return transformedData as Array<AppRow<T>>;
}

/**
 * Inserts data into a Supabase table, converting Date objects to ISO strings on the way
 * and converting returned data back to Date objects.
 * @returns A promise of an array of the newly inserted records with application-friendly Date types.
 */
export async function dbInsert<T extends Table>(
  table: T,
  items: Array<Insert<T>>,
): Promise<Array<AppRow<T>>> {
  // REVERSE transformation: Date -> string for API submission
  const itemsToInsert = items.map((item) => transformDatesToStrings(item));

  const { data, error } = await supabase
    .from(table)
    .insert(itemsToInsert as any)
    .select();
  if (error) throw error;

  // FORWARD transformation: string -> Date for application consumption
  const transformedData = data.map((item) => transformDates(item));

  // Assert to the correct AppRow type (with Date objects)
  return transformedData as Array<AppRow<T>>;
}
export async function dbUpdate<T extends Table>(
  table: T,
  items: Array<{ id: string; changes: Update<T> }>,
): Promise<Array<{ data: Array<AppRow<T>> | null; error: any }>> {
  const persistUpdate = async ({
    id,
    changes,
  }: {
    id: string;
    changes: Update<T>;
  }) => {
    // REVERSE transformation: Convert incoming Date objects to ISO strings
    const changesToUpdate = transformDatesToStrings(changes);

    const { data, error } = await supabase
      .from(table)
      .update(changesToUpdate as any)
      .eq("id", id as any)
      .select();

    if (error) {
      return { data: null, error };
    }

    // FORWARD transformation: Convert returned ISO strings to Date objects
    const transformedData = data.map((item) => transformDates(item));

    // Return the correctly typed, transformed data
    return { data: transformedData as Array<AppRow<T>>, error: null };
  };

  // Use Promise.allSettled to ensure all updates complete without halting the entire process
  const results = await Promise.allSettled(
    items.map((item) => persistUpdate(item)),
  );

  // Map the settled results to the final desired array format {data, error}
  return results.map((result) => {
    if (result.status === "fulfilled") {
      // result.value is { data: AppRow<T>[], error: null } from persistUpdate
      return {
        data: result.value.error ? null : result.value.data,
        error: result.value.error,
      };
    }
    // This handles cases where persistUpdate failed to even execute (e.g., network error)
    return {
      data: null,
      error: result.reason,
    };
  });
}

export async function dbDelete<T extends Table>(
  table: T,
  ids: Array<string>,
): Promise<{
  success: Array<string>;
  failed: Array<{ id: string; error: Error }>;
}> {
  const deletePromises = ids.map((id) =>
    supabase
      .rpc("soft_delete_record", {
        p_record_id: id,
        p_table_name: table,
      })
      .then((result) => ({ id, result })),
  );

  const results = await Promise.allSettled(deletePromises);
  const success: Array<string> = [];
  const failed: Array<{ id: string; error: Error }> = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      const { id, result: queryResult } = result.value;
      if (queryResult.error) {
        failed.push({ id, error: queryResult.error });
      } else {
        success.push(id);
      }
    } else {
      failed.push({ id: ids[index], error: result.reason });
    }
  });

  return { success, failed };
}
