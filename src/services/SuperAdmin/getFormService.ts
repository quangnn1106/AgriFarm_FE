import Admin from '@/types/admin';
import HttpResponseCommon from '@/types/response';
import { http } from '@/utils/config';

export const register: () => Promise<HttpResponseCommon<Admin>> = async () => {
  const res = await http.post('/register/registry/get');
  console.log('response authService outututu: ', res);
  return res.data;
  // if (res.status === 202) {
  //   console.log('response authService: ', res);

  //   return res.data;
  // } else return res.data;
  // } else {
  //   console.log('res?.data?.message: ', res?.data);

  //   return res?.data;
  // }
};
