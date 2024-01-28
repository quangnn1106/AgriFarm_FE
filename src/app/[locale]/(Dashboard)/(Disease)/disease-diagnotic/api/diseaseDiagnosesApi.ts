import { diseaseModel } from "../model/disease-model"; 
import { http } from '@/utils/config';

const fetchDiseaseData = async (
    keyword: string,
    dateFrom: string,
    dateTo: string
    ) => {
    try {
        const response = await http.get('/disease/disease-diagnoses/get', {
            params: {
                keyword: keyword,
                searchDateFrom: dateFrom,
                searchDateTo: dateTo,
                perPage: '20',
            }
        });
  
        const responseData = response.data;
        const normalizedData: diseaseModel[] = responseData['data'].map(
            (item: any, index: number) => ({
                key: `row_${index + 1}`,
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

export default fetchDiseaseData;
