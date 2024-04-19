// public paths
export const LOGIN_PATH = '/login',
  REGISTER_PATH = '/register',
  SUCCESS_PATH = '/success',
  ERROR_PATH = '/error',
  SALOGIN_PATH = '/salogin',
  HOME_PATH = '/home',
  DENIED_PATH = '/denied',
  FORGOT_PATH = '/forgot',
  VERIFY_PATH = '/verify',
  RESET_PASS_PATH = '/reset-password';

//----- private paths---------//
//admin
export const DASH_BOARD_PATH = '/sa/statistic',
  SA_PROFILE_PATH = '/sa/user-profile',
  SITE_MAP_PATH = '/sa/site';

// admin path + manager
export const DASHBOARD_ADMIN = '/statistic_admin',
  AD_MA_PROFILE_PATH = '/user-profile',
  CHECKLIST = '/checklist-global-gap',
  CHECKLIST_IMPLEMENT = '/checklist-global-gap/implement',
  CERTIFICATE_PATH = '/user-certificate';

//member path
export const TIME_TABLE_PATH = '/time-table';
export const MEM_PROFILE_PATH = '/mem-profile';
// call back for OAuth2
export const CALLBACK_URL = process.env.NEXT_PUBLIC_FE;
