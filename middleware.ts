import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get('adminAuthToken');
  const userToken = request.cookies.get('userAuthToken');

  const { pathname } = request.nextUrl;

  // Check if the route is an admin route
  if (pathname.startsWith('/Admin/Dashboard')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/Admin/Login', request.url));
    }
  }

  // Check if the route is a user route
//   if (pathname.startsWith('/User')) {
//     if (!userToken) {
//       return NextResponse.redirect(new URL('/user-login', request.url));
//     }
//   }

//   return NextResponse.next();
// }
}