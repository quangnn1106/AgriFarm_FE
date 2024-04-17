import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';
import Staffs from '../Staffs/Payload/response/staffs';
import { updateStaffPayLoad } from '../Staffs/Payload/request/update-staff';
import { ChangePassPayload } from './Payload/request/changepassRequeste';
export const changePassService: (
  http: AxiosInstance | null,
  // userId?: string | null,
  changePassRequest?: ChangePassPayload
) => Promise<HttpResponseCommon<Staffs | [] | undefined>> = async (
  http,

  changePassRequest
) => {
  try {
    const res = await http?.put(`/user/account/change-pass`, changePassRequest, {
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
