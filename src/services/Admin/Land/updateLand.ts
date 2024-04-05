import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { LandPayLoad, Property } from './Payload/request/addLandPayLoad';
import { LandResponse } from './Payload/response/landPayLoadResponse';
import { LandUpdatePayLoad } from './Payload/request/updateLandPayLoad';

export const updateLandApi: (
  http: AxiosInstance | null,
  updateLandPayLoad?: LandUpdatePayLoad,
  siteId?: string
) => Promise<HttpResponseCommon<LandResponse | undefined>> = async (
  http,
  updateLandPayLoad,
  siteId
) => {
  try {
    const res = await http?.put(`soil/lands/put`, updateLandPayLoad, {
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

export const updateLandPropApi: (
  http: AxiosInstance | null,
  updateLandPropPayLoad?: Property[],
  soilId?: string
) => Promise<HttpResponseCommon<LandResponse | undefined>> = async (
  http,
  updateLandPropPayLoad,
  soilId
) => {
  try {
    const res = await http?.put(`/soil/soil-properties/put`, updateLandPropPayLoad, {
      params: {
        soilId: soilId
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
