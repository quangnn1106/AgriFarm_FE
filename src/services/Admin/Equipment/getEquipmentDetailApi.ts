import { Pesticide } from "@/app/[locale]/(Dashboard)/(Admin)/pesticide/models/pesticide-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const getPesticideDetailApi: (
    pesticideId?: string | null,
    http?: AxiosInstance | null
    ) => Promise<HttpResponseCommon<Pesticide>> = async (pesticideId, http) => {
    try {
        const res = await http?.get(`/ppp/farm-pesticides/get`, {
            params: {
              id: pesticideId
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
export default getPesticideDetailApi;