import HttpResponseCommon from '@/types/response';
import { AxiosInstance, AxiosResponse } from 'axios';
import { EquipmentResponse } from '../Equipments/Payload/response/equipmentResponses';
import {
  FarmProductResponse,
  ProductionResponse
} from './Payload/response/production.response';

const basePath = '/cult/farm-products';

export const getFarmProductsService: (
  http?: AxiosInstance | null,
  pageNumber?: number,
  pageSize?: number,
  key?: string
) => Promise<AxiosResponse<HttpResponseCommon<FarmProductResponse[]>>> = async (
  http,
  pageNumber = 1,
  pageSize = 10,
  key
) => {
  const res = await http?.get(`${basePath}/get`, {
    params: {
      key: key
    },
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });

  return res as AxiosResponse<HttpResponseCommon<FarmProductResponse[]>>;
};

export const getFarmProductByIdService: (
  http: AxiosInstance,
  id: string
) => Promise<HttpResponseCommon<FarmProductResponse>> = async (http, id) => {
  const res = await http?.get(`${basePath}/get`, {
    params: {
      id: id
    }
  });

  return res.data as HttpResponseCommon<FarmProductResponse>;
};

export const getProductionsByProductService: (
  http: AxiosInstance,
  productId: string,
  pageNumber?: number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<ProductionResponse[]>>> = async (
  http,
  productId,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = await http?.get(`${basePath}/productions`, {
    params: {
      productId: productId
    },
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });

  return res as AxiosResponse<HttpResponseCommon<ProductionResponse[]>>;
};
