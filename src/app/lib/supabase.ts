import { createClient } from '@supabase/supabase-js';

// Lazy public supabase client creation to avoid build-time errors when envs are missing
import { SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

export function getSupabase() {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    // eslint-disable-next-line no-console
    console.warn('Supabase public env vars missing: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
    return null;
  }
  _supabase = createClient(url, key);
  return _supabase;
}

// Backwards-compatible export (may be null if envs not set)
export const supabase = getSupabase();
