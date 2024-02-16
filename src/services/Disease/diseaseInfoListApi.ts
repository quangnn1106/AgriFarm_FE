import { http } from '@/utils/config';

const diseaseInfoListApi = async () => {
    try {
        const response = await http.get('/disease/disease-info/get');
  
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
export default diseaseInfoListApi;
