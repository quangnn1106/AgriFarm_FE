
import { SupplierResponse } from "@/app/[locale]/(Dashboard)/(Admin)/supply/models/supplier-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const getSupplierDetailApi: (
    supplierID: string,
    http?: AxiosInstance | null
    ) => Promise<HttpResponseCommon<SupplierResponse>> = async (supplierID, http) => {
    try {
        const res = await http?.get(`/sup/suppliers/get`, {
            params: {
              id: supplierID
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
export default getSupplierDetailApi;