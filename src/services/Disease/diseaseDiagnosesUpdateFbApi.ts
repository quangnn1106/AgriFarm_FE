import { http } from '@/utils/config';

const diseaseDiagnosesUpdateFbApi = async (
    id: any,
    feedback: string
    ) => {
    try {
        const response = await http.put('/disease/disease-diagnoses/update-feedback-content', {
                id: id,
                feedback: feedback
        });
  
        const responseData = response.data;

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
export default diseaseDiagnosesUpdateFbApi;
