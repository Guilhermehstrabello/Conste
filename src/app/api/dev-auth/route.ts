import { cookies } from 'next/headers';
import crypto from 'crypto';

export const runtime = 'nodejs';

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

export async function POST(req: Request) {
  if (!isDevModeEnabled()) {
    return new Response(JSON.stringify({ error: 'Dev mode not enabled' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!isLocalDev() && (!body.code || body.code !== process.env.DEV_ACCESS_CODE)) {
      return new Response(JSON.stringify({ error: 'Invalid dev access code' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    if (isLocalDev() && !email) {
      return new Response(JSON.stringify({ error: 'Email is required for local dev login' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const expectedToken = createDevAuthToken();
    const secureCookie = process.env.NODE_ENV === 'production';
    const maxAge = 60 * 60 * 24; // 1 day

    const response = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `dev-auth=${expectedToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureCookie ? '; Secure' : ''}`,
      },
    });

    return response;
  } catch (err) {
    console.error('API /api/dev-auth error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function GET(req: Request) {
  if (!isDevModeEnabled()) {
    return new Response(JSON.stringify({ error: 'Dev mode not enabled' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }

  const cookieStore = await cookies();
  const devAuth = cookieStore.get('dev-auth')?.value;
  const isValid = devAuth === createDevAuthToken();

  if (!isValid) {
    return new Response(JSON.stringify({ authenticated: false }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({ authenticated: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
