import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

const protectedRoutes = ['/admin/dashboard', '/admin/pending-canchas'];

export default async function middleware(req: NextRequest) {
  const session = await auth();

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) return NextResponse.next();

  if (!session) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  if (session.user?.email !== process.env.MAIL) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}
