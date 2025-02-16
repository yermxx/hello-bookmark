export { auth as middleware } from '@/lib/auth';

// export default async function middleware(req: NextRequest) {
//   const session = await auth();
//   const didLogin = !!session?.user;
//   const path = req.nextUrl.pathname;
//   if (!didLogin) {
//     const callbackUrl = encodeURIComponent(path);
//     return NextResponse.redirect(
//       new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
//     );
//   }
//   return NextResponse.next();
// }

// export default auth((req) => {
//   console.log('Auth in middleware:', req.auth);
//   return null;
// });

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|login|api/regist|samples|$).*)',
  ],
};
