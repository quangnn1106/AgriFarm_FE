import HttpResponseCommon from '@/types/response';
import { AxiosInstance, AxiosResponse } from 'axios';
import { Expert } from '../Training/response/training.response';
import { EquipmentResponse, SupplyDetailResponse } from './Payload/response/equipmentResponses';
import { CreateEquipmentRequest, SupplyEquipmentRequest, UpdateEquipmentRequest } from './Payload/request/equipmentRequests';

const basePath = '/equip/farm-equipments';
const subPath = '/sup/supplies'

export const getEquipmentsService: (
  http?: AxiosInstance | null,
  pageNumber?: number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<EquipmentResponse[]>>> = async (
  http,
  pageNumber = 1,
  pageSize = 10
) => {
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
  return res as AxiosResponse<HttpResponseCommon<EquipmentResponse[]>>;
};

export const postEquipmentsService: (
  http?: AxiosInstance | null,
  payload?: CreateEquipmentRequest | null
) => Promise<HttpResponseCommon<EquipmentResponse>> = async (http, payload) => {
  const res = await http?.post(`${basePath}/post`, payload, {
    // params: {
    //   seasonId: seasonId
    // }
  });

  //console.log('response staffsService: ', res);
  return res as HttpResponseCommon<EquipmentResponse>;
};

export const supplyEquipmentsService: (
  http?: AxiosInstance | null,
  id?: string,
  payload?: SupplyEquipmentRequest | null
) => Promise<HttpResponseCommon<EquipmentResponse>> = async (http, id, payload) => {
  const res = await http?.post(`${basePath}/supply?id=${id}`, payload, {
    // params: {
    //   seasonId: seasonId
    // }
  });

  //console.log('response staffsService: ', res);
  return res as HttpResponseCommon<EquipmentResponse>;
};

export const updateEquipmentsService: (
  http?: AxiosInstance | null,
  id?: string,
  payload?: UpdateEquipmentRequest
) => Promise<boolean> = async (http, id, payload) => {
  const res = await http?.put(`${basePath}/put?id=${id}`,
    payload
  );

  //console.log('response staffsService: ', res);
  return res?.status===200?true:false;
};

export const deleteEquipmentsService: (
  http?: AxiosInstance | null,
  id?: string
) => Promise<boolean> = async (http, id) => {
  const res = await http?.delete(`${basePath}/delete?id=${id}`);

  //console.log('response staffsService: ', res);
  return res?.status===204?true:false;
};

export const getEquipmentSupplyDetailsService: (
  http?: AxiosInstance | null,
  itemId?: string,
  pageNumber?: number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<SupplyDetailResponse[]>>> = async (
  http,
  itemId,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = await http?.get(`${subPath}/get-by`, {
    params: {
      itemId: itemId
    },
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });

  //console.log('response staffsService: ', res);
  return res as AxiosResponse<HttpResponseCommon<SupplyDetailResponse[]>>;
};

