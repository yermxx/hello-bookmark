import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  const path = req.nextUrl.pathname;
  if (!didLogin) {
    const callbackUrl = encodeURIComponent(path);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|regist|$).*)',
  ],
};
