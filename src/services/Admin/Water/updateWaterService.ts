import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { WaterPayLoadRequest } from './Payload/request/addWaterPayLoad';
import { WaterResponse } from './Payload/response/waterPayLoadResponse';

export const updateWaterApi: (
  http: AxiosInstance | null,
  updateWaterPayLoad?: WaterPayLoadRequest,
  siteId?: string
) => Promise<HttpResponseCommon<WaterResponse | undefined>> = async (
  http,
  updateWaterPayLoad,
  siteId
) => {
  try {
    const res = await http?.put(`/env/farm-water/put`, updateWaterPayLoad, {
      params: {
        id: siteId
      }
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

// export const updateLandPropApi: (
//   http: AxiosInstance | null,
//   updateLandPropPayLoad?: Property[],
//   soilId?: string
// ) => Promise<HttpResponseCommon<LandResponse | undefined>> = async (
//   http,
//   updateLandPropPayLoad,
//   soilId
// ) => {
//   try {
//     const res = await http?.put(`/soil/soil-properties/put`, updateLandPropPayLoad, {
//       params: {
//         soilId: soilId
//       }
//     });
//     return res?.data;
//   } catch (error: unknown) {
//     // Assert the type of error to be an instance of Error
//     if (error instanceof Error) {
//       throw new Error(`Error calling API: ${error.message}`);
//     } else {
//       throw new Error(`Unknown error occurred: ${error}`);
//     }
//   }
// };
