import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const noIndexPaths = ['/admin', '/results', '/report', '/thank-you'];

  if (noIndexPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/results', '/report', '/thank-you'],
};
