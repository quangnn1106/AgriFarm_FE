import HttpResponseCommon from '@/types/response';
import Staffs from '@/services/Admin/Staffs/Payload/response/staffs';
import { AxiosInstance } from 'axios';
import StaffsDetails from '@/services/Admin/Staffs/Payload/response/staffs-detail';

// import { http } from '@/utils/config';
export interface Pagination {
  CurrentPage: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
}

export const getStaffsService: (
  siteId?: string | null,
  http?: AxiosInstance | null,

  key?: string | null
) => Promise<HttpResponseCommon<Staffs[]>> = async (siteId, http, key) => {
  const res = await http?.get(`/user/staffs/get`, {
    params: {
      siteId: siteId,

      key: key
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

export const getStaffsServiceDetails: (
  siteId?: string | null,
  http?: AxiosInstance | null,
  userId?: string | null
) => Promise<HttpResponseCommon<StaffsDetails | [] | undefined>> = async (
  siteId,
  http,
  userId
) => {
  const res = await http?.get(`/user/staffs/get`, {
    params: {
      siteId: siteId,
      userId: userId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });

  // console.log('response getStaffsServiceDetails: ', res?.data);
  return res?.data;
};

export const getMemProfileService: (
  siteId?: string | null,
  http?: AxiosInstance | null,
  userId?: string | null
) => Promise<HttpResponseCommon<StaffsDetails | [] | undefined>> = async (
  siteId,
  http,
  userId
) => {
  const res = await http?.get(`/user/account/profile`, {
    params: {
      siteId: siteId,
      userId: userId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });

  // console.log('response getStaffsServiceDetails: ', res?.data);
  return res?.data;
};
