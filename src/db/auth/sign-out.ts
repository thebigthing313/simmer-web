import { supabase } from "@/db/client";

export function signOut() {
  return supabase.auth.signOut();
}
