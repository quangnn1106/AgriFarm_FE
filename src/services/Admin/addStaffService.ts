import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import Staffs from './Payload/response/staffs';
import { AddStaffPayLoad } from './Payload/request/add-staff';

export const addStaffService: (
  http: AxiosInstance | null,
  siteId?: string,
  addPayLoad?: AddStaffPayLoad
) => Promise<HttpResponseCommon<Staffs | [] | undefined>> = async (
  http,
  siteId,
  addPayLoad
) => {
  try {
    const res = await http?.post(`/user/staffs/add-new-staff`, addPayLoad, {
      params: {
        siteId: siteId
      }
    });
    console.log('/user/staffs/add-new-staff ', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};
