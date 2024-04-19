import { CreateSupplyDto, Equipment } from "@/app/[locale]/(Dashboard)/(Admin)/equipment/models/equipment-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createSupplyInfoApi: (
    equipmentID: string | undefined,
    http: AxiosInstance | null,
    createSupplyDto?: CreateSupplyDto
) => Promise<HttpResponseCommon<Equipment | undefined>> = async (
    equipmentID,
    http,
    createSupplyDto
) => {
    try {
        const res = await http?.post(`equip/farm-equipments/supply`, createSupplyDto, {
            params: {
                id: equipmentID
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