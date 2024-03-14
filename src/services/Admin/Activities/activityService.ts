import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";
import {ActivityResponse} from "@/types/activities"

const basePath = "/schedule/activities";

export const getActivitiesService: (
  seasonId: string,
  http?: AxiosInstance | null,
  id?: string | null
) => Promise<HttpResponseCommon<ActivityResponse[]>> = async (
  seasonId,
  http,
  id
) => {
  const res = await http?.get(`${basePath}/get`, {
    params: {
      seasonId: seasonId,
    },
    // headers: {
    //   pageSize: 4,
    //   pageNumber: 1
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

