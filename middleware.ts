import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('auth_session');
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/api/logout'];
  
  if (publicPaths.some(path => pathname.startsWith(path))) {
    // If user is logged in and trying to access login page, redirect to their dashboard
    if (sessionCookie && pathname === '/login') {
      try {
        const session = JSON.parse(sessionCookie.value);
        return NextResponse.redirect(
          new URL(session.role === 'admin' ? '/admin' : '/student', request.url)
        );
      } catch {
        // Invalid session, continue to login
      }
    }
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    
    // Role-based access control
    if (pathname.startsWith('/admin') && session.role !== 'admin') {
      return NextResponse.redirect(new URL('/student', request.url));
    }
    
    if (pathname.startsWith('/student') && session.role !== 'student') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    return NextResponse.next();
  } catch {
    // Invalid session, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
};
