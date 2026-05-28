import { createClient } from '@supabase/supabase-js';
import { cookies, headers } from 'next/headers';
import crypto from 'crypto';

export const runtime = 'nodejs';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey);
}

function isLocalDev() {
  return process.env.NODE_ENV === 'development';
}

function isDevModeEnabled() {
  return isLocalDev() || (process.env.NEXT_PUBLIC_DEV_MODE === 'true' && typeof process.env.DEV_ACCESS_CODE === 'string' && process.env.DEV_ACCESS_CODE.length > 0);
}

function createDevAuthToken() {
  const secret = process.env.DEV_AUTH_SECRET || 'dev-secret';
  const code = isLocalDev() ? 'local-dev' : process.env.DEV_ACCESS_CODE || '';
  return crypto.createHmac('sha256', secret).update(code).digest('hex');
}

function verifyDevAuthToken(token: string | undefined) {
  if (!isDevModeEnabled() || !token) return false;
  return token === createDevAuthToken();
}

export async function GET(req: Request) {
  try {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    let isDevAuth = false;
    let bearerToken: string | null = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      bearerToken = authHeader.substring(7);
    } else {
      const cookieStore = await cookies();
      const devAuthToken = cookieStore.get('dev-auth')?.value;
      isDevAuth = verifyDevAuthToken(devAuthToken);
    }

    if (!isDevAuth && !bearerToken) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Missing or invalid token' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return new Response(
        JSON.stringify({ error: 'Admin client not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let userEmail: string | null = null;

    if (!isDevAuth) {
      const token = bearerToken!;
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

      if (authError || !user) {
        console.error('Token verification failed:', authError);
        return new Response(
          JSON.stringify({ error: 'Unauthorized: Invalid token' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      userEmail = user.email || null;
      const allowedEmails = (process.env.NEXT_PUBLIC_BLOG_ALLOWED_EMAILS || '')
        .split(',')
        .map((email) => email.trim())
        .filter((email) => email.length > 0);

      if (!allowedEmails.includes(userEmail || '')) {
        console.error(`Access denied for user: ${user.email}`);
        return new Response(
          JSON.stringify({ error: 'Forbidden: User not authorized' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database fetch error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ leads: data || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API /api/admin/leads error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
