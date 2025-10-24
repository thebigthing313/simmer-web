import { createCollection } from "@tanstack/react-db";
import { DBWholeCollectionOptions } from "@/db/collections/generic-collection-options";

export const groupsCollection = createCollection(
  DBWholeCollectionOptions("groups", 1000 * 60 * 60),
); // 1 hour
export const profilesCollection = createCollection(
  DBWholeCollectionOptions("profiles", 1000 * 60 * 60),
); // 1 hour

export const groupProfilesCollection = createCollection(
  DBWholeCollectionOptions("group_profiles", 1000 * 60 * 30),
); // 30 minutes

export const groupInvitesCollection = createCollection(
  DBWholeCollectionOptions("group_invites", 1000 * 60 * 30),
); // 30 minutes
