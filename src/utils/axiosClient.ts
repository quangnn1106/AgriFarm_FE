// 'use client';
// import { useEffect } from 'react';
// import { DOMAIN } from './config';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// export const axiosAuth = axios.create({
//   baseURL: DOMAIN,
//   headers: { 'Content-Type': 'application/json' }
// });
// const UseAxiosAuth = () => {
//   const { data: session } = useSession();
//   useEffect(() => {
//     const requestIntercept = axiosAuth.interceptors.request.use(
//       config => {
//         if (!config.headers['Authorization']) {
//           config.headers['Authorization'] = `Bearer ${session?.user?.access as string}`;
//         }
//         return config;
//       },
//       error => Promise.reject(error)
//     );

//     const responseIntercept = axiosAuth.interceptors.response.use(
//       response => response,
//       async error => {
//         return Promise.resolve(error.response);
//       }
//     );

//     return () => {
//       axiosAuth.interceptors.request.eject(requestIntercept);
//       axiosAuth.interceptors.response.eject(responseIntercept);
//     };
//   }, [session]);
//   return axiosAuth;
// };

// export default UseAxiosAuth;
