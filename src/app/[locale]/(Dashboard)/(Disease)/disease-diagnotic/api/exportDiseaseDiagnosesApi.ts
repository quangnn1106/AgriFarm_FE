import { http } from "@/utils/config";

const fetchDiseaseDataForExport = async (
    keyword: string,
    dateFrom: string,
    dateTo: string
    ) => {
    try {
        const response = await http.get('/disease/disease-diagnoses/download', {
            params: {
                keyword: keyword,
                searchDateFrom: dateFrom,
                searchDateTo: dateTo,
                perPage: '20',
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
  };
  
export default fetchDiseaseDataForExport;
