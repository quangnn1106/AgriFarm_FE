import { Equipment, UpdateEquipmentInfoDto } from "@/app/[locale]/(Dashboard)/(Admin)/equipment/models/equipment-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const updateEquipmentApi: (
    equipmentId: string | null,
    http: AxiosInstance | null,
    UpdateEquipmentDto?: UpdateEquipmentInfoDto
) => Promise<HttpResponseCommon<Equipment | undefined>> = async (
    equipmentId,
    http,
    UpdateEquipmentDto
) => {
    try {
        const res = await http?.put(`equip/farm-equipments/put`, UpdateEquipmentDto, {
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
