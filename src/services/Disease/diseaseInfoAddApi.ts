import { AxiosInstance } from 'axios';

interface DiseaseInfo {
    diseaseName: string;
    symptoms: string;
    cause: string;
    preventiveMeasures: string;
    suggest: string;
}
const diseaseInfoAdd = async (
    http: AxiosInstance | null,
    dataEdit : DiseaseInfo
    ) => {
    try {
        const response = await http?.post('/disease/disease-info/add', {
            diseaseName: dataEdit.diseaseName,
            symptoms: dataEdit.symptoms,
            cause: dataEdit.cause,
            preventiveMeasures: dataEdit.preventiveMeasures,
            suggest: dataEdit.suggest,
        });
  
        const responseData = response?.data;

        return responseData;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
};
export default diseaseInfoAdd;
