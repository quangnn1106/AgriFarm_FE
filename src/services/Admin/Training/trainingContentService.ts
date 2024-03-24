import HttpResponseCommon from "@/types/response";
import { TrainingContent } from "./response/training.response";
import { AxiosInstance } from "axios";

const basePath = '/training/contents';

export const getTrainingContentsService: (
  
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<TrainingContent[]>> = async (http) => {
  const res = await http?.get(`${basePath}/get`, {
    // params: {
    //   seasonId: seasonId
    // }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

export const getTrainingContentByIdService: (
  http?: AxiosInstance | null,
  id?: string | null
) => Promise<HttpResponseCommon<TrainingContent>> = async (http, id) => {
  const res = await http?.get(`${basePath}/get`, {
    params: {
      id: id
    }
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};
