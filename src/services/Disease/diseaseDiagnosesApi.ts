import { landDef } from '@/app/[locale]/(Dashboard)/(SuperAdmin)/sa/diagnostic/add/model/diseaseDiagnosticModel';
import { diseaseModel } from '@/app/[locale]/(Dashboard)/(SuperAdmin)/sa/diagnostic/model/disease-model';
import { AxiosInstance } from 'axios';

export const fetchDiseaseData = async (
    http: AxiosInstance | null,
    keyword: string,
    dateFrom: string,
    dateTo: string,
    pageSize?: number,
    current?: number
    ) => {
    try {
        const response = await http?.get('/disease/disease-diagnoses/get', {
            params: {
                keyword: keyword,
                searchDateFrom: dateFrom,
                searchDateTo: dateTo,
                perPage: pageSize,
                pageId: current
            }
        });
  
        return response?.data;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
};

export const fetchDiseaseDataAdmin = async (
    http: AxiosInstance | null,
    keyword: string,
    dateFrom: string,
    dateTo: string,
    listLands: string[] | undefined
    ) => {
    try {
        const response = await http?.get('/disease/disease-diagnoses/get', {
            params: {
                keyword: keyword,
                searchDateFrom: dateFrom,
                searchDateTo: dateTo,
                perPage: '20',
                landId: listLands
            }
        });
  
        const responseData = response?.data;
        const normalizedData: diseaseModel[] = responseData['data'].map(
            (item: any, index: number) => ({
                key : item.id,
                no: index + 1,
                predictResult: item.plantDisease.diseaseName,
                description: item.description,
                feedback: item.feedback,
                date: item.createdDate,
            })
        );

        return normalizedData;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
};
