import { CreateSeedDto, Seed } from "@/app/[locale]/(Dashboard)/(Admin)/seed/models/seed-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createSeedApi: (
    siteId: string | undefined,
    http: AxiosInstance | null,
    createSeasonDto?: CreateSeedDto
) => Promise<HttpResponseCommon<Seed | undefined>> = async (
    siteId,
    http,
    createSeasonDto
) => {
    try {
        const res = await http?.post(`seed/farm-seeds/post`, createSeasonDto, {
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