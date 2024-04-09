import HttpResponseCommon from '@/types/response';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ActivityLocation } from './Payload/response/activityResponse';
import { AddMaterialRequest, AddParticipantRequest, SetLocationRequest } from './Payload/request/activityRequest';

const basePath = '/cult/act-resource';
const subPath1 = '/cult/act-locations'
const subPath2 = '/cult/act-participants'
const subPath3 = '/cult/act-materials'

export const getActivityLocationService: (
  http?: AxiosInstance | null,
  key?: string,
  pageNumber?: number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<ActivityLocation[]>>> = async (
  http,
  key,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = await http?.get(`${basePath}/locations`, {
    params: {
      key: key
    },
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });
  return res as AxiosResponse<HttpResponseCommon<ActivityLocation[]>>;
};

export const setLocationService: (
  http: AxiosInstance,
  activityId:string,
  payLoad: SetLocationRequest
) => Promise<boolean> = async (http, activityId, payLoad) => {
  const res = await http.post(
    `${subPath1}/set`,
    payLoad,
    {
      params:{
        activityId: activityId
      }
    }
  );
  return res?.status===202;
};

export const removeLocationService: (
  http: AxiosInstance,
  activityId: string,
  locationId: string,
) => Promise<boolean> = async (http, activityId, locationId) => {
  const res = await http.delete(
    `${subPath1}/remove`,{
      params:{
        activityId: activityId,
        locationId: locationId
      }
    }
    
    
  );
  return res?.status===202;
};

export const getActivityMaterialsService: (
  http?: AxiosInstance | null,
  key?: string,
  cate?:string,
  pageNumber?: number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<ActivityLocation[]>>> = async (
  http,
  key,
  cate,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = await http?.get(`${basePath}/materials`, {
    params: {
      cate:cate,
      key: key
    },
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });
  return res as AxiosResponse<HttpResponseCommon<ActivityLocation[]>>;
};

export const setMaterialService: (
  http: AxiosInstance,
  activityId:string,
  payLoad: AddMaterialRequest
) => Promise<boolean> = async (http, activityId, payLoad) => {
  const res = await http.post(
    `${subPath3}/add`,
    payLoad,
    {
      params:{
        activityId: activityId
      }
    }
    
  );
  return res?.status===202;
};

export const removeMaterialService: (
  http: AxiosInstance,
  activityId: string,
  locationId: string,
) => Promise<boolean> = async (http, activityId, locationId) => {
  const res = await http.delete(
    `${subPath3}/remove`,{
      params:{
        activityId: activityId,
        locationId: locationId
      }
    }
    
    
  );
  return res?.status===202;
};

export const getActivityParticipantService: (
  http?: AxiosInstance | null,
  key?: string,
  pageNumber?: number,
  pageSize?: number
) => Promise<AxiosResponse<HttpResponseCommon<ActivityLocation[]>>> = async (
  http,
  key,
  pageNumber = 1,
  pageSize = 10
) => {
  const res = await http?.get(`${basePath}/participants`, {
    params: {
      key: key
    },
    headers: {
      pageSize: pageSize,
      pageNumber: pageNumber
    }
  });
  return res as AxiosResponse<HttpResponseCommon<ActivityLocation[]>>;
};

export const setParticipantService: (
  http: AxiosInstance,
  activityId: string,
  payLoad: AddParticipantRequest
) => Promise<boolean> = async (http, activityId, payLoad) => {
  const res = await http.post(
    `${subPath2}/add`,
    payLoad,
    {
      params:{
        activityId: activityId
      }
    }
  );
  return res?.status===202;
};

export const removeParticipantService: (
  http: AxiosInstance,
  activityId: string,
  participantId: string,
) => Promise<boolean> = async (http, activityId, locationId) => {
  const res = await http.delete(
    `${subPath2}/remove`,{
      params:{
        activityId: activityId,
        locationId: locationId
      }
    }
    
    
  );
  return res?.status===202;
};