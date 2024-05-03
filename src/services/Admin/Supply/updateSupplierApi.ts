import { SupplierResponse, UpdateSupplierDto } from '@/app/[locale]/(Dashboard)/(Admin)/(supply)/models/supplier-models';
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const updateSupplierApi: (
    supplierId: string | null,
    http: AxiosInstance | null,
    updateSupplierDto?: UpdateSupplierDto
) => Promise<HttpResponseCommon<SupplierResponse | undefined>> = async (
    supplierId,
    http,
    updateSupplierDto
) => {
    try {
        const res = await http?.put(`sup/suppliers/put`, updateSupplierDto, {
            params: {
                id: supplierId
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