import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLISHABLE_KEY!, // Key for retrieving data for public usage 
);

export { supabase };