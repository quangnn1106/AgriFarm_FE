import { DocumentResponse, UpdateDocumentDto } from "@/app/[locale]/(Dashboard)/(Admin)/document/models/document-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const updateDocumentApi: (
    documentId: string | null,
    http: AxiosInstance | null,
    UpdateDocumentDto?: UpdateDocumentDto
) => Promise<HttpResponseCommon<DocumentResponse | undefined>> = async (
    documentId,
    http,
    UpdateDocumentDto
) => {
    try {
        const res = await http?.put(`farm/docs/put`, UpdateDocumentDto, {
            params: {
                id: documentId
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

