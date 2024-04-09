import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { LandPayLoad } from './Payload/request/addLandPayLoad';
import { LandResponse } from './Payload/response/landPayLoadResponse';

export const addNewLandApi: (
  http: AxiosInstance | null,
  addLandPayLoad?: LandPayLoad
) => Promise<HttpResponseCommon<LandResponse | undefined>> = async (
  http,
  addLandPayLoad
) => {
  try {
    const res = await http?.post(`soil/lands/post`, addLandPayLoad);
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
