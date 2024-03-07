import Admin from '@/types/admin';
import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';

export const approvedRegisterForm: (
  http: AxiosInstance | null,
  userId?: string
) => Promise<HttpResponseCommon<Admin[]>> = async (http, userId) => {
  const updateRaw: any = {
    decison: 1,
    notes: '123'
  };
  try {
    const res = await http?.put(`/register/registry/put`, updateRaw, {
      params: {
        id: userId
      }
    });
    // console.log('/register/registry/put ', res);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
