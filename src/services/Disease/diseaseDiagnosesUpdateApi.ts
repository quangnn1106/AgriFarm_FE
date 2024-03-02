import { AxiosInstance } from 'axios';

const diseaseDiagnosesUpdateFeedback = async (
    http: AxiosInstance | null,
    id: any,
    feedbackStatus: number
    ) => {
    try {
        const response = await http?.put('/disease/disease-diagnoses/edit-status-feedback', {
                id: id,
                feedbackStatus: feedbackStatus
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
export default diseaseDiagnosesUpdateFeedback;
