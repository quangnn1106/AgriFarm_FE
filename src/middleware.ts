import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN } from './utils/config';

import { cookies } from 'next/headers';
import { withAuth } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

// import { match } from 'path-to-regexp';
export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: match('/dashboard/:path*')
// };

// export async function middleware(req: NextRequest) {
//   const nextUrl = req.nextUrl;

//   const accessToken = cookies().get(ACCESS_TOKEN)?.value;
//   // console.log('values cookies: ', accessToken);

//   if (nextUrl.pathname.startsWith('/')) {
//     if (accessToken) {
//       return NextResponse.rewrite(new URL(req.nextUrl));
//     } else {
//       return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
//     }
//   }
//   return;
// }
// const secret = process.env.NEXTAUTH_SECRET;
// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   async function middleware(req) {
//     console.log('token gg', req.nextauth.token);
//     console.log('aaa', req.cookies.get(ACCESS_TOKEN)?.value);
//     const isOnLoginPage = req.nextUrl?.pathname.startsWith('/auth/login');
//     const token = await getToken({ req, secret });
//     console.log('JSON Web Token', token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) =>
//         token || req.cookies.get(ACCESS_TOKEN)?.value ? true : false
//     },
//     pages: {
//       signIn: '/login'
//     }
//   }
// );

export const config = {
  matcher: [
    // '/lead/:path*',
    // '/dashboard/:path*',
    // '/contact/:path*',
    // '/tasks/:path*',
    // '/opportunity/:path*',
    // '/meeting/:path*',
    // '/calls/:path*',
    // '/products/:path*',
    // '/account/:path*'
  ]
};
