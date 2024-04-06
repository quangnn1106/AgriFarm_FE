import HttpResponseCommon from "@/types/response";
import { Expert, TrainingContent } from "./response/training.response";
import { AxiosInstance, AxiosResponse } from "axios";
import { ExpertCertificateRequest, ExpertRequest } from "./request/training.request";
const basePath = '/training/experts';

export const getExpertsService: (
  
  http?: AxiosInstance | null,
  pageNumber?:number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<Expert[]>>> = async (http, pageNumber= 1, pageSize = 10) => {
  const res = await http?.get(`${basePath}/get`, {
    
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });
  
  return res as AxiosResponse<HttpResponseCommon<Expert[]>>;
};

export const postExpertService: (
  http?: AxiosInstance | null,
  payload?: ExpertRequest | null
) => Promise<HttpResponseCommon<Expert>> = async (http, payload) => {
  const res = await http?.post(`${basePath}/post`, payload, {
    
  });

  return res as HttpResponseCommon<Expert>;
};

export const addExpertCertificateService: (
  http?: AxiosInstance | null,
  id?: string | null,
  payload?: ExpertCertificateRequest | null
) => Promise<HttpResponseCommon<Expert>> = async (http, id, payload) => {
  const res = await http?.post(`${basePath}/add-cert?id=${id}`, payload?.certificates, {
    
  });

  return res as HttpResponseCommon<Expert>;
};

export const updateEquipmentsService: (
  http?: AxiosInstance | null,
  id?: string,
  payload?: ExpertRequest
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
