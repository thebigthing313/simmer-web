import { getSupabaseClient } from '@/simmerbase/client';
import {
    ZodGroupsInsertToDb,
    type ZodGroupsInsertToDbType,
    ZodGroupsRow,
    type ZodGroupsRowType,
    ZodGroupsUpdateToDb,
    type ZodGroupsUpdateToDbType,
} from "../../schemas/groups";
import { createSupabaseCollection } from "../collection-factory";

export const groups = createSupabaseCollection<
    ZodGroupsRowType,
    ZodGroupsInsertToDbType,
    ZodGroupsUpdateToDbType
>(
    "groups",
    {
        rowSchema: ZodGroupsRow,
        insertSchema: ZodGroupsInsertToDb,
        updateSchema: ZodGroupsUpdateToDb,
    },
    {
        staleTime: Infinity,
    },
)();