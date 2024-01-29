import Admin from '@/types/admin';
import FormRegisterValues from '@/types/register';
import HttpResponseCommon from '@/types/response';
import { http } from '@/utils/config';

export const register: (
  payload: FormRegisterValues
) => Promise<HttpResponseCommon<Admin>> = async payload => {
  const res = await http.post('register/Registry/Post', payload);
  return res.data;
};
