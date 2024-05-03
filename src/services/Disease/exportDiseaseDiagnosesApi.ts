import { AxiosInstance } from 'axios';

export const fetchDiseaseDataForExport = async (
    http: AxiosInstance | null,
    keyword: string,
    dateFrom: string,
    dateTo: string
    ) => {
    try {
        const response = await http?.get('/disease/disease-diagnoses/download', {
            params: {
                keyword: keyword,
                searchDateFrom: dateFrom,
                searchDateTo: dateTo,
                perPage: '20',
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

export const fetchDiseaseDataForExportAdmin = async (
    http: AxiosInstance | null,
    keyword: string,
    dateFrom: string,
    dateTo: string,
    listLands: string[] | undefined
    ) => {
    try {
        const response = await http?.get('/disease/disease-diagnoses/download', {
            params: {
                keyword: keyword,
                searchDateFrom: dateFrom,
                searchDateTo: dateTo,
                perPage: '20',
                landId: listLands
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