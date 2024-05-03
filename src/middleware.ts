import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { locales } from './navigation';
import { NextRequest, NextResponse } from 'next/server';
// export { default } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {
  ERROR_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  SALOGIN_PATH,
  SUCCESS_PATH,
  HOME_PATH,
  DENIED_PATH,
  DASH_BOARD_PATH,
  DASHBOARD_ADMIN,
  FORGOT_PATH,
  RESET_PASS_PATH,
  VERIFY_PATH
} from './constants/routes';
import { ROLES } from './constants/roles';
const publicPages = [
  LOGIN_PATH,
  REGISTER_PATH,
  SALOGIN_PATH,
  SUCCESS_PATH,
  ERROR_PATH,
  HOME_PATH,
  FORGOT_PATH,
  RESET_PASS_PATH,
  VERIFY_PATH
  // (/secret requires auth)
];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'vi'
});

const authMiddleware = withAuth(
  // `withAuth` augments your `Request` with the user's token.

  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  req => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    pages: {
      signIn: '/login' || '/en/salogin',
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
  //console.log('req.nextauth.token?.role: ', req?.nextauth?.token?.user_info);
  //console.log('req.nextUrl.pathname ', req.nextUrl.pathname);
  // if (req.nextUrl.pathname.startsWith('/en/login')) {
  //   console.log('123123123 123213123123123123');
  //   return NextResponse.redirect(new URL('/register', req.url));
  // }
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
  //matcher: ['/login']
};
