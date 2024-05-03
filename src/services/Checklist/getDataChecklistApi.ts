import { AxiosInstance } from 'axios';

const getDataChecklistApi = async (
    http: AxiosInstance | null,
    id: string) => {
    try {
        const response = await http?.get('/checklist/checklist-global-GAP/get-checklist', {
            params: {
                id: id
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

export default getDataChecklistApi;
