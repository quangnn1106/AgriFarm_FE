import { ActivityResponse } from '@/services/Admin/Activities/Payload/response/activities';
import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import {
  AssessmentDetail,
  TreatmentDetail,
  UsingDetail
} from './Payload/request/activity-detail';
import { TrainingDetail } from '../Training/response/training.response';

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
) => Promise<HttpResponseCommon<AssessmentDetail>> = async (activityId, http) => {
  const res = await http?.get(`${'/schedule/assessment'}/get`, {
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

export const getHarvestDetailService: (
  activityId: string,
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<AssessmentDetail>> = async (activityId, http) => {
  const res = await http?.get(`${'/schedule/assessment'}/get`, {
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
