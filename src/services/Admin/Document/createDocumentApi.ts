import { CreateDocumentDto, DocumentResponse } from "@/app/[locale]/(Dashboard)/(Admin)/document/models/document-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const createDocumentApi: (
    http: AxiosInstance | null,
    createDocumentDto?: CreateDocumentDto
) => Promise<HttpResponseCommon<DocumentResponse | undefined>> = async (
    http,
    createDocumentDto
) => {
    try {
        const res = await http?.post(`/farm/docs/post`, createDocumentDto, {
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