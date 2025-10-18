import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  dbDelete,
  dbInsert,
  dbSelectAll,
  dbUpdate,
} from './db-generic-crud-functions'
import type { Mock } from 'vitest'

import type { Table } from '@/types/data-types'

import { supabase } from '@/main.tsx'

// Mock the supabase client
vi.mock('@/main.tsx', () => ({
  supabase: {
    from: vi.fn(),
    rpc: vi.fn(),
  },
}))

describe('db-generic-crud-functions', () => {
  // Mock chain methods
  const mockSelect = vi.fn()
  const mockInsert = vi.fn()
  const mockUpdate = vi.fn()
  const mockEq = vi.fn()
  const mockFrom = supabase.from as Mock
  const mockRpc = supabase.rpc as Mock

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default mock chain
    mockFrom.mockReturnValue({
      select: mockSelect,
      insert: mockInsert,
      update: mockUpdate,
    })

    mockSelect.mockReturnValue({
      select: mockSelect,
    })

    mockInsert.mockReturnValue({
      select: mockSelect,
    })

    mockUpdate.mockReturnValue({
      eq: mockEq,
    })

    mockEq.mockReturnValue({
      select: mockSelect,
    })
  })

  describe('dbSelectAll', () => {
    it('should fetch all records from a table successfully', async () => {
      const mockData = [
        { id: '1', name: 'Test 1' },
        { id: '2', name: 'Test 2' },
      ]

      mockSelect.mockResolvedValueOnce({
        data: mockData,
        error: null,
      })

      const result = await dbSelectAll('users' as Table)

      expect(mockFrom).toHaveBeenCalledWith('users')
      expect(mockSelect).toHaveBeenCalledWith('*')
      expect(result).toEqual(mockData)
    })

    it('should throw an error when the query fails', async () => {
      const mockError = new Error('Database connection failed')

      mockSelect.mockResolvedValueOnce({
        data: null,
        error: mockError,
      })

      await expect(dbSelectAll('users' as Table)).rejects.toThrow(
        'Database connection failed',
      )

      expect(mockFrom).toHaveBeenCalledWith('users')
      expect(mockSelect).toHaveBeenCalledWith('*')
    })

    it('should handle empty result set', async () => {
      mockSelect.mockResolvedValueOnce({
        data: [],
        error: null,
      })

      const result = await dbSelectAll('users' as Table)

      expect(result).toEqual([])
    })

    it('should work with different table names', async () => {
      const mockData = [{ id: '1', title: 'Post 1' }]

      mockSelect.mockResolvedValueOnce({
        data: mockData,
        error: null,
      })

      const result = await dbSelectAll('posts' as Table)

      expect(mockFrom).toHaveBeenCalledWith('posts')
      expect(result).toEqual(mockData)
    })
  })

  describe('dbInsert', () => {
    it('should insert a single record successfully', async () => {
      const mockInsertData = [{ name: 'New User', email: 'test@example.com' }]
      const mockReturnedData = [
        { id: '123', name: 'New User', email: 'test@example.com' },
      ]

      mockSelect.mockResolvedValueOnce({
        data: mockReturnedData,
        error: null,
      })

      const result = await dbInsert('users' as Table, mockInsertData as any)

      expect(mockFrom).toHaveBeenCalledWith('users')
      expect(mockInsert).toHaveBeenCalledWith(mockInsertData)
      expect(mockSelect).toHaveBeenCalled()
      expect(result).toEqual(mockReturnedData)
    })

    it('should insert multiple records successfully', async () => {
      const mockInsertData = [
        { name: 'User 1', email: 'user1@example.com' },
        { name: 'User 2', email: 'user2@example.com' },
        { name: 'User 3', email: 'user3@example.com' },
      ]
      const mockReturnedData = [
        { id: '1', name: 'User 1', email: 'user1@example.com' },
        { id: '2', name: 'User 2', email: 'user2@example.com' },
        { id: '3', name: 'User 3', email: 'user3@example.com' },
      ]

      mockSelect.mockResolvedValueOnce({
        data: mockReturnedData,
        error: null,
      })

      const result = await dbInsert('users' as Table, mockInsertData as any)

      expect(mockInsert).toHaveBeenCalledWith(mockInsertData)
      expect(result).toEqual(mockReturnedData)
      expect(result).toHaveLength(3)
    })

    it('should throw an error when insert fails', async () => {
      const mockInsertData = [{ name: 'Invalid User' }]
      const mockError = new Error('Constraint violation')

      mockSelect.mockResolvedValueOnce({
        data: null,
        error: mockError,
      })

      await expect(
        dbInsert('users' as Table, mockInsertData as any),
      ).rejects.toThrow('Constraint violation')

      expect(mockInsert).toHaveBeenCalledWith(mockInsertData)
    })

    it('should handle empty array insertion', async () => {
      mockSelect.mockResolvedValueOnce({
        data: [],
        error: null,
      })

      const result = await dbInsert('users' as Table, [] as any)

      expect(mockInsert).toHaveBeenCalledWith([])
      expect(result).toEqual([])
    })

    it('should work with different table types', async () => {
      const mockInsertData = [{ title: 'New Post', content: 'Test content' }]
      const mockReturnedData = [
        { id: '456', title: 'New Post', content: 'Test content' },
      ]

      mockSelect.mockResolvedValueOnce({
        data: mockReturnedData,
        error: null,
      })

      const result = await dbInsert('posts' as Table, mockInsertData as any)

      expect(mockFrom).toHaveBeenCalledWith('posts')
      expect(result).toEqual(mockReturnedData)
    })
  })

  describe('dbUpdate', () => {
    it('should update a single record successfully', async () => {
      const changes = [
        {
          id: '123',
          change: { name: 'Updated Name' },
        },
      ]
      const mockReturnedData = [
        { id: '123', name: 'Updated Name', email: 'test@example.com' },
      ]

      mockSelect.mockResolvedValueOnce({
        data: mockReturnedData,
        error: null,
      })

      const result = await dbUpdate('users' as Table, changes as any)

      expect(mockFrom).toHaveBeenCalledWith('users')
      expect(mockUpdate).toHaveBeenCalledWith({ name: 'Updated Name' })
      expect(mockEq).toHaveBeenCalledWith('id', '123')
      expect(mockSelect).toHaveBeenCalled()
      expect(result.success).toEqual(mockReturnedData)
      expect(result.failed).toEqual([])
    })

    it('should update multiple records successfully', async () => {
      const changes = [
        { id: '1', change: { name: 'Name 1' } },
        { id: '2', change: { name: 'Name 2' } },
        { id: '3', change: { name: 'Name 3' } },
      ]

      // Mock responses for each update
      mockSelect
        .mockResolvedValueOnce({
          data: [{ id: '1', name: 'Name 1' }],
          error: null,
        })
        .mockResolvedValueOnce({
          data: [{ id: '2', name: 'Name 2' }],
          error: null,
        })
        .mockResolvedValueOnce({
          data: [{ id: '3', name: 'Name 3' }],
          error: null,
        })

      const result = await dbUpdate('users' as Table, changes as any)

      expect(mockUpdate).toHaveBeenCalledTimes(3)
      expect(mockEq).toHaveBeenCalledTimes(3)
      expect(mockEq).toHaveBeenNthCalledWith(1, 'id', '1')
      expect(mockEq).toHaveBeenNthCalledWith(2, 'id', '2')
      expect(mockEq).toHaveBeenNthCalledWith(3, 'id', '3')
      expect(result.success).toHaveLength(3)
      expect(result.failed).toEqual([])
    })

    it('should handle partial failures when some updates fail', async () => {
      const changes = [
        { id: '1', change: { name: 'Name 1' } },
        { id: '2', change: { name: 'Name 2' } },
        { id: '3', change: { name: 'Name 3' } },
      ]

      mockSelect
        .mockResolvedValueOnce({
          data: [{ id: '1', name: 'Name 1' }],
          error: null,
        })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Update failed'),
        })
        .mockResolvedValueOnce({
          data: [{ id: '3', name: 'Name 3' }],
          error: null,
        })

      const result = await dbUpdate('users' as Table, changes as any)

      expect(result.success).toHaveLength(2)
      expect(result.success.map((r: any) => r.id)).toEqual(['1', '3'])
      expect(result.failed).toHaveLength(1)
      expect(result.failed[0].id).toBe('2')
      expect(result.failed[0].error.message).toBe('Update failed')
    })

    it('should handle empty changes array', async () => {
      const result = await dbUpdate('users' as Table, [] as any)

      expect(mockUpdate).not.toHaveBeenCalled()
      expect(result.success).toEqual([])
      expect(result.failed).toEqual([])
    })

    it('should update records with complex change objects', async () => {
      const changes = [
        {
          id: '123',
          change: {
            name: 'Updated Name',
            email: 'new@example.com',
            active: true,
            updated_at: new Date().toISOString(),
          },
        },
      ]
      const mockReturnedData = [
        {
          id: '123',
          name: 'Updated Name',
          email: 'new@example.com',
          active: true,
          updated_at: changes[0].change.updated_at,
        },
      ]

      mockSelect.mockResolvedValueOnce({
        data: mockReturnedData,
        error: null,
      })

      const result = await dbUpdate('users' as Table, changes as any)

      expect(mockUpdate).toHaveBeenCalledWith(changes[0].change)
      expect(result.success).toEqual(mockReturnedData)
      expect(result.failed).toEqual([])
    })

    it('should work with different table types', async () => {
      const changes = [
        {
          id: '456',
          change: { title: 'Updated Title' },
        },
      ]

      mockSelect.mockResolvedValueOnce({
        data: [{ id: '456', title: 'Updated Title' }],
        error: null,
      })

      const result = await dbUpdate('posts' as Table, changes as any)

      expect(mockFrom).toHaveBeenCalledWith('posts')
      expect(result.success).toHaveLength(1)
      expect(result.failed).toEqual([])
    })

    it('should handle all updates failing', async () => {
      const changes = [
        { id: '1', change: { name: 'Name 1' } },
        { id: '2', change: { name: 'Name 2' } },
      ]

      mockSelect
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Update failed 1'),
        })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Update failed 2'),
        })

      const result = await dbUpdate('users' as Table, changes as any)

      expect(result.success).toEqual([])
      expect(result.failed).toHaveLength(2)
      expect(result.failed[0].id).toBe('1')
      expect(result.failed[1].id).toBe('2')
    })
  })

  describe('dbDelete', () => {
    it('should soft delete a single record successfully', async () => {
      mockRpc.mockResolvedValueOnce({
        data: null,
        error: null,
      })

      const result = await dbDelete('users' as Table, ['123'])

      expect(mockRpc).toHaveBeenCalledWith('soft_delete_record', {
        p_record_id: '123',
        p_table_name: 'users',
      })
      expect(mockRpc).toHaveBeenCalledTimes(1)
      expect(result.success).toEqual(['123'])
      expect(result.failed).toEqual([])
    })

    it('should soft delete multiple records successfully', async () => {
      const ids = ['1', '2', '3', '4', '5']

      mockRpc
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({ data: null, error: null })

      const result = await dbDelete('users' as Table, ids)

      expect(mockRpc).toHaveBeenCalledTimes(5)
      ids.forEach((id, index) => {
        expect(mockRpc).toHaveBeenNthCalledWith(
          index + 1,
          'soft_delete_record',
          {
            p_record_id: id,
            p_table_name: 'users',
          },
        )
      })
      expect(result.success).toEqual(ids)
      expect(result.failed).toEqual([])
    })

    it('should handle partial failures when some deletes fail', async () => {
      mockRpc
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Delete failed'),
        })
        .mockResolvedValueOnce({ data: null, error: null })

      const result = await dbDelete('users' as Table, ['1', '2', '3'])

      expect(mockRpc).toHaveBeenCalledTimes(3)
      expect(result.success).toEqual(['1', '3'])
      expect(result.failed).toHaveLength(1)
      expect(result.failed[0].id).toBe('2')
      expect(result.failed[0].error.message).toBe('Delete failed')
    })

    it('should handle empty ids array', async () => {
      const result = await dbDelete('users' as Table, [])

      expect(mockRpc).not.toHaveBeenCalled()
      expect(result.success).toEqual([])
      expect(result.failed).toEqual([])
    })

    it('should work with different table types', async () => {
      mockRpc.mockResolvedValueOnce({
        data: null,
        error: null,
      })

      const result = await dbDelete('posts' as Table, ['456'])

      expect(mockRpc).toHaveBeenCalledWith('soft_delete_record', {
        p_record_id: '456',
        p_table_name: 'posts',
      })
      expect(result.success).toEqual(['456'])
      expect(result.failed).toEqual([])
    })

    it('should handle deletion with UUID format IDs', async () => {
      const uuidId = '550e8400-e29b-41d4-a716-446655440000'

      mockRpc.mockResolvedValueOnce({
        data: null,
        error: null,
      })

      const result = await dbDelete('users' as Table, [uuidId])

      expect(mockRpc).toHaveBeenCalledWith('soft_delete_record', {
        p_record_id: uuidId,
        p_table_name: 'users',
      })
      expect(result.success).toEqual([uuidId])
      expect(result.failed).toEqual([])
    })

    it('should handle database errors gracefully', async () => {
      const mockError = new Error('Record not found')

      mockRpc.mockResolvedValueOnce({
        data: null,
        error: mockError,
      })

      const result = await dbDelete('users' as Table, ['999'])

      expect(result.success).toEqual([])
      expect(result.failed).toHaveLength(1)
      expect(result.failed[0].id).toBe('999')
      expect(result.failed[0].error.message).toBe('Record not found')
    })

    it('should process all deletes in parallel', async () => {
      const ids = ['1', '2', '3']
      const startTime = Date.now()

      // Simulate async operations
      mockRpc.mockImplementation(() =>
        Promise.resolve({ data: null, error: null }),
      )

      const result = await dbDelete('users' as Table, ids)

      const endTime = Date.now()
      const executionTime = endTime - startTime

      // Verify all were called (parallel execution should be fast)
      expect(mockRpc).toHaveBeenCalledTimes(3)
      expect(result.success).toEqual(ids)
      expect(result.failed).toEqual([])
      // Parallel execution should complete quickly (under 100ms for mocks)
      expect(executionTime).toBeLessThan(100)
    })

    it('should handle all deletes failing', async () => {
      const ids = ['1', '2', '3']

      mockRpc
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Failed 1'),
        })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Failed 2'),
        })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Failed 3'),
        })

      const result = await dbDelete('users' as Table, ids)

      expect(result.success).toEqual([])
      expect(result.failed).toHaveLength(3)
      expect(result.failed.map((f) => f.id)).toEqual(ids)
    })
  })

  describe('Integration scenarios', () => {
    it('should handle a complete CRUD workflow', async () => {
      // Insert
      mockSelect.mockResolvedValueOnce({
        data: [
          {
            id: '1',
            group_name: 'Test Group',
            short_name: 'TG',
            address: '123 Test St',
            phone: '555-1234',
          },
        ],
        error: null,
      })

      const inserted = await dbInsert(
        'groups' as Table,
        [
          {
            group_name: 'Test Group',
            short_name: 'TG',
            address: '123 Test St',
            phone: '555-1234',
          },
        ] as any,
      )

      expect(inserted).toHaveLength(1)
      expect(inserted[0].id).toBe('1')

      // Select
      mockSelect.mockResolvedValueOnce({
        data: [
          {
            id: '1',
            group_name: 'Test Group',
            short_name: 'TG',
            address: '123 Test St',
            phone: '555-1234',
          },
        ],
        error: null,
      })

      const selected = await dbSelectAll('groups' as Table)
      expect(selected).toHaveLength(1)

      // Update
      mockSelect.mockResolvedValueOnce({
        data: [
          {
            id: '1',
            group_name: 'Updated Group',
            short_name: 'TG',
            address: '123 Test St',
            phone: '555-1234',
          },
        ],
        error: null,
      })

      const updated = await dbUpdate(
        'groups' as Table,
        [{ id: '1', change: { group_name: 'Updated Group' } }] as any,
      )

      expect((updated.success[0] as any).group_name).toBe('Updated Group')
      expect(updated.failed).toEqual([])

      // Delete
      mockRpc.mockResolvedValueOnce({
        data: null,
        error: null,
      })

      const deleted = await dbDelete('groups' as Table, ['1'])

      expect(mockRpc).toHaveBeenCalledWith('soft_delete_record', {
        p_record_id: '1',
        p_table_name: 'groups',
      })
      expect(deleted.success).toEqual(['1'])
      expect(deleted.failed).toEqual([])
    })

    it('should handle bulk operations efficiently', async () => {
      // Bulk insert
      const insertData = Array.from({ length: 10 }, (_, i) => ({
        name: `User ${i}`,
        email: `user${i}@example.com`,
      }))

      const insertedData = insertData.map((data, i) => ({
        id: String(i + 1),
        ...data,
      }))

      mockSelect.mockResolvedValueOnce({
        data: insertedData,
        error: null,
      })

      const inserted = await dbInsert('users' as Table, insertData as any)
      expect(inserted).toHaveLength(10)

      // Bulk update
      const updateChanges = inserted.map((user, i) => ({
        id: user.id,
        change: { name: `Updated User ${i}` },
      }))

      // Mock each update response
      updateChanges.forEach((_, i) => {
        mockSelect.mockResolvedValueOnce({
          data: [{ id: String(i + 1), name: `Updated User ${i}` }],
          error: null,
        })
      })

      const updated = await dbUpdate('users' as Table, updateChanges as any)
      expect(updated.success).toHaveLength(10)
      expect(updated.failed).toEqual([])

      // Bulk delete
      const ids = inserted.map((user) => user.id)
      ids.forEach(() => {
        mockRpc.mockResolvedValueOnce({ data: null, error: null })
      })

      const deleted = await dbDelete('users' as Table, ids)
      expect(mockRpc).toHaveBeenCalledTimes(10)
      expect(deleted.success).toEqual(ids)
      expect(deleted.failed).toEqual([])
    })

    it('should handle mixed success and failure in bulk operations', async () => {
      // Bulk update with some failures
      const changes = [
        { id: '1', change: { name: 'Name 1' } },
        { id: '2', change: { name: 'Name 2' } },
        { id: '3', change: { name: 'Name 3' } },
        { id: '4', change: { name: 'Name 4' } },
      ]

      mockSelect
        .mockResolvedValueOnce({
          data: [{ id: '1', name: 'Name 1' }],
          error: null,
        })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Update failed'),
        })
        .mockResolvedValueOnce({
          data: [{ id: '3', name: 'Name 3' }],
          error: null,
        })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Update failed'),
        })

      const updated = await dbUpdate('users' as Table, changes as any)
      expect(updated.success).toHaveLength(2)
      expect(updated.failed).toHaveLength(2)
      expect(updated.success.map((r: any) => r.id)).toEqual(['1', '3'])
      expect(updated.failed.map((f) => f.id)).toEqual(['2', '4'])

      // Bulk delete with some failures
      const ids = ['1', '2', '3', '4']

      mockRpc
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Delete failed'),
        })
        .mockResolvedValueOnce({ data: null, error: null })
        .mockResolvedValueOnce({
          data: null,
          error: new Error('Delete failed'),
        })

      const deleted = await dbDelete('users' as Table, ids)
      expect(deleted.success).toEqual(['1', '3'])
      expect(deleted.failed).toHaveLength(2)
      expect(deleted.failed.map((f) => f.id)).toEqual(['2', '4'])
    })
  })

  describe('Error handling edge cases', () => {
    it('should handle network timeout errors', async () => {
      const timeoutError = new Error('Network timeout')

      mockSelect.mockResolvedValueOnce({
        data: null,
        error: timeoutError,
      })

      await expect(dbSelectAll('users' as Table)).rejects.toThrow(
        'Network timeout',
      )
    })

    it('should handle permission denied errors', async () => {
      const permissionError = new Error('Permission denied')

      mockSelect.mockResolvedValueOnce({
        data: null,
        error: permissionError,
      })

      await expect(
        dbInsert('users' as Table, [{ name: 'Test' }] as any),
      ).rejects.toThrow('Permission denied')
    })

    it('should handle foreign key constraint violations', async () => {
      const constraintError = new Error('Foreign key constraint violation')

      mockSelect.mockResolvedValueOnce({
        data: null,
        error: constraintError,
      })

      await expect(
        dbInsert('posts' as Table, [{ user_id: '999', title: 'Test' }] as any),
      ).rejects.toThrow('Foreign key constraint violation')
    })
  })
})
