import {
    ZodGroupProfilesInsertToDb,
    type ZodGroupProfilesInsertToDbType,
    ZodGroupProfilesRow,
    type ZodGroupProfilesRowType,
    ZodGroupProfilesUpdateToDb,
    type ZodGroupProfilesUpdateToDbType,
} from "../../schemas/group_profiles";
import { createSupabaseCollection } from "../collection-factory";

export const group_profiles = createSupabaseCollection<
    ZodGroupProfilesRowType,
    ZodGroupProfilesInsertToDbType,
    ZodGroupProfilesUpdateToDbType
>(
    "group_profiles",
    {
        rowSchema: ZodGroupProfilesRow,
        insertSchema: ZodGroupProfilesInsertToDb,
        updateSchema: ZodGroupProfilesUpdateToDb,
    },
    {
        staleTime: Infinity,
    },
)();