import { SearchConditionDef } from '@/app/[locale]/(Dashboard)/(Admin)/checklist-global-gap/models';
import { AxiosInstance } from 'axios';

const checklistApi = async (
    http: AxiosInstance | null,
    searchCondition: SearchConditionDef) => {
    try {
        const response = await http?.get('/checklist/checklist-global-GAP/get-list', {
            params: {
                userId: searchCondition.userId,
                keyword: searchCondition.keyword,
                searchByDate: searchCondition.searchByDate,
                status: searchCondition.status,
                perPage: searchCondition.perPage,
                pageId: searchCondition.pageId
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

export default checklistApi;
