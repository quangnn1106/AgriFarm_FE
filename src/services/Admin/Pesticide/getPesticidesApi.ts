import { Pesticide } from "@/app/[locale]/(Dashboard)/(Admin)/pesticide/models/pesticide-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const getPesticidesApi: (
    http?: AxiosInstance | null
    ) => Promise<HttpResponseCommon<Pesticide[]>> = async (http) => {
    try {
        const res = await http?.get(`/ppp/farm-pesticides/get`, {
            headers: {
                pageSize: 40
            }
        });
        return res?.data;

    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
}
export default getPesticidesApi;