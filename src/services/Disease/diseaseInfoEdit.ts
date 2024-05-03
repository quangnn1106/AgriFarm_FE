import { AxiosInstance } from 'axios';

interface DiseaseInfo {
    id: string;
    diseaseName: string;
    symptoms: string;
    cause: string;
    preventiveMeasures: string;
    suggest: string;
}
const diseaseInfoEdit = async (
    http: AxiosInstance | null,
    dataEdit : DiseaseInfo
    ) => {
    try {
        const response = await http?.put('/disease/disease-info/edit-disease', {
            id : dataEdit.id,
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
export default diseaseInfoEdit;
