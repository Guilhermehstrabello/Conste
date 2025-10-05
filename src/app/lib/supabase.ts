import { createClient } from '@supabase/supabase-js';

// Expect these to be provided as NEXT_PUBLIC_ env vars
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Don't throw here so dev server won't crash; log a clear warning
  // In production you should ensure these are set and fail fast if desired
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
