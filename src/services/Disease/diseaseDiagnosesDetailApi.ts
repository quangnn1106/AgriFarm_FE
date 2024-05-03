import { AxiosInstance } from 'axios';

const fetchDiseaseDetailData = async (
    http: AxiosInstance | null,
    id: any
    ) => {
    try {
        const response = await http?.get('/disease/disease-diagnoses/get-by-id', {
            params: {
                id: id,
            }
        });
  
        const responseData = response?.data;
        if (responseData) {
            const getUserName = await http?.get('/User/Accounts/get', {
                params: {
                    id: responseData?.data.createBy,
                }
            });
            responseData.data.createBy = `${getUserName?.data.data.firstName} ${getUserName?.data.data.lastName}`;
            responseData.data.email = getUserName?.data.data.email;
        }
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
export default fetchDiseaseDetailData;
