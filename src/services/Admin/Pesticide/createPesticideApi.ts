import {
  CreatePesticideDto,
  Pesticide
} from '@/app/[locale]/(Dashboard)/(Admin)/pesticide/models/pesticide-models';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

export const createPesticideApi: (
  siteId: string | undefined,
  http: AxiosInstance | null,
  createPesticideDto?: CreatePesticideDto
) => Promise<HttpResponseCommon<Pesticide | undefined>> = async (
  siteId,
  http,
  createPesticideDto
) => {
  try {
    const res = await http?.post(`material/farm-pesticides/post`, createPesticideDto, {
      params: {
        siteId: siteId
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
