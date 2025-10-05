import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hasPublicUrl = typeof process.env.NEXT_PUBLIC_SUPABASE_URL === 'string' && process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0;
    const hasAnon = typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'string' && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0;
    const hasService = typeof process.env.SUPABASE_SERVICE_ROLE_KEY === 'string' && process.env.SUPABASE_SERVICE_ROLE_KEY.length > 0;

    return res.status(200).json({
      ok: true,
      runtime: process.env.NODE_ENV || null,
      hasPublicUrl,
      hasAnon,
      hasService,
      note: 'Service key must be set as server-side env (not NEXT_PUBLIC). Do not expose it in client.'
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('pages supabase-health error', err);
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}
