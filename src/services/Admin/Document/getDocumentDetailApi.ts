import { DocumentResponse } from "@/app/[locale]/(Dashboard)/(Admin)/document/models/document-models";
import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export interface Pagination {
    CurrentPage: number;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
  }

const getDocumentDetailApi: (
    documentId?: string | null,
    http?: AxiosInstance | null
    ) => Promise<HttpResponseCommon<DocumentResponse>> = async (documentId, http) => {
    try {
        const res = await http?.get(`/farm/docs/get`, {
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
export default getDocumentDetailApi;