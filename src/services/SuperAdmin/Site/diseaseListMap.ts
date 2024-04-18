import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

import { Sites } from './payload/response/sites';
import { MarkerDisease } from './payload/response/markerDisease';

export const getDiseaseApi: (
  http: AxiosInstance | null
  //siteId?: string
) => Promise<
  HttpResponseCommon<MarkerDisease | MarkerDisease[] | undefined>
> = async http => {
  try {
    const res = await http?.get(`/disease/disease-diagnoses/get-list-map`, {
      //   params: {
      //     Id: siteId
      //   },
      //   headers: {
      //     pageSize: 40
      //   }
    });
    //  console.log('/farm/sites/get ', res);
    return res?.data;
  } catch (error) {
    console.log('error ', error);
  }
};
