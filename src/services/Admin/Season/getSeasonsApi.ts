import { SeasonModel } from '@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

export interface Pagination {
  CurrentPage: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
}

const getListSeasonApi: (
  siteId?: string | null,
  http?: AxiosInstance | null,
  userId?: string | null
) => Promise<HttpResponseCommon<SeasonModel[]>> = async (siteId, http, userId) => {
  try {
    const res = await http?.get(`/cult/seasons/get`, {
      params: {
        siteId: siteId,
        userId: userId
      }
      // headers: {
      //   pageSize: 4,
      //   pageNumber: 1
      // }
    });
    // console.log('response season: ', res?.data.data);
    return res?.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error calling API: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred: ${error}`);
    }
  }
};
export default getListSeasonApi;

