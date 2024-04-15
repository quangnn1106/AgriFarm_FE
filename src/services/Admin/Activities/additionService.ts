import { ActivityResponse, RiskAdditionResponse } from '@/services/Admin/Activities/Payload/response/activityResponse';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import {
  AssessmentDetail,
  TreatmentDetail,
  UsingDetail
} from './Payload/response/activityAdditionResponse';
import { TrainingDetail } from '../Training/response/training.response';

const basePath ="/additions"

export const getUsingDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<UsingDetail>> = async (activityId, http) => {
  const res = await http?.get(`${'/schedule/use'}/get`, {
    params: {
      activityId: activityId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

export const getTrainingDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<TrainingDetail>> = async (activityId, http) => {
  const res = await http?.get(`${'/training/details'}/get-by-activity`, {
    params: {
      activityId: activityId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

export const getTreatmentDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<TreatmentDetail>> = async (activityId, http) => {
  const res = await http?.get(`${'/schedule/treatment'}/get`, {
    params: {
      activityId: activityId
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
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
) => Promise<HttpResponseCommon<AssessmentDetail>> = async (activityId, http) => {
  const res = await http?.get(`${'/schedule/assessment'}/get`, {
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
  const res = await http?.post(`${basePath}/"create-harvest`, 
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
  const res = await http?.post(`${'basePath'}/create-training`,
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
  const res = await http?.post(`${'basePath'}/create-treatment`, 
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
  const res = await http.post(`${'basePath'}/create-assessment`, 
  payload,
  {
    params: {
      activityId: activityId
    }
    
  });
  return res?.data;
};
