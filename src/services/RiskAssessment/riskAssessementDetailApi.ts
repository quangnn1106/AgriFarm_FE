import { AxiosInstance } from 'axios';

const riskAssessementDetailApi = async (
    http: AxiosInstance | null,
    id: string | null) => {
    try {
        const response = await http?.get('/risk/risk-assessment/detail', {
            params: {
                id: id,
            }
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

export default riskAssessementDetailApi;
