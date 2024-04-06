import { Water } from '@/app/[locale]/(Dashboard)/(Admin)/water/models/water-model';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

const fetchListWaterData: (
  siteId?: string | null,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<Water[]>> = async (siteId, http) => {
  try {
    const res = await http?.get(`water/farm-water/get`, {
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
export default fetchListWaterData;
