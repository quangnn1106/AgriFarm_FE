import { RiskItemDef, RiskMasterInputDef } from '@/app/[locale]/(Dashboard)/(Admin)/risk-assessment/interface';
import { AxiosInstance } from 'axios';

const riskAssessmentUpdApi = async (
    http: AxiosInstance | null,
    id: string,
    riskItems : RiskItemDef[],
    riskMaster : RiskMasterInputDef,
    ) => {
    try {
        const response = await http?.put(`/risk/risk-assessment/edit?id=${id}`, {
            riskName: riskMaster.riskName,
            riskDescription: riskMaster.riskDescription,
            updateBy: riskMaster.updateBy,
            riskItems: riskItems
        });
  
        const responseData = response?.data;
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
export default riskAssessmentUpdApi;
