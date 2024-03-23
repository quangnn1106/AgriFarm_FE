import { SearchConditionDef } from '@/app/[locale]/(Dashboard)/(Admin)/risk-assessment/interface';
import { AxiosInstance } from 'axios';

const riskAssessmentListMasterApi = async (
    http: AxiosInstance | null,
    searchCondition: SearchConditionDef) => {
    try {
        const response = await http?.get('/risk/risk-assessment/get-list-master', {
            params: {
                keyword: searchCondition.keyword,
                isDraft: searchCondition.isDraft,
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

export default riskAssessmentListMasterApi;
