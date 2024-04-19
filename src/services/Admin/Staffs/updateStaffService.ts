import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';
import Staffs from '../Staffs/Payload/response/staffs';
import { updateStaffPayLoad } from '../Staffs/Payload/request/update-staff';

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
    // console.log('/user/staffs/edit ', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};

export const updateMemProfileService: (
  http: AxiosInstance | null,
  userId?: string | null,
  updatePayLoad?: updateStaffPayLoad
) => Promise<HttpResponseCommon<Staffs | [] | undefined>> = async (
  http,
  userId,
  updatePayLoad
) => {
  try {
    const res = await http?.put(`/user/account/edit-profile`, updatePayLoad, {
      // params: {
      //   id: userId
      // }
    });
    // console.log('/user/staffs/edit ', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};
