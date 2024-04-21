import { AxiosInstance } from 'axios';

export const getListSiteDistanceApi = async (http: AxiosInstance | null) => {
    try {
        // Call api land
        const response = await http?.get('/farm/sites/get/');
        
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