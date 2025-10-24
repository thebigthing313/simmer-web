import type { Collection, TransactionWithMutations } from "@tanstack/react-db";
import { toast } from "sonner";
import type { Table } from "@/db/data-types";
import { dbDelete, dbInsert, dbUpdate } from "@/db/generic-crud-functions";

export async function collectionOnDelete(
  table: Table,
  transaction: TransactionWithMutations<any>,
  collection: Collection<any, any, any, any, any>,
) {
  const localDeletedKeys = transaction.mutations.map((m) => m.key);
  const dbDeletedKeys = await dbDelete(table, localDeletedKeys);
  const dbSuccessfulDeletes = dbDeletedKeys.success;
  const dbFailedDeletes = dbDeletedKeys.failed;
  dbSuccessfulDeletes.forEach((key) => {
    collection.utils.writeDelete(key);
  });
  dbFailedDeletes.forEach((item) => {
    const original = transaction.mutations.find(
      (m) => m.key === item.id,
    )?.original;
    if (original) {
      collection.utils.writeUpsert(original);
    }
  });
  return { refetch: false };
}

export async function collectionOnInsert(
  table: Table,
  transaction: TransactionWithMutations<any>,
  collection: Collection<any, any, any, any, any>,
) {
  const localNewItems = transaction.mutations.map((m) => m.modified);
  const serverNewItems = await dbInsert(table, localNewItems);
  serverNewItems.forEach((item) => collection.utils.writeUpsert(item));

  toast.success("Records created successfully.");
  return { refetch: false };
}

export async function collectionOnUpdate(
  table: Table,
  transaction: TransactionWithMutations<any>,
  collection: Collection<any, any, any, any, any>,
) {
  const localUpdatedItems = transaction.mutations.map((m) => ({
    id: m.key,
    changes: m.changes,
  }));

  // 1. Get the structured results from the server
  const serverResponses = await dbUpdate(table, localUpdatedItems);

  // 2. Iterate through responses to perform granular commit/rollback
  serverResponses.forEach((response, index) => {
    const mutation = transaction.mutations[index];

    if (response.error) {
      console.error(`Update failed for ID ${mutation.key}:`, response.error);
      toast.error("Some updates failed. Changes have been rolled back.");
      // Granular Rollback: Upsert the original (pre-optimistic) data.
      collection.utils.writeUpsert(mutation.original);
    } else if (response.data && response.data.length > 0) {
      // response.data is an array (from .select()), but should contain one row for an update
      collection.utils.writeUpsert(response.data[0]);
    }
  });

  return { refetch: false };
}
