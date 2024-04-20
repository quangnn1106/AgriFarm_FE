import { Equipment } from "@/app/[locale]/(Dashboard)/(Admin)/equipment/models/equipment-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const getEquipmentsApi: (
    http?: AxiosInstance | null,
    keySearch?: string
    ) => Promise<HttpResponseCommon<Equipment[]>> = async (http, keySearch) => {
    try {
        const res = await http?.get(`/equip/farm-equipments/get`, {
            params: {
                key: keySearch
            },
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
export default getEquipmentsApi;