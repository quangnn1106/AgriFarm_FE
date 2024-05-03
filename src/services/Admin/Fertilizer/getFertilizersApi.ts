
import { Fertilizer } from "@/app/[locale]/(Dashboard)/(Admin)/fertilizer/models/fertilizer-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const getFertilizersApi: (
    siteId?: string | null,
    http?: AxiosInstance | null,
    keySearch?: string
    ) => Promise<HttpResponseCommon<Fertilizer[]>> = async (siteId, http, keySearch) => {
    try {
        const res = await http?.get(`/fert/farm-fertilizers/get`, {
            params: {
              siteId: siteId,
              key: keySearch

            }, headers: {
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
export default getFertilizersApi;