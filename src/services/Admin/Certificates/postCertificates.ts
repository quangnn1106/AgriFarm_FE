import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { CertificationResponse } from './payload/response/certificate';
import { ICerPayLoadRequest } from './payload/request/addCert';

export const addNewCertApi: (
  userId?: string | undefined,
  http?: AxiosInstance | null,
  addPayload?: ICerPayLoadRequest
) => Promise<HttpResponseCommon<CertificationResponse>> = async (
  userId,
  http,
  addPayload
) => {
  const res = await http?.post(`user/user-cert/post`, addPayload, {
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
