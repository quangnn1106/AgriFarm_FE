import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

import { Position, Sites } from './payload/response/sites';
import { AddPosition } from './payload/request/addPosition';

export const addPositionService: (
  http: AxiosInstance | null,
  siteId?: string,
  addPosition?: Position[]
) => Promise<HttpResponseCommon<Sites | [] | undefined>> = async (
  http,
  siteId,
  addPosition
) => {
  try {
    const res = await http?.post(`farm/sites/add-position`, addPosition, {
      params: {
        siteId: siteId
      },
      headers: {}
    });
    //  console.log('/farm/sites/get ', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};
