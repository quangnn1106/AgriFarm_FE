import {
  UpdatePesticideInfoDto,
  Pesticide,
  Property
} from '@/app/[locale]/(Dashboard)/(Admin)/pesticide/models/pesticide-models';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';

export const updatePesticideApi: (
  pesticideId: string | null,
  http: AxiosInstance | null,
  UpdatePesticideDto?: UpdatePesticideInfoDto
) => Promise<HttpResponseCommon<Pesticide | undefined>> = async (
  pesticideId,
  http,
  UpdatePesticideDto
) => {
  try {
    const res = await http?.put(`material/farm-pesticides/put`, UpdatePesticideDto, {
      params: {
        id: pesticideId
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

export const updatePesticidePropertyApi: (
  pesticideId: string | null,
  http: AxiosInstance | null,
  UpdatePesticidePropertyDto?: Property[]
) => Promise<HttpResponseCommon<Pesticide | undefined>> = async (
  pesticideId,
  http,
  UpdatePesticidePropertyDto
) => {
  try {
    const res = await http?.put(`ppp/pesticide-props/put`, UpdatePesticidePropertyDto, {
      params: {
        pesticideId: pesticideId
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
