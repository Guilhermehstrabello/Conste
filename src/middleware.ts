import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get('host') || '';

  // Roteamento por subdomínio
  if (host.startsWith('construcao.')) {
    const url = req.nextUrl.clone();
    url.pathname = `/construcao${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  if (host.startsWith('nps.')) {
    const url = req.nextUrl.clone();
    url.pathname = `/nps${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Lógica original — apenas permitir todas as rotas passarem
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|_next/webpack|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.woff|.*\\.woff2).*)'],
};