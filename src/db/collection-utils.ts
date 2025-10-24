const canonicalKeyMap = new Map<string, object>();

/**
 * Generates a stable, unique string key from any number of primitive arguments.
 * @param args - An array of primitive values (number, string, boolean, null, undefined).
 * @returns A stable, unique string key.
 */
export const serializeKey = (...args: Array<any>): string => {
  return args
    .map((arg) => {
      if (typeof arg === "object" && arg !== null) {
        return String(arg);
      }
      return String(arg);
    })
    .join("::");
};

/**
 * Ensures a single, stable object reference for a variable number of parameters.
 * * @template T - The specific object type the caller expects the key to be
 * (e.g., { year: number, employee_id: string }).
 * @param args - The parameters (e.g., year, employee_id).
 * @returns The stable object reference, asserted to type T.
 */
export const getCanonicalKey = <T extends object>(
  ...args: Array<string | number | boolean | null | undefined>
): T => {
  const serializedKey = serializeKey(...args);

  if (!canonicalKeyMap.has(serializedKey)) {
    // Store an empty object, asserting it as type T for safety
    canonicalKeyMap.set(serializedKey, {} as T);
  }

  // Retrieve the reference, asserting the return type as T
  return canonicalKeyMap.get(serializedKey)! as T;
};

// ====================================================================
// FORWARD TRANSFORMATION (Read: string from DB -> Date for App)
// ====================================================================

/**
 * Transforms string dates/timestamps in a record into native JavaScript Date objects
 * based on the '_at' and '_date' naming conventions.
 * Appends 'T00:00:00.000Z' to date-only fields to ensure UTC interpretation.
 * @param record The raw object returned from Supabase.
 * @returns The object with date fields converted to Date objects.
 */
export function transformDates<T>(record: T): T {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return record;
  }

  const newRecord = { ...record };

  for (const key in newRecord) {
    if (Object.hasOwn(newRecord, key)) {
      const value = newRecord[key];

      if (typeof value === "string") {
        let date: Date | null = null;

        // --- Date-Only Fields ---
        if (key.endsWith("_date")) {
          // Force UTC interpretation by appending the time/zone indicator.
          date = new Date(value + "T00:00:00.000Z");
        } // --- Timestamp Fields ---
        else if (key.endsWith("_at")) {
          // Timestamps already contain the zone, so use them directly.
          date = new Date(value);
        }

        if (date && !isNaN(date.getTime())) {
          // @ts-expect-error - TS ignores the potential Date assignment error here
          newRecord[key] = date;
        }
      }
    }
  }

  // Returns the record with Date objects, asserted as the input type T
  return newRecord as T;
}

// ====================================================================
// REVERSE TRANSFORMATION (Write: Date from App -> string for DB)
// ====================================================================

/**
 * Transforms native JavaScript Date objects in a record back into ISO 8601 strings
 * for insertion or update in the Supabase API.
 * @param record The object from the application (potentially with Date objects).
 * @returns The object with Date fields converted to ISO strings.
 */
export function transformDatesToStrings<T>(record: T): T {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    return record;
  }

  const newRecord = { ...record };

  for (const key in newRecord) {
    if (Object.hasOwn(newRecord, key)) {
      const value = newRecord[key];

      // Check if the value is a native Date object
      if (value instanceof Date) {
        // @ts-expect-error - TS ignores the potential Date assignment error here
        newRecord[key] = value.toISOString();
      }
    }
  }

  // Returns the record with string dates, asserted as the input type T
  return newRecord as T;
}

// ====================================================================
// DATABASE API FUNCTIONS
// ====================================================================
