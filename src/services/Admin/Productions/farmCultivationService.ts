import HttpResponseCommon from "@/types/response";
import { AxiosInstance, AxiosResponse } from "axios";
import { CultivationRecordResponse } from "./Payload/response/production.response";


const basePath = '/cult/products';

export const getFarmCultivationService: (
    http?: AxiosInstance | null,
    pageNumber?: number,
    pageSize?: number,
    start?: Date,
    end?: Date
  ) => Promise<AxiosResponse<HttpResponseCommon<CultivationRecordResponse>>> = async (
    http,
    pageNumber = 1,
    pageSize = 10,
    start,
    end
  ) => {
    const res = await http?.get(`${basePath}/cult-record`, {
      params: {
        start: start,
        end: end
      },
      headers: {
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    });
  
    return res as AxiosResponse<HttpResponseCommon<CultivationRecordResponse>>;
  };



