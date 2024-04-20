import { AxiosInstance } from 'axios';
import { ChangePasswordOnResetRequest, ResestPasswordRequest, VerifyTokenRequest } from './request/reset.pass.request';
import HttpResponseCommon from '@/types/response';

const basePath = '/user/auth';

export const sendResetEmailService: (
  http: AxiosInstance,
  payLoad: ResestPasswordRequest
) => Promise<boolean> = async (http, payload) => {
  const res = await http?.post(`${basePath}/reset`, payload, {
    
  });
  return res?.status === 202;
};

export const verifyTokenService: (
    http: AxiosInstance,
    payLoad: VerifyTokenRequest
  ) => Promise<HttpResponseCommon<string>> = async (http, payload) => {
    const res = await http?.post(`${basePath}/verify-token`, payload, {
      
    });
    return res?.data as HttpResponseCommon<string>;
  };

  export const resetPasswordService: (
    http: AxiosInstance,
    payLoad: ChangePasswordOnResetRequest
  ) => Promise<boolean> = async (http, payload) => {
    const res = await http?.post(`${basePath}/reset-pass`, payload, {
      
    });
    return res?.status === 204;
  };