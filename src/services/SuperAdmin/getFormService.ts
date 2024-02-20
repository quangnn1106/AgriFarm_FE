import Admin from '@/types/admin';
import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';

export const fetchRegisterForm: (
  http: AxiosInstance | null
) => Promise<HttpResponseCommon<Admin[]>> = async http => {
  const res = await http?.get('/register/registry/get');
  console.log('register/registry/get ', res);
  return res?.data;
};
