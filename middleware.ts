import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Por ora, vamos simplificar o middleware para evitar problemas de API
  // A proteção será feita no lado do cliente através dos componentes
  
  // Apenas permitir todas as rotas passarem
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
};