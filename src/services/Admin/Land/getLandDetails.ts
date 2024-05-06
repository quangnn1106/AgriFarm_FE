import { Land } from '@/app/[locale]/(Dashboard)/(Admin)/season/models/season-model';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

export interface Pagination {
  CurrentPage: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
}

const fetchListLandData: (
  siteId?: string | null,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<Land[]>> = async (siteId, http) => {
  try {
    const res = await http?.get(`/env/lands/get`, {
      params: {
        siteId: siteId
      }
      // headers: {
      //   pageSize: 4,
      //   pageNumber: 1
      // }
    });

    return res?.data;
  } catch (error: unknown) {
    // Assert the type of error to be an instance of Error
    if (error instanceof Error) {
      throw new Error(`Error calling API: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred: ${error}`);
    }
  }
};
export default fetchListLandData;
