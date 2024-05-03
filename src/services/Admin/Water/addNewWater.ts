import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { WaterPayLoadRequest } from './Payload/request/addWaterPayLoad';
import { WaterResponse } from './Payload/response/waterPayLoadResponse';

export const addNewWaterApi: (
  http: AxiosInstance | null,
  addWaterPayLoad?: WaterPayLoadRequest
) => Promise<HttpResponseCommon<WaterResponse | undefined>> = async (
  http,
  addWaterPayLoad
) => {
  try {
    const res = await http?.post(`water/farm-water/post`, addWaterPayLoad);
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
