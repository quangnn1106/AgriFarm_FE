import Admin from '@/types/admin';
import FormRegisterValues from '@/types/register';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

export const addRegisterForm: (
  http: AxiosInstance | null,
  siteId?: string,
  addPayLoad?: FormRegisterValues
) => Promise<HttpResponseCommon<Admin | [] | undefined>> = async (
  http,
  siteId,
  addPayLoad
) => {
  try {
    const res = await http?.post(`/register/Registry/Post`, addPayLoad, {
      params: {
        siteId: siteId
      }
    });
    console.log('/register/Registry/Post', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};
