import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

import { Sites } from './payload/response/sites';

import { UpdatePayLoad } from './payload/request/updateInfor';

export const updateSiteService: (
  http: AxiosInstance | null,
  siteId?: string,
  updatePayLoad?: UpdatePayLoad
) => Promise<HttpResponseCommon<Sites | [] | undefined>> = async (
  http,
  siteId,
  updatePayLoad
) => {
  try {
    const res = await http?.put(`farm/sites/put`, updatePayLoad, {
      params: {
        Id: siteId
      },
      headers: {}
    });
    //  console.log('/farm/sites/get ', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};
