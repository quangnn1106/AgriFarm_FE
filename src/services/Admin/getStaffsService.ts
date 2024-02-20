import Admin from '@/types/admin';
import HttpResponseCommon from '@/types/response';
import Staffs from '@/types/staffs';
import UseAxiosAuth from '@/utils/axiosClient';
import { http } from '@/utils/config';
import { AxiosInstance } from 'axios';

// import { http } from '@/utils/config';
export interface Pagination {
  CurrentPage: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
}

const getStaffsService: (
  siteId?: string | null,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<Staffs[]>> = async (siteId, http) => {
  // const http = UseAxiosAuth();
  const res = await http?.get(`/user/staffs/get`, {
    params: {
      siteId: siteId
    },
    headers: {
      pageSize: 4,
      pageNumber: 1
    }
  });
  console.log('response staffsService: ', res);
  return res?.data;
};

export default getStaffsService;
