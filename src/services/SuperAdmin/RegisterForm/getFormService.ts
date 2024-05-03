import Admin from '@/types/admin';
import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';

export const fetchRegisterForm: (
  http: AxiosInstance | null
) => Promise<HttpResponseCommon<Admin[]>> = async http => {
  try {
    const res = await http?.get('/register/registry/get',
      {headers: {
        pageSize : 40
      }}
    );
    console.log('register/registry/get ', res);
    return res?.data;
  } catch (error) {
    console.log('register/registry/get ', error);
  }
};
