import { CreateEquipmentDto, Equipment } from "@/app/[locale]/(Dashboard)/(Admin)/equipment/models/equipment-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createEquipmentApi: (
    http: AxiosInstance | null,
    createEquipmentDto?: CreateEquipmentDto
) => Promise<HttpResponseCommon<Equipment | undefined>> = async (
    http,
    createEquipmentDto
) => {
    try {
        const res = await http?.post(`material/farm-equipments/post`, createEquipmentDto);
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