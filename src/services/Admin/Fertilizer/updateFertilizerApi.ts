import { UpdateFertilizerInfoDto, Fertilizer, Property } from "@/app/[locale]/(Dashboard)/(Admin)/fertilizer/models/fertilizer-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const updateFertilizerApi: (
    fertilizerId: string | null,
    http: AxiosInstance | null,
    UpdateFertilizerDto?: UpdateFertilizerInfoDto
) => Promise<HttpResponseCommon<Fertilizer | undefined>> = async (
    fertilizerId,
    http,
    UpdateFertilizerDto
) => {
    try {
        const res = await http?.put(`material/farm-fertilizers/put`, UpdateFertilizerDto, {
            params: {
                id: fertilizerId
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

export const updateFertilizerPropertyApi: (
    fertilizerId: string | null,
    http: AxiosInstance | null,
    UpdateFertilizerPropertyDto?: Property[]
) => Promise<HttpResponseCommon<Fertilizer | undefined>> = async (
    fertilizerId,
    http,
    UpdateFertilizerPropertyDto
) => {
    try {
        const res = await http?.put(`fert/fertilizer-props/put`, UpdateFertilizerPropertyDto, {
            params: {
                fertilizeId: fertilizerId
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