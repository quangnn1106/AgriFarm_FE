
import { SupplierResponse, CreateSupplierDto } from "@/app/[locale]/(Dashboard)/(Admin)/(supply)/models/supplier-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createSupplierApi: (
    http: AxiosInstance | null,
    CreateSupplierDto?: CreateSupplierDto
) => Promise<HttpResponseCommon<SupplierResponse | undefined>> = async (
    http,
    CreateSupplierDto
) => {
    try {
        const res = await http?.post(`sup/suppliers/post`, CreateSupplierDto, {});
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