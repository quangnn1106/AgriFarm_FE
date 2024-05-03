import { CreateFertilizerDto, Fertilizer } from "@/app/[locale]/(Dashboard)/(Admin)/fertilizer/models/fertilizer-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createFertilizerApi: (
    siteId: string | undefined,
    http: AxiosInstance | null,
    createFertilizerDto?: CreateFertilizerDto
) => Promise<HttpResponseCommon<Fertilizer | undefined>> = async (
    siteId,
    http,
    createFertilizerDto
) => {
    try {
        const res = await http?.post(`fert/farm-fertilizers/post`, createFertilizerDto, {
            params: {
                siteId: siteId
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