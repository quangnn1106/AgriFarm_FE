import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';
import Staffs from './Payload/response/staffs';
import { updateStaffPayLoad } from './Payload/request/update-staff';

export const updateStaffService: (
  http: AxiosInstance | null,
  userId?: string,
  updatePayLoad?: updateStaffPayLoad
) => Promise<HttpResponseCommon<Staffs | [] | undefined>> = async (
  http,
  userId,
  updatePayLoad
) => {
  try {
    const res = await http?.put(`/user/staffs/edit`, updatePayLoad, {
      params: {
        id: userId
      }
    });
    console.log('/user/staffs/edit ', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};
