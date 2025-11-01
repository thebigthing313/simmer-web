import {
    ZodGroupInvitesInsertToDb,
    type ZodGroupInvitesInsertToDbType,
    ZodGroupInvitesRow,
    type ZodGroupInvitesRowType,
    ZodGroupInvitesUpdateToDb,
    type ZodGroupInvitesUpdateToDbType,
} from "../../schemas/group_invites";
import { createSupabaseCollection } from "../collection-factory";

export const group_invites = createSupabaseCollection<
    ZodGroupInvitesRowType,
    ZodGroupInvitesInsertToDbType,
    ZodGroupInvitesUpdateToDbType
>(
    "group_invites",
    {
        rowSchema: ZodGroupInvitesRow,
        insertSchema: ZodGroupInvitesInsertToDb,
        updateSchema: ZodGroupInvitesUpdateToDb,
    },
    {
        staleTime: Infinity,
    },
)();