import HttpResponseCommon from "@/types/response";
import { TrainingContent } from "./response/training.response";
import { AxiosInstance, AxiosResponse } from "axios";
import { TrainingContentRequest } from "./request/training.request";

const basePath = '/training/contents';



export const getTrainingContentByIdService: (
  http?: AxiosInstance | null,
  id?: string | null
) => Promise<HttpResponseCommon<TrainingContent>> = async (http, id) => {
  const res = await http?.get(`${basePath}/get`, {
    params: {
      id: id
    }
    
  });
  return res?.data;
};

export const getTrainingContentsService: (
  http?: AxiosInstance | null,
  pageNumber?:number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<TrainingContent[]>>> = async (http, pageNumber = 1, pageSize = 10) => {
  const res = await http?.get(`${basePath}/get`, {
    
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });
  
  return res as AxiosResponse<HttpResponseCommon<TrainingContent[]>>;
};

export const postExpertService: (
  http?: AxiosInstance | null,
  payload?: TrainingContentRequest | null
) => Promise<HttpResponseCommon<TrainingContent>> = async (http, payload) => {
  const res = await http?.post(`${basePath}/post`, payload, {
    
  });

  return res as HttpResponseCommon<TrainingContent>;
};



export const updateEquipmentsService: (
  http?: AxiosInstance | null,
  id?: string,
  payload?: TrainingContentRequest
) => Promise<boolean> = async (http, id, payload) => {
  const res = await http?.put(`${basePath}/put?id=${id}`,
    payload
  );

  return res?.status===200?true:false;
};

export const deleteEquipmentsService: (
  http?: AxiosInstance | null,
  id?: string
) => Promise<boolean> = async (http, id) => {
  const res = await http?.delete(`${basePath}/delete?id=${id}`);

  return res?.status===204?true:false;
};

