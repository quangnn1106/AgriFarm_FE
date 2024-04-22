import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface StaticStaffResponse{
    sum: number,
    differenceRate: number
}

export const statisticStaffsService: (
    http: AxiosInstance,
    start: Date,
    end: Date
  ) => Promise<HttpResponseCommon<StaticStaffResponse>> = async (http, start, end) => {
    const res = await http?.get(`/user/staffs/statistic`, {
      params: {
        start: start,
        end: end
      }
      // headers: {
      //   pageSize: 4,
      //   pageNumber: 1
      // }
    });
    //console.log('response staffsService: ', res);
    return res?.data as HttpResponseCommon<StaticStaffResponse>;
  };