import { Equipment } from "@/app/[locale]/(Dashboard)/(Admin)/equipment/models/equipment-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const getEquipmentDetailApi: (
    equipmentId?: string | null,
    http?: AxiosInstance | null
    ) => Promise<HttpResponseCommon<Equipment>> = async (equipmentId, http) => {
    try {
        const res = await http?.get(`/equip/farm-equipments/get`, {
            params: {
              id: equipmentId
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
export default getEquipmentDetailApi;