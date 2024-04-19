import { AxiosInstance } from 'axios';
type ChecklistItemResponsesDef = {
    checklistItemId: string;
    level: number;
    result: number;
    note: string;
    attachment: string;
}
export interface ChecklistResponseDef {
    checklistMappingId: string;
    checklistItemResponses: ChecklistItemResponsesDef[]
}
export const createResponseApi = async (
    http: AxiosInstance | null,
    data : ChecklistResponseDef) => {
    try {
        const response = await http?.post('/checklist/checklist-global-GAP/add-item-response', data);

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
