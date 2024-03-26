import { RiskItemDef, RiskMasterInputDef } from '@/app/[locale]/(Dashboard)/(Admin)/risk-assessment/interface';
import { AxiosInstance } from 'axios';

interface ItemResponseDef {
    riskItemId: string;
    riskMappingId: string;
    answer: string;
}

const riskAssessmentImplApi = async (
    http: AxiosInstance | null,
    itemRes : ItemResponseDef[]) => {
    try {
        const response = await http?.post('/risk/risk-assessment/implement', {
            riskAssessmentImpl: itemRes
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

export default riskAssessmentImplApi;
