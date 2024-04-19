import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';
import { CertificationResponse } from './payload/response/certificate';
import { IApprovedRequest } from './payload/request/approved';

export const approvedCer: (
  http: AxiosInstance | null,
  id?: string
) => Promise<HttpResponseCommon<CertificationResponse[]>> = async (http, id) => {
  const updateRaw: IApprovedRequest = {
    decision: 1,
    notes: '123'
  };
  try {
    const res = await http?.put(`user/user-cert/inspect`, updateRaw, {
      params: {
        id: id
      }
    });
    // console.log('/register/registry/put ', res);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
