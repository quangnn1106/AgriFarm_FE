import { AxiosInstance } from 'axios';

export interface ChecklistDef {
    name: string;
    checklistItems: {
        orderNo: number;
        afNum: string;
        title: string;
        level: string;
        type: string;
        content: string;
        isResponse: boolean
    }
}
export const createChecklistApi = async (
    http: AxiosInstance | null,
    data : ChecklistDef) => {
    try {
        console.log(data);
        const response = await http?.post('/checklist/checklist-global-GAP/create-checklist', data);

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
