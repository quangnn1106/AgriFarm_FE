
import { Pesticide, CreateSupplyDto } from "@/app/[locale]/(Dashboard)/(Admin)/pesticide/models/pesticide-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createSupplyInfoApi: (
    pesticideID: string | undefined,
    http: AxiosInstance | null,
    CreateSupplyDto?: CreateSupplyDto
) => Promise<HttpResponseCommon<Pesticide | undefined>> = async (
    pesticideID,
    http,
    CreateSupplyDto
) => {
    try {
        const res = await http?.post(`ppp/farm-pesticides/supply`, CreateSupplyDto, {
            params: {
                id: pesticideID
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