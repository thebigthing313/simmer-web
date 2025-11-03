import {
    ZodProfilesInsertToDb,
    type ZodProfilesInsertToDbType,
    ZodProfilesRow,
    type ZodProfilesRowType,
    ZodProfilesUpdateToDb,
    type ZodProfilesUpdateToDbType,
} from "../../schemas/profiles";
import { createSupabaseCollection } from "../collection-factory";

export const profiles = createSupabaseCollection<
    ZodProfilesRowType,
    ZodProfilesInsertToDbType,
    ZodProfilesUpdateToDbType
>(
    "profiles",
    {
        rowSchema: ZodProfilesRow,
        insertSchema: ZodProfilesInsertToDb,
        updateSchema: ZodProfilesUpdateToDb,
    },
    {
        staleTime: Infinity,
    },
)();