import { CreateSupplierDto, Seed } from "@/app/[locale]/(Dashboard)/(Admin)/seed/models/seed-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createSupplyInfoApi: (
    seedId: string | undefined,
    http: AxiosInstance | null,
    CreateSupplierDto?: CreateSupplierDto
) => Promise<HttpResponseCommon<Seed | undefined>> = async (
    seedId,
    http,
    CreateSupplierDto
) => {
    try {
        const res = await http?.post(`material/farm-seeds/supply`, CreateSupplierDto, {
            params: {
                id: seedId
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