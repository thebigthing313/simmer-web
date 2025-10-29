# Schema Code Generator

This script automatically generates Zod schemas for your Supabase tables.

## Usage

Run the code generator from the project root:

```bash
pnpm tsx src/simmerbase/schemas/code-gen.ts <table-name>
```

### Example

```bash
pnpm tsx src/simmerbase/schemas/code-gen.ts profiles
```

This will generate a file at `src/simmerbase/schemas/profiles.ts` containing:

- Zod schemas for Row, Insert, and Update operations
- Type-safe TypeScript types derived from the schemas
- Proper field mappings with validation

## Field Mappings

The code generator automatically maps Supabase fields to appropriate Zod schemas:

### UUID Fields

- `id` → `z.string().uuid()`
- Fields ending in `_id` → `z.string().uuid()`
- Fields ending in `_by` → `z.string().uuid()`

### Date/Time Fields

- Fields ending in `_at` (timestamps) → `z.date()`
  - Supabase returns ISO strings
  - Your app consumes as `Date` objects
- Fields ending in `_date` (dates) → `z.date()`
  - Supabase returns ISO date strings (e.g., '2024-01-15')
  - Your app consumes as `Date` objects
  - Use `parseDate()` utility to append 'T00:00:00Z' for UTC interpretation

### Special Fields

- Fields named `geom` → `GeoJSONSchema`
  - PostGIS geometry data (unknown type in Supabase)
  - Returns as GeoJSON when queried via RPC
- Fields containing `email` → `EmailSchema`
- Fields containing `phone` → `PhoneNumberSchema`
- Fields containing `name` → `NameSchema`
- Fields containing `url` → `z.url()`

### Enums

- Automatically extracts and maps Supabase enum types
- Generates type-safe `z.enum()` with all possible values

### Primitives

- `string` → `z.string()`
- `number` → `z.number()`
- `boolean` → `z.boolean()`
- `Json` → `z.any()`

All mappings automatically handle nullable fields with `.nullable()`.

## Automatic Date Preprocessing

**NEW in Zod v4!** The generated schemas now include automatic preprocessing for date fields. You can validate data directly from Supabase without manual transformation:

```typescript
import { ZodGroupsRow } from './schemas/groups';

// Raw data from Supabase (dates are ISO strings)
const rawGroup = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  group_name: 'Acme Corp',
  created_at: '2024-01-15T10:30:00Z' // ISO string
  // ... other fields
};

// Automatically converts strings to Date objects!
const validated = ZodGroupsRow.parse(rawGroup);
console.log(validated.created_at instanceof Date); // true ✨
```

The preprocessing handles:

- **`*_at` fields**: ISO timestamp strings → `Date` objects
- **`*_date` fields**: Date strings → `Date` objects (with UTC timezone enforcement)

## Manual Data Transformation (Optional)

If you prefer explicit transformation or need more control, transformation utilities are still available:

```typescript
import { transformRow, transformRows } from './schemas/transform-utils';

// Transform a single row (pass table name for type inference)
const user = transformRow(rawUserFromSupabase, 'profiles');

// Transform multiple rows
const users = transformRows(rawUsersFromSupabase, 'profiles');
```

### Manual Transformation

For fine-grained control:

```typescript
import { parseTimestamp, parseDate } from './schemas/transform-utils';

// Parse timestamp fields (_at)
const createdAt = parseTimestamp(row.created_at); // '2024-01-15T10:30:00Z' → Date

// Parse date fields (_date)
const birthDate = parseDate(row.birth_date); // '2024-01-15' → Date (UTC)
```

## Generated File Structure

```typescript
// Auto-generated comments with preprocessing instructions
import z from 'zod';
import type { AssertEqual, InsertRow, Row, UpdateRow } from '../data-types';
import { EmailSchema, PhoneNumberSchema } from './fields';

// Type aliases from Supabase
type Profiles = Row<'profiles'>;
type ProfilesInsert = InsertRow<'profiles'>;
type ProfilesUpdate = UpdateRow<'profiles'>;

// Zod schema for Row (all fields)
export const ZodProfilesRow = z.object({
  // ... generated fields
});

// Zod schema for Insert (excludes auto-generated fields)
export const ZodProfilesInsert = ZodProfilesRow.extend({
  // ... generated fields
}).omit({
  created_at: true,
  created_by: true,
  deleted_at: true,
  deleted_by: true,
  updated_at: true,
  updated_by: true
});

// Zod schema for Update (all fields optional)
export const ZodProfilesUpdate = ZodProfilesRow.partial().omit({
  created_at: true,
  created_by: true,
  deleted_at: true,
  deleted_by: true,
  updated_at: true,
  updated_by: true
});

// TypeScript types
export type ZodProfilesRowType = z.infer<typeof ZodProfilesRow>;
export type ZodProfilesInsertType = z.infer<typeof ZodProfilesInsert>;
export type ZodProfilesUpdateType = z.infer<typeof ZodProfilesUpdate>;
```

## Regenerating Schemas

After updating your Supabase schema:

1. Regenerate your `supabase-types.ts` file using Supabase CLI
2. Run the code generator for each affected table
3. Review the generated schemas to ensure correct mappings

## Customization

If you need custom validation for specific fields:

1. Edit `src/simmerbase/schemas/fields.ts` to add new schema definitions
2. Update the `mapTypeToZod()` function in `code-gen.ts` to use your custom schema
3. Update the `getImports()` function to include your new import

### Example: Adding a Custom Schema

```typescript
// In fields.ts
export const UsernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username cannot exceed 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');

// In code-gen.ts mapTypeToZod()
if (field === 'username') {
  return isNullable ? 'UsernameSchema.nullable()' : 'UsernameSchema';
}

// In code-gen.ts getImports()
if (field === 'username') imports.add('UsernameSchema');
```
