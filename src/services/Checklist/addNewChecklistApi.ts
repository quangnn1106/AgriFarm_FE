import { AxiosInstance } from 'axios';
const addNewChecklistApi = async (
    http: AxiosInstance | null,
    userId : string,
    checklistMasterId: string) => {
    try {
        const response = await http?.post('/checklist/checklist-global-GAP/add-list', {
            userId: userId,
            checklistMasterId: checklistMasterId
        });

        return response?.data.data.id;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
};

export default addNewChecklistApi;
