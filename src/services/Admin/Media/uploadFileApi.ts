import HttpResponseCommon from "@/types/response";
import { AxiosInstance } from "axios";

export const UploadFileApi: (
    http: AxiosInstance | null,
    formData : FormData | undefined,
) => Promise<HttpResponseCommon<any | undefined>> = async (
    http, 
    formData,
 ) => {
    try {
        const res = await http?.post('http://ec2-3-109-154-96.ap-south-1.compute.amazonaws.com/api/v1/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
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