import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { CertificationResponse } from './payload/response/certificate';

export const addNewCertApi: (
  userId: string | undefined,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<CertificationResponse>> = async (userId, http) => {
  const res = await http?.post(`user/user-cert/post`, {
    params: {
      userId: userId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};
