import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are set in your .env file
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Supabase environment variables are not set for server-side client. Make sure VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are defined.");
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);