'use client';
import { useEffect } from 'react';
import { DOMAIN } from './config';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';

export const axiosAuth = axios.create({
  baseURL: DOMAIN,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000
});
const UseAxiosAuth = () => {
  const { data: session } = useSession();
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${session?.user.accessToken as string}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      response => response,
      async error => {
        //Hàm cấu hình cho tất cả lỗi nhận về
        if (error.response?.status === 400 || error.response?.status === 404) {
          //Chuyển hướng trang về trang chủ
          console.log(error.response.message);

          console.log('Status 400 during HTTP request.');
          return Promise.resolve(error.response);
          //  alert('lỗi kh tìm thấy api hoặc bad request: ');
        }

        if (error.response?.status === 401 || error.response?.status === 403) {
          //Chuyển hướng trang về trang login
          //  alert('lỗi kh co quyen call api');
          console.log('Status 401 || 403 during HTTP request.');
          //signOut();
          // router.push(LOGIN_PATH);
          // console.log(error.response.message);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
    };
  }, [session, path, router]);
  return axiosAuth;
};

export default UseAxiosAuth;
