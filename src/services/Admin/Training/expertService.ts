import HttpResponseCommon from "@/types/response";
import { Expert, TrainingContent } from "./response/training.response";
import { AxiosInstance } from "axios";

const basePath = '/training/experts';

export const getExpertsService: (
  
  http?: AxiosInstance | null,
  id?: string | null
) => Promise<HttpResponseCommon<Expert[]>> = async (http, id) => {
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
