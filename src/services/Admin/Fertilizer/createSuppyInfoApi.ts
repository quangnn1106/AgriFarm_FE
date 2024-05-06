
import { Fertilizer, CreateSupplyDto } from "@/app/[locale]/(Dashboard)/(Admin)/fertilizer/models/fertilizer-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createSupplyInfoApi: (
    fertilizerID: string | undefined,
    http: AxiosInstance | null,
    CreateSupplyDto?: CreateSupplyDto
) => Promise<HttpResponseCommon<Fertilizer | undefined>> = async (
    fertilizerID,
    http,
    CreateSupplyDto
) => {
    try {
        const res = await http?.post(`material/farm-fertilizers/supply`, CreateSupplyDto, {
            params: {
                id: fertilizerID
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