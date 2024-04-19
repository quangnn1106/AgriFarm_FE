import { ActivityResponse, RiskAdditionResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import {
  AssessmentDetail,
  HarvestDetail,
  TreatmentDetail,
  UsingDetail
} from './Payload/response/activityAdditionResponse';
import { TrainingDetail } from '../Training/response/training.response';

const basePath ="cult/additions"



export const getTrainingDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<TrainingDetail>> = async (activityId, http) => {
  const res = await http?.get(`${basePath}/training-detail`, {
    params: {
      activityId: activityId
    }
  });
  return res?.data as HttpResponseCommon<TrainingDetail>
};

export const getTreatmentDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<TreatmentDetail>> = async (activityId, http) => {
  const res = await http?.get(`${basePath}/treatment-detail`, {
    params: {
      activityId: activityId
    }
  });
  return res?.data;
};

export const getAssessmentDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<RiskAdditionResponse>> = async (activityId, http) => {
  const res = await http?.get(`${'/risk/risk-assessment'}/get-by-task`, {
    params: {
      taskId: activityId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

export const getHarvestDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<HarvestDetail>> = async (activityId, http) => {
  const res = await http?.get(`${basePath}/harvest-detail`, {
    params: {
      activityId: activityId
    }
    
  });
  return res?.data;
};


export const createHarvestActionService: (
  http: AxiosInstance,
  activityId: string,
  payload: HarvestCreateRequest
) => Promise<HttpResponseCommon<string>> = async (http,activityId, payload) => {
  const res = await http?.post(`${basePath}/create-harvest`, 
  payload,
  {
    params: {
      activityId: activityId
    }
    
  });
  return res?.data;
};

export const createTrainingActionService: (
  http: AxiosInstance,
  activityId: string,
  payload: TrainingCreateRequest
) => Promise<HttpResponseCommon<string>> = async (http,activityId, payload) => {
  const res = await http?.post(`${basePath}/create-training`,
  payload,
  {
    params: {
      activityId: activityId
    }
    
  });
  return res?.data;
};

export const createTreatmentActionService:(
  http: AxiosInstance,
  activityId: string,
  payload: TreatmentCreateRequest
) => Promise<HttpResponseCommon<string>> = async (http,activityId, payload) => {
  const res = await http?.post(`${basePath}/create-treatment`, 
  payload,
  {
    params: {
      activityId: activityId
    }
    
  });
  return res?.data;
};

export const createAssessmentActionService: (
  http: AxiosInstance,
  activityId: string,
  payload: AssessmentCreateRequest
) => Promise<HttpResponseCommon<string>> = async (http,activityId, payload) => {
  const res = await http.post(`${basePath}/create-assessment`, 
  payload,
  {
    params: {
      activityId: activityId
    }
    
  });
  return res?.data;
};

export const removeActionService: (
  http: AxiosInstance,
  activityId: string,
) => Promise<boolean> = async (http,activityId) => {
  const res = await http.delete(`${basePath}/remove`,
  {
    params: {
      activityId: activityId
    }
    
  });
  return res?.status === 204;
};
