import HttpResponseCommon from "@/types/response";
import { HttpResponse } from "@microsoft/signalr";
import { AxiosInstance } from "axios";

export interface StatisticData {
    numOfDiagnostic: number,
    numOfDiagnosticPast: number,
    numOfPendingFeedback: number,
    numOfPendingFeedbackPast: number
}

const getStatisticsSuperAdmin: (
    http?: AxiosInstance | null, 
    month?: number | undefined,
    year?: number | undefined
) => Promise<HttpResponseCommon<StatisticData>> = async (http, month, year) => {
    try {
        const res = await http?.get(`/disease/disease-diagnoses/get-statistics`, {
            params: {
                month: month,
                year: year
            }
        })
        return res?.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
}
export default getStatisticsSuperAdmin;