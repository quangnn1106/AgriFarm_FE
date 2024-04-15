import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { CertificationResponse } from './payload/response/certificate';

export const getCertsService: (
  siteId?: string | undefined,
  http?: AxiosInstance | null,
  id?: string | null
) => Promise<HttpResponseCommon<CertificationResponse[]>> = async (siteId, http, id) => {
  const res = await http?.get(`user/user-cert/by-site`, {
    params: {
      siteId: siteId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

export const getMemCertsService: (
  siteId?: string | undefined,
  http?: AxiosInstance | null,
  id?: string | null
) => Promise<HttpResponseCommon<CertificationResponse[]>> = async (siteId, http) => {
  const res = await http?.get(`user/user-cert/get`, {
    // params: {
    //   siteId: siteId
    // }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};
