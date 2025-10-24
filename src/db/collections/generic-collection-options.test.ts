// Mock the Tanstack Query DB Collection

import { queryCollectionOptions } from "@tanstack/query-db-collection";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Table } from "@/db/data-types";
import {
  dbDelete,
  dbInsert,
  dbSelectAll,
  dbUpdate,
} from "@/db/generic-crud-functions";
import { DBWholeCollectionOptions } from "./generic-collection-options";

vi.mock("@tanstack/query-db-collection", () => ({
  queryCollectionOptions: vi.fn(),
}));

// Mock the CRUD functions
vi.mock("@/db/db-generic-crud-functions", () => ({
  dbSelectAll: vi.fn(),
  dbInsert: vi.fn(),
  dbUpdate: vi.fn(),
  dbDelete: vi.fn(),
}));

describe("generic-collection-options", () => {
  // Mock functions
  const mockQueryCollectionOptions = queryCollectionOptions as Mock;
  const mockDbSelectAll = dbSelectAll as Mock;
  const mockDbInsert = dbInsert as Mock;
  const mockDbUpdate = dbUpdate as Mock;
  const mockDbDelete = dbDelete as Mock;

  // Mock collection utils
  const mockCollectionUtils = {
    writeUpsert: vi.fn(),
    writeDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock queryCollectionOptions to return a basic options object
    mockQueryCollectionOptions.mockReturnValue({
      queryKey: ["test-table"],
      queryFn: vi.fn(),
      onInsert: vi.fn(),
      onUpdate: vi.fn(),
      onDelete: vi.fn(),
    });
  });

  describe("DBWholeCollectionOptions", () => {
    it("should create collection options with default parameters", () => {
      const options = DBWholeCollectionOptions("users" as Table);

      expect(mockQueryCollectionOptions).toHaveBeenCalledWith({
        queryKey: ["users"],
        queryFn: expect.any(Function),
        queryClient: expect.any(Object), // QueryClient instance
        staleTime: undefined,
        getKey: expect.any(Function),
        onInsert: expect.any(Function),
        onUpdate: expect.any(Function),
        onDelete: expect.any(Function),
      });

      expect(options).toBeDefined();
    });

    it("should create collection options with custom staleTime", () => {
      const staleTime = 5000;
      DBWholeCollectionOptions("posts" as Table, staleTime);

      expect(mockQueryCollectionOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["posts"],
          staleTime: staleTime,
        }),
      );
    });

    it("should create collection options for different table types", () => {
      DBWholeCollectionOptions("groups" as Table);
      expect(mockQueryCollectionOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["groups"],
        }),
      );

      DBWholeCollectionOptions("regions" as Table);
      expect(mockQueryCollectionOptions).toHaveBeenCalledWith(
        expect.objectContaining({
          queryKey: ["regions"],
        }),
      );
    });

    describe("queryFn", () => {
      it("should call dbSelectAll with correct table name", async () => {
        const mockData = [
          { id: "1", name: "User 1" },
          { id: "2", name: "User 2" },
        ];

        mockDbSelectAll.mockResolvedValueOnce(mockData);

        DBWholeCollectionOptions("users" as Table);
        const queryFn = mockQueryCollectionOptions.mock.calls[0][0].queryFn;

        const result = await queryFn();

        expect(mockDbSelectAll).toHaveBeenCalledWith("users");
        expect(result).toEqual(mockData);
      });

      it("should handle empty data from dbSelectAll", async () => {
        mockDbSelectAll.mockResolvedValueOnce([]);

        DBWholeCollectionOptions("users" as Table);
        const queryFn = mockQueryCollectionOptions.mock.calls[0][0].queryFn;

        const result = await queryFn();

        expect(result).toEqual([]);
      });

      it("should propagate errors from dbSelectAll", async () => {
        const mockError = new Error("Database connection failed");
        mockDbSelectAll.mockRejectedValueOnce(mockError);

        DBWholeCollectionOptions("users" as Table);
        const queryFn = mockQueryCollectionOptions.mock.calls[0][0].queryFn;

        await expect(queryFn()).rejects.toThrow("Database connection failed");
      });
    });

    describe("getKey", () => {
      it("should extract id from items", () => {
        DBWholeCollectionOptions("users" as Table);
        const getKey = mockQueryCollectionOptions.mock.calls[0][0].getKey;

        expect(getKey({ id: "123", name: "Test" })).toBe("123");
        expect(getKey({ id: "456", email: "test@example.com" })).toBe("456");
      });

      it("should work with different id formats", () => {
        DBWholeCollectionOptions("users" as Table);
        const getKey = mockQueryCollectionOptions.mock.calls[0][0].getKey;

        expect(getKey({ id: 123, name: "Test" })).toBe(123);
        expect(getKey({ id: "uuid-string", name: "Test" })).toBe("uuid-string");
      });
    });

    describe("onInsert", () => {
      it("should handle successful insert operations", async () => {
        const transaction = {
          mutations: [
            { modified: { name: "New User", email: "new@example.com" } },
            {
              modified: { name: "Another User", email: "another@example.com" },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = [
          { id: "1", name: "New User", email: "new@example.com" },
          { id: "2", name: "Another User", email: "another@example.com" },
        ];

        mockDbInsert.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onInsert = mockQueryCollectionOptions.mock.calls[0][0].onInsert;

        const result = await onInsert({ transaction, collection });

        expect(mockDbInsert).toHaveBeenCalledWith("users", [
          { name: "New User", email: "new@example.com" },
          { name: "Another User", email: "another@example.com" },
        ]);

        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledTimes(2);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          1,
          dbResult[0],
        );
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          2,
          dbResult[1],
        );

        expect(result).toEqual({ refetch: false });
      });

      it("should handle single item insert", async () => {
        const transaction = {
          mutations: [
            { modified: { name: "Single User", email: "single@example.com" } },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = [
          { id: "1", name: "Single User", email: "single@example.com" },
        ];

        mockDbInsert.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onInsert = mockQueryCollectionOptions.mock.calls[0][0].onInsert;

        await onInsert({ transaction, collection });

        expect(mockDbInsert).toHaveBeenCalledWith("users", [
          { name: "Single User", email: "single@example.com" },
        ]);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledWith(
          dbResult[0],
        );
      });

      it("should handle empty transaction mutations", async () => {
        const transaction = {
          mutations: [],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        mockDbInsert.mockResolvedValueOnce([]);

        DBWholeCollectionOptions("users" as Table);
        const onInsert = mockQueryCollectionOptions.mock.calls[0][0].onInsert;

        await onInsert({ transaction, collection });

        expect(mockDbInsert).toHaveBeenCalledWith("users", []);
        expect(mockCollectionUtils.writeUpsert).not.toHaveBeenCalled();
      });

      it("should propagate insert errors", async () => {
        const transaction = {
          mutations: [{ modified: { name: "Invalid User" } }],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const mockError = new Error("Insert failed");
        mockDbInsert.mockRejectedValueOnce(mockError);

        DBWholeCollectionOptions("users" as Table);
        const onInsert = mockQueryCollectionOptions.mock.calls[0][0].onInsert;

        await expect(onInsert({ transaction, collection })).rejects.toThrow(
          "Insert failed",
        );
      });
    });

    describe("onUpdate", () => {
      it("should handle successful update operations", async () => {
        const transaction = {
          mutations: [
            {
              key: "1",
              changes: { name: "Updated Name" },
              original: {
                id: "1",
                name: "Original Name",
                email: "test@example.com",
              },
            },
            {
              key: "2",
              changes: { email: "updated@example.com" },
              original: { id: "2", name: "User 2", email: "old@example.com" },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [
            { id: "1", name: "Updated Name", email: "test@example.com" },
            { id: "2", name: "User 2", email: "updated@example.com" },
          ],
          failed: [],
        };

        mockDbUpdate.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onUpdate = mockQueryCollectionOptions.mock.calls[0][0].onUpdate;

        const result = await onUpdate({ transaction, collection });

        expect(mockDbUpdate).toHaveBeenCalledWith("users", [
          { id: "1", change: { name: "Updated Name" } },
          { id: "2", change: { email: "updated@example.com" } },
        ]);

        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledTimes(2);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          1,
          dbResult.success[0],
        );
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          2,
          dbResult.success[1],
        );

        expect(result).toEqual({ refetch: false });
      });

      it("should handle partial update failures with rollback", async () => {
        const transaction = {
          mutations: [
            {
              key: "1",
              changes: { name: "Updated Name 1" },
              original: {
                id: "1",
                name: "Original 1",
                email: "test1@example.com",
              },
            },
            {
              key: "2",
              changes: { name: "Updated Name 2" },
              original: {
                id: "2",
                name: "Original 2",
                email: "test2@example.com",
              },
            },
            {
              key: "3",
              changes: { name: "Updated Name 3" },
              original: {
                id: "3",
                name: "Original 3",
                email: "test3@example.com",
              },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [
            { id: "1", name: "Updated Name 1", email: "test1@example.com" },
            { id: "3", name: "Updated Name 3", email: "test3@example.com" },
          ],
          failed: [{ id: "2", error: new Error("Update failed") }],
        };

        mockDbUpdate.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onUpdate = mockQueryCollectionOptions.mock.calls[0][0].onUpdate;

        await onUpdate({ transaction, collection });

        // Should upsert successful updates
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledTimes(3);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          1,
          dbResult.success[0],
        );
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          2,
          dbResult.success[1],
        );

        // Should rollback failed update to original
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          3,
          transaction.mutations[1].original,
        );
      });

      it("should handle all updates failing", async () => {
        const transaction = {
          mutations: [
            {
              key: "1",
              changes: { name: "Updated Name" },
              original: {
                id: "1",
                name: "Original",
                email: "test@example.com",
              },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [],
          failed: [{ id: "1", error: new Error("Update failed") }],
        };

        mockDbUpdate.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onUpdate = mockQueryCollectionOptions.mock.calls[0][0].onUpdate;

        await onUpdate({ transaction, collection });

        // Should rollback to original
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledTimes(1);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledWith(
          transaction.mutations[0].original,
        );
      });

      it("should handle empty transaction mutations", async () => {
        const transaction = {
          mutations: [],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [],
          failed: [],
        };

        mockDbUpdate.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onUpdate = mockQueryCollectionOptions.mock.calls[0][0].onUpdate;

        await onUpdate({ transaction, collection });

        expect(mockDbUpdate).toHaveBeenCalledWith("users", []);
        expect(mockCollectionUtils.writeUpsert).not.toHaveBeenCalled();
      });

      it("should handle complex update objects", async () => {
        const transaction = {
          mutations: [
            {
              key: "1",
              changes: {
                name: "Updated Name",
                email: "new@example.com",
                active: true,
                updated_at: new Date().toISOString(),
                metadata: { key: "value" },
              },
              original: { id: "1", name: "Original", email: "old@example.com" },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [
            {
              id: "1",
              name: "Updated Name",
              email: "new@example.com",
              active: true,
              updated_at: transaction.mutations[0].changes.updated_at,
              metadata: { key: "value" },
            },
          ],
          failed: [],
        };

        mockDbUpdate.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onUpdate = mockQueryCollectionOptions.mock.calls[0][0].onUpdate;

        await onUpdate({ transaction, collection });

        expect(mockDbUpdate).toHaveBeenCalledWith("users", [
          { id: "1", change: transaction.mutations[0].changes },
        ]);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledWith(
          dbResult.success[0],
        );
      });
    });

    describe("onDelete", () => {
      it("should handle successful delete operations", async () => {
        const transaction = {
          mutations: [
            {
              key: "1",
              original: { id: "1", name: "User 1" },
            },
            {
              key: "2",
              original: { id: "2", name: "User 2" },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: ["1", "2"],
          failed: [],
        };

        mockDbDelete.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onDelete = mockQueryCollectionOptions.mock.calls[0][0].onDelete;

        const result = await onDelete({ transaction, collection });

        expect(mockDbDelete).toHaveBeenCalledWith("users", ["1", "2"]);

        expect(mockCollectionUtils.writeDelete).toHaveBeenCalledTimes(2);
        expect(mockCollectionUtils.writeDelete).toHaveBeenNthCalledWith(1, "1");
        expect(mockCollectionUtils.writeDelete).toHaveBeenNthCalledWith(2, "2");

        expect(result).toEqual({ refetch: false });
      });

      it("should handle partial delete failures with rollback", async () => {
        const transaction = {
          mutations: [
            {
              key: "1",
              original: { id: "1", name: "User 1" },
            },
            {
              key: "2",
              original: { id: "2", name: "User 2" },
            },
            {
              key: "3",
              original: { id: "3", name: "User 3" },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: ["1", "3"],
          failed: [{ id: "2", error: new Error("Delete failed") }],
        };

        mockDbDelete.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onDelete = mockQueryCollectionOptions.mock.calls[0][0].onDelete;

        await onDelete({ transaction, collection });

        // Should delete successful items
        expect(mockCollectionUtils.writeDelete).toHaveBeenCalledTimes(2);
        expect(mockCollectionUtils.writeDelete).toHaveBeenNthCalledWith(1, "1");
        expect(mockCollectionUtils.writeDelete).toHaveBeenNthCalledWith(2, "3");

        // Should restore failed delete to original
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledTimes(1);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledWith(
          transaction.mutations[1].original,
        );
      });

      it("should handle all deletes failing", async () => {
        const transaction = {
          mutations: [
            {
              key: "1",
              original: { id: "1", name: "User 1" },
            },
            {
              key: "2",
              original: { id: "2", name: "User 2" },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [],
          failed: [
            { id: "1", error: new Error("Delete failed 1") },
            { id: "2", error: new Error("Delete failed 2") },
          ],
        };

        mockDbDelete.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onDelete = mockQueryCollectionOptions.mock.calls[0][0].onDelete;

        await onDelete({ transaction, collection });

        // Should restore all originals
        expect(mockCollectionUtils.writeDelete).not.toHaveBeenCalled();
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledTimes(2);
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          1,
          transaction.mutations[0].original,
        );
        expect(mockCollectionUtils.writeUpsert).toHaveBeenNthCalledWith(
          2,
          transaction.mutations[1].original,
        );
      });

      it("should handle empty transaction mutations", async () => {
        const transaction = {
          mutations: [],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [],
          failed: [],
        };

        mockDbDelete.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onDelete = mockQueryCollectionOptions.mock.calls[0][0].onDelete;

        await onDelete({ transaction, collection });

        expect(mockDbDelete).toHaveBeenCalledWith("users", []);
        expect(mockCollectionUtils.writeDelete).not.toHaveBeenCalled();
        expect(mockCollectionUtils.writeUpsert).not.toHaveBeenCalled();
      });

      it("should handle UUID format keys", async () => {
        const uuid1 = "550e8400-e29b-41d4-a716-446655440000";
        const uuid2 = "550e8400-e29b-41d4-a716-446655440001";

        const transaction = {
          mutations: [
            {
              key: uuid1,
              original: { id: uuid1, name: "User 1" },
            },
            {
              key: uuid2,
              original: { id: uuid2, name: "User 2" },
            },
          ],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const dbResult = {
          success: [uuid1, uuid2],
          failed: [],
        };

        mockDbDelete.mockResolvedValueOnce(dbResult);

        DBWholeCollectionOptions("users" as Table);
        const onDelete = mockQueryCollectionOptions.mock.calls[0][0].onDelete;

        await onDelete({ transaction, collection });

        expect(mockDbDelete).toHaveBeenCalledWith("users", [uuid1, uuid2]);
        expect(mockCollectionUtils.writeDelete).toHaveBeenCalledWith(uuid1);
        expect(mockCollectionUtils.writeDelete).toHaveBeenCalledWith(uuid2);
      });
    });

    describe("Integration scenarios", () => {
      it("should handle complete CRUD workflow with optimistic updates", async () => {
        // Insert
        const insertTransaction = {
          mutations: [
            { modified: { name: "New User", email: "new@example.com" } },
          ],
        };

        const insertCollection = {
          utils: mockCollectionUtils,
        };

        const insertResult = [
          { id: "1", name: "New User", email: "new@example.com" },
        ];

        mockDbInsert.mockResolvedValueOnce(insertResult);

        DBWholeCollectionOptions("users" as Table);
        const onInsert = mockQueryCollectionOptions.mock.calls[0][0].onInsert;

        await onInsert({
          transaction: insertTransaction,
          collection: insertCollection,
        });

        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledWith(
          insertResult[0],
        );

        // Update with partial failure
        const updateTransaction = {
          mutations: [
            {
              key: "1",
              changes: { name: "Updated User" },
              original: { id: "1", name: "New User", email: "new@example.com" },
            },
          ],
        };

        const updateCollection = {
          utils: mockCollectionUtils,
        };

        const updateResult = {
          success: [
            { id: "1", name: "Updated User", email: "new@example.com" },
          ],
          failed: [],
        };

        mockDbUpdate.mockResolvedValueOnce(updateResult);

        const onUpdate = mockQueryCollectionOptions.mock.calls[0][0].onUpdate;

        await onUpdate({
          transaction: updateTransaction,
          collection: updateCollection,
        });

        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledWith(
          updateResult.success[0],
        );

        // Delete
        const deleteTransaction = {
          mutations: [
            {
              key: "1",
              original: {
                id: "1",
                name: "Updated User",
                email: "new@example.com",
              },
            },
          ],
        };

        const deleteCollection = {
          utils: mockCollectionUtils,
        };

        const deleteResult = {
          success: ["1"],
          failed: [],
        };

        mockDbDelete.mockResolvedValueOnce(deleteResult);

        const onDelete = mockQueryCollectionOptions.mock.calls[0][0].onDelete;

        await onDelete({
          transaction: deleteTransaction,
          collection: deleteCollection,
        });

        expect(mockCollectionUtils.writeDelete).toHaveBeenCalledWith("1");
      });

      it("should handle mixed operations with various failure scenarios", async () => {
        // Bulk insert with success
        const insertTransaction = {
          mutations: [
            { modified: { name: "User A", email: "a@example.com" } },
            { modified: { name: "User B", email: "b@example.com" } },
          ],
        };

        const insertCollection = {
          utils: mockCollectionUtils,
        };

        const insertResult = [
          { id: "1", name: "User A", email: "a@example.com" },
          { id: "2", name: "User B", email: "b@example.com" },
        ];

        mockDbInsert.mockResolvedValueOnce(insertResult);

        DBWholeCollectionOptions("users" as Table);
        const onInsert = mockQueryCollectionOptions.mock.calls[0][0].onInsert;

        await onInsert({
          transaction: insertTransaction,
          collection: insertCollection,
        });

        // Bulk update with partial failures
        const updateTransaction = {
          mutations: [
            {
              key: "1",
              changes: { name: "Updated A" },
              original: { id: "1", name: "User A", email: "a@example.com" },
            },
            {
              key: "2",
              changes: { name: "Updated B" },
              original: { id: "2", name: "User B", email: "b@example.com" },
            },
            {
              key: "3",
              changes: { name: "Updated C" },
              original: { id: "3", name: "User C", email: "c@example.com" },
            },
          ],
        };

        const updateCollection = {
          utils: mockCollectionUtils,
        };

        const updateResult = {
          success: [{ id: "1", name: "Updated A", email: "a@example.com" }],
          failed: [
            { id: "2", error: new Error("Permission denied") },
            { id: "3", error: new Error("Record not found") },
          ],
        };

        mockDbUpdate.mockResolvedValueOnce(updateResult);

        const onUpdate = mockQueryCollectionOptions.mock.calls[0][0].onUpdate;

        await onUpdate({
          transaction: updateTransaction,
          collection: updateCollection,
        });

        // Should have upserted successful update and rolled back failures
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledTimes(5); // 2 inserts + 1 success + 2 rollbacks

        // Bulk delete with partial failures
        const deleteTransaction = {
          mutations: [
            {
              key: "1",
              original: { id: "1", name: "Updated A", email: "a@example.com" },
            },
            {
              key: "2",
              original: { id: "2", name: "User B", email: "b@example.com" },
            },
          ],
        };

        const deleteCollection = {
          utils: mockCollectionUtils,
        };

        const deleteResult = {
          success: ["1"],
          failed: [{ id: "2", error: new Error("Delete failed") }],
        };

        mockDbDelete.mockResolvedValueOnce(deleteResult);

        const onDelete = mockQueryCollectionOptions.mock.calls[0][0].onDelete;

        await onDelete({
          transaction: deleteTransaction,
          collection: deleteCollection,
        });

        // Should have deleted successful item and restored failed one
        expect(mockCollectionUtils.writeDelete).toHaveBeenCalledWith("1");
        expect(mockCollectionUtils.writeUpsert).toHaveBeenCalledWith(
          deleteTransaction.mutations[1].original,
        );
      });
    });

    describe("Error handling", () => {
      it("should handle database errors in queryFn", async () => {
        const mockError = new Error("Network timeout");
        mockDbSelectAll.mockRejectedValueOnce(mockError);

        DBWholeCollectionOptions("users" as Table);
        const queryFn = mockQueryCollectionOptions.mock.calls[0][0].queryFn;

        await expect(queryFn()).rejects.toThrow("Network timeout");
      });

      it("should handle transaction processing errors", async () => {
        const transaction = {
          mutations: [{ modified: { name: "Test User" } }],
        };

        const collection = {
          utils: mockCollectionUtils,
        };

        const mockError = new Error("Transaction failed");
        mockDbInsert.mockRejectedValueOnce(mockError);

        DBWholeCollectionOptions("users" as Table);
        const onInsert = mockQueryCollectionOptions.mock.calls[0][0].onInsert;

        await expect(onInsert({ transaction, collection })).rejects.toThrow(
          "Transaction failed",
        );
      });
    });
  });
});
