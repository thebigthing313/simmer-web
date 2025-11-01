# Collection Factory

A type-safe factory for creating TanStack DB collections backed by Supabase with built-in CRUD operations, optimistic updates, and Zod schema validation.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)
- [Examples](#examples)

## Overview

The collection factory provides a standardized way to create TanStack DB collections that automatically handle:

- ✅ **Type-safe CRUD operations** with Zod schema validation
- ✅ **Optimistic updates** for immediate UI feedback
- ✅ **Server synchronization** with Supabase
- ✅ **Soft deletes** by default (using database function)
- ✅ **Customizable mutation handlers** for special cases
- ✅ **Parameterized queries** for filtering/searching

## Features

### Type Safety

All operations are fully type-safe thanks to TypeScript and Zod:

- Input validation with `insertSchema` and `updateSchema`
- Output parsing with `rowSchema`
- Automatic type inference from schemas

### Optimistic Updates

Changes appear instantly in the UI while syncing to the server in the background. If the server request fails, changes are automatically rolled back.

### Flexible Querying

- **Default Query**: Simple `SELECT *` from the table
- **Custom Query Function**: Filter, join, or transform data
- **Parameterized Queries**: Pass arguments for dynamic filtering

### Soft Deletes

By default, deletions use the `soft_delete_record` database function which sets `deleted_at` and `deleted_by` columns instead of permanently removing records.

## Basic Usage

### 1. Define Your Schemas

```typescript
import { z } from 'zod';

// Full record shape (as returned from database)
const userRowSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable()
});

// Insert shape (what you provide when creating)
const userInsertSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string()
});

// Update shape (partial updates)
const userUpdateSchema = userInsertSchema.partial().omit({ id: true });

type User = z.infer<typeof userRowSchema>;
type UserInsert = z.infer<typeof userInsertSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>;
```

### 2. Create the Collection Factory

```typescript
import { createSupabaseCollection } from '@/simmerbase/db/collection-factory';

const createUsersCollection = createSupabaseCollection<User, UserInsert, UserUpdate>(
  'users', // table name
  {
    rowSchema: userRowSchema,
    insertSchema: userInsertSchema,
    updateSchema: userUpdateSchema
  },
  {
    staleTime: 5000 // Optional: TanStack Query config
  }
);
```

### 3. Use the Collection in Your Component

```typescript
function UserList() {
  const usersCollection = createUsersCollection();
  const users = usersCollection.useItems();

  const handleAddUser = () => {
    usersCollection.insert({
      id: crypto.randomUUID(),
      email: 'new@example.com',
      name: 'New User'
    });
  };

  const handleUpdateUser = (id: string) => {
    usersCollection.updateById(id, {
      name: 'Updated Name'
    });
  };

  const handleDeleteUser = (id: string) => {
    usersCollection.deleteById(id);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button onClick={() => handleUpdateUser(user.id)}>Edit</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}
```

## Advanced Usage

### Custom Query Function

Filter or transform data before it reaches the collection:

```typescript
const createActiveUsersCollection = createSupabaseCollection<User, UserInsert, UserUpdate>(
  'users',
  schemas,
  async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .is('deleted_at', null) // Only active users
      .order('name', { ascending: true });

    if (error) throw error;
    return data.map((item) => userRowSchema.parse(item));
  },
  {
    staleTime: 10000
  }
);
```

### Parameterized Queries

Create collections that accept parameters for dynamic filtering:

```typescript
const createUsersByRoleCollection = createSupabaseCollection<
  [role: string], // Parameter types
  User,
  UserInsert,
  UserUpdate
>(
  'users',
  schemas,
  async (role: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('users').select('*').eq('role', role).is('deleted_at', null);

    if (error) throw error;
    return data.map((item) => userRowSchema.parse(item));
  },
  {
    staleTime: 5000
  }
);

// Usage in component
function AdminUsers() {
  const adminsCollection = createUsersByRoleCollection('admin');
  const admins = adminsCollection.useItems();
  // ...
}
```

### Custom Mutation Handlers

Override default CRUD behavior for special cases:

```typescript
const createUsersCollection = createSupabaseCollection<User, UserInsert, UserUpdate>('users', schemas, {
  staleTime: 5000,

  // Custom insert with additional validation
  onInsert: async ({ transaction, collection }) => {
    const newItems = transaction.mutations.map((m) => m.modified);

    // Custom validation
    for (const item of newItems) {
      if (item.email.endsWith('@blocked.com')) {
        throw new Error('This email domain is blocked');
      }
    }

    // Perform insert
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('users').insert(newItems).select('*');

    if (error) throw error;

    // Update local cache
    collection.utils.writeBatch(() => {
      data.forEach((item) => {
        collection.utils.writeUpsert(userRowSchema.parse(item));
      });
    });

    return { refetch: false };
  },

  // Hard delete instead of soft delete
  onDelete: async ({ transaction, collection }) => {
    const ids = transaction.mutations.map((m) => m.key);

    const supabase = getSupabaseClient();
    const { error } = await supabase.from('users').delete().in('id', ids);

    if (error) throw error;

    collection.utils.writeBatch(() => {
      ids.forEach((id) => collection.utils.writeDelete(id));
    });

    return { refetch: false };
  }
});
```

## API Reference

### `createSupabaseCollection`

Creates a collection factory function.

#### Signatures

```typescript
// 1. Simple collection with default query
createSupabaseCollection<TItem, TInsert, TUpdate>(
  tableName: Table,
  schemas: CollectionSchemas<TItem, TInsert, TUpdate>,
  config: FactoryConfig<TItem>
): () => Collection<TItem>

// 2. Collection with custom query function
createSupabaseCollection<TItem, TInsert, TUpdate>(
  tableName: Table,
  schemas: CollectionSchemas<TItem, TInsert, TUpdate>,
  customQueryFn: () => Promise<TItem[]>,
  config: FactoryConfig<TItem>
): () => Collection<TItem>

// 3. Parameterized collection with custom query function
createSupabaseCollection<TParams[], TItem, TInsert, TUpdate>(
  tableName: Table,
  schemas: CollectionSchemas<TItem, TInsert, TUpdate>,
  customQueryFn: (...params: TParams) => Promise<TItem[]>,
  config: FactoryConfig<TItem>
): (...params: TParams) => Collection<TItem>
```

#### Parameters

- **`tableName`**: The Supabase table name (must be a valid `Table` type)
- **`schemas`**: Object containing three Zod schemas:
  - `rowSchema`: Full record shape from database
  - `insertSchema`: Shape for creating new records
  - `updateSchema`: Shape for updating existing records
- **`customQueryFn`** (optional): Custom function to fetch data
- **`config`**: Configuration object with:
  - `staleTime`: How long data is considered fresh (ms)
  - `enabled`: Whether queries should run automatically
  - `onInsert`: Custom insert handler
  - `onUpdate`: Custom update handler
  - `onDelete`: Custom delete handler
  - Any other TanStack Query/DB options

#### Returns

A factory function that creates collection instances. Call it to get a collection, optionally passing parameters if using a parameterized query.

### Collection Instance Methods

The returned collection provides TanStack DB's standard API:

```typescript
const collection = createMyCollection();

// Reading data
const items = collection.useItems(); // All items
const item = collection.useItemById('id'); // Single item
const status = collection.useStatus(); // Query status

// Mutations
collection.insert(newItem); // Add new item
collection.updateById('id', changes); // Update item
collection.deleteById('id'); // Delete item
collection.updateMany(['id1', 'id2'], changes); // Update multiple
collection.deleteMany(['id1', 'id2']); // Delete multiple

// Direct cache access
collection.utils.writeUpsert(item); // Update cache
collection.utils.writeDelete('id'); // Remove from cache
collection.utils.writeBatch(() => {
  /* batch operations */
});
```

## Examples

### Todo List with Categories

```typescript
import { z } from 'zod';
import { createSupabaseCollection } from '@/simmerbase/db/collection-factory';

// Schemas
const todoSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  completed: z.boolean(),
  category_id: z.string().uuid(),
  created_at: z.date()
});

const todoInsertSchema = todoSchema.omit({ created_at: true });
const todoUpdateSchema = todoSchema.partial().omit({ id: true, created_at: true });

type Todo = z.infer<typeof todoSchema>;
type TodoInsert = z.infer<typeof todoInsertSchema>;
type TodoUpdate = z.infer<typeof todoUpdateSchema>;

// Factory with filtering by category
const createTodosByCategoryCollection = createSupabaseCollection<[categoryId: string], Todo, TodoInsert, TodoUpdate>(
  'todos',
  {
    rowSchema: todoSchema,
    insertSchema: todoInsertSchema,
    updateSchema: todoUpdateSchema
  },
  async (categoryId: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('category_id', categoryId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map((item) => todoSchema.parse(item));
  },
  {
    staleTime: 30000 // 30 seconds
  }
);

// Component
function TodoList({ categoryId }: { categoryId: string }) {
  const todosCollection = createTodosByCategoryCollection(categoryId);
  const todos = todosCollection.useItems();

  const handleToggle = (id: string, completed: boolean) => {
    todosCollection.updateById(id, { completed: !completed });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type='checkbox' checked={todo.completed} onChange={() => handleToggle(todo.id, todo.completed)} />
          <span>{todo.title}</span>
        </li>
      ))}
    </ul>
  );
}
```

### User Settings with Hard Delete

```typescript
const createUserSettingsCollection = createSupabaseCollection<UserSetting, UserSettingInsert, UserSettingUpdate>('user_settings', schemas, {
  // Use hard delete for settings
  onDelete: async ({ transaction, collection }) => {
    const ids = transaction.mutations.map((m) => m.key);

    const supabase = getSupabaseClient();
    const { error } = await supabase.from('user_settings').delete().in('id', ids);

    if (error) throw error;

    collection.utils.writeBatch(() => {
      ids.forEach((id) => collection.utils.writeDelete(id));
    });

    return { refetch: false };
  }
});
```

## Architecture Notes

### Why Factory Pattern?

The factory returns a **function that creates collections** rather than the collection directly. This allows:

- Proper TypeScript type inference
- Support for parameterized queries
- Multiple independent collection instances
- Better caching strategies with TanStack Query

### Mutation Flow

1. **User triggers mutation** (insert/update/delete)
2. **Optimistic update** - UI updates immediately
3. **Schema validation** - Input validated with Zod
4. **Server request** - Data sent to Supabase
5. **Response validation** - Server response parsed with Zod
6. **Cache update** - Local cache synced with server response
7. **Rollback on error** - If any step fails, changes are reverted

### Soft Delete Details

The default delete handler calls the `soft_delete_record` Postgres function which:

- Sets `deleted_at` to current timestamp
- Sets `deleted_by` to current user's ID
- Keeps the record in the database for audit trails
- Can be filtered out in queries with `.is('deleted_at', null)`

Override with `onDelete` in config for hard deletes.

---

**Related Files:**

- `collection-factory.ts` - Main implementation
- `../client.ts` - Supabase client instance
- `../data-types.ts` - Table type definitions
