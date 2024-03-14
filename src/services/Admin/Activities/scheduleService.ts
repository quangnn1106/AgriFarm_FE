import { ActivityResponse } from "@/types/activities";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

const basePath ="/schedule/time-table";

export const getScheduleService: (
    http?: AxiosInstance | null,
    id?: string | null
  ) => Promise<HttpResponseCommon<ActivityResponse[]>> = async (
    http,
    id
  ) => {
    const res = await http?.get(`${basePath}/get`, {
      
      // headers: {
      //   pageSize: 4,
      //   pageNumber: 1
      // }
    });
    //console.log('response staffsService: ', res);
    return res?.data;
  };