// public paths
export const LOGIN_PATH = '/login',
  REGISTER_PATH = '/register',
  SUCCESS_PATH = '/success',
  ERROR_PATH = '/error',
  SALOGIN_PATH = '/salogin',
  HOME_PATH = '/home';

//----- private paths---------//
//admin
export const DASH_BOARD_PATH = 'sa/statistic',
  SITE_MAP_PATH = 'sa/site';

// admin path + manager
export const DASHBOARD_ADMIN = '/statistic_admin';

//member path
export const TIME_TABLE_PATH = '/time-table';
// call back for OAuth2
export const CALLBACK_URL = process.env.NEXT_PUBLIC_FE;
