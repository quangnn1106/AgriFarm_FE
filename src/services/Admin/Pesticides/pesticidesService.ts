import HttpResponseCommon from "@/types/response";
import { AxiosInstance, AxiosResponse } from "axios";
import { Expert } from "../Training/response/training.response";
import { PesticideResponse } from "./Payload/response/pesticideResponses";
import { CreatePesticideRequest } from "./Payload/request/pesticideRequests";

const basePath = '/ppp/farm-pesticides';

export const getPesticidesService: (
  
  http?: AxiosInstance | null,
  id?: string | null,
  pageNumber?:number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<PesticideResponse[]>>> = async (http, id, pageNumber= 1, pageSize = 10) => {
  const res = await http?.get(`${basePath}/get`, {
    // params: {
    //   seasonId: seasonId
    // }
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });
  
  //console.log('response staffsService: ', res);
  return res as AxiosResponse<HttpResponseCommon<PesticideResponse[]>>;
};

export const postPesticidesService: (
  
    http?: AxiosInstance | null,
    payload?: CreatePesticideRequest | null,
    pageNumber?:number,
    pageSize?: number
  ) => Promise<HttpResponseCommon<PesticideResponse>> = async (http, payload, pageNumber= 1, pageSize = 10) => {
    const res = await http?.post(`${basePath}/get`,
    payload,
    {
      // params: {
      //   seasonId: seasonId
      // }
      
    });
    
    //console.log('response staffsService: ', res);
    return res as HttpResponseCommon<PesticideResponse>;
  };