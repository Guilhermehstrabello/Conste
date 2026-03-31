export const runtime = 'nodejs';

export async function GET() {
  try {
    const hasPublicUrl = typeof process.env.NEXT_PUBLIC_SUPABASE_URL === 'string' && process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0;
    const hasPublishableKey = typeof process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY === 'string' && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.length > 0;

    // Do NOT return keys/values. Only return presence flags and runtime info.
    return new Response(JSON.stringify({
      ok: true,
      runtime: process.env.NODE_ENV || null,
      hasPublicUrl,
      hasPublishableKey,
      note: 'Service key must be set as server-side env (not NEXT_PUBLIC). Do not expose it in client.'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('supabase-health error', err);
    return new Response(JSON.stringify({ ok: false, error: 'internal' }), { status: 500 });
  }
}
