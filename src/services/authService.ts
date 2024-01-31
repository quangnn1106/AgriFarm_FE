import { REGISTER_PATH } from '@/constants/routes';
import { redirect } from '@/navigation';
import Admin from '@/types/admin';
import FormRegisterValues from '@/types/register';
import HttpResponseCommon from '@/types/response';
import { http } from '@/utils/config';

export const register: (
  payload: FormRegisterValues
) => Promise<HttpResponseCommon<Admin>> = async payload => {
  const res = await http.post('register/Registry/Post', payload);
  console.log('response authService outututu: ', res);
  return res.data;
  if (res.status === 202) {
    console.log('response authService: ', res);

    return res.data;
  } else return res.data;
  // } else {
  //   console.log('res?.data?.message: ', res?.data);

  //   return res?.data;
  // }
};
