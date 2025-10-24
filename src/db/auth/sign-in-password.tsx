import { supabase } from "../client";

export function signInWithPassword(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}
