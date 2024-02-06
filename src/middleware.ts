import { withAuth } from 'next-auth/middleware';
import { locales } from './navigation';
import { NextRequest } from 'next/server';
// export { default } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import {
  LOGIN_PATH,
  REGISTER_PATH,
  SALOGIN_PATH,
  SUCCESS_PATH
} from './constants/routes';
const publicPages = [
  LOGIN_PATH,
  REGISTER_PATH,
  SALOGIN_PATH,
  SUCCESS_PATH,
  '/season'

  // (/secret requires auth)
];

const intlMiddleware = createMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'vi'
});

const authMiddleware = withAuth(
  // `withAuth` augments your `Request` with the user's token.
  // async function middleware(req) {},
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  req => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token, req }) => (token ? true : false)
    },
    pages: {
      signIn: '/login' || '/salogin',
      newUser: '/register'
    }
  }
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

// export const config = {
//   matcher: [
//     '/lead/:path*',
//     '/dashboard/:path*',
//     '/contact/:path*',
//     '/task/:path*',
//     '/opportunity/:path*',
//     '/meeting/:path*',
//     '/calls/:path*',
//     '/products/:path*',
//     '/account/:path*',
//     '/profile/:path*'
//   ]
// };

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
