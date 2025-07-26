import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const abCookie = request.cookies.get('ab-variant')

  if (!abCookie) {
    const variant = Math.random() < 0.5 ? 'a' : 'b'
    response.cookies.set('ab-variant', variant, {
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })
    return NextResponse.redirect(new URL(`/ab/${variant}`, request.url))
  }

  // Se estiver acessando /, redireciona para a variante correta
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/ab/${abCookie.value}`, request.url))
  }

  return response
}

export const config = {
  matcher: ['/', '/ab'], // Aplica o middleware somente nessas rotas
}
