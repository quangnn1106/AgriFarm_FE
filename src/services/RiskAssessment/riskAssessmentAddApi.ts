import { RiskItemDef, RiskMasterInputDef } from '@/app/[locale]/(Dashboard)/(Admin)/risk-assessment/interface';
import { AxiosInstance } from 'axios';

interface RiskMasterDef {
    riskName: string;
    riskDescription: string;
    createBy: string,
    isDraft: boolean,
    riskItems: RiskItemDef[];
}
const riskAssessmentAddApi = async (
    http: AxiosInstance | null,
    riskItems : RiskItemDef[],
    riskMaster : RiskMasterInputDef) => {
    try {
        const formData: RiskMasterDef = {
            riskName: riskMaster.riskName,
            riskDescription: riskMaster.riskDescription,
            isDraft: riskMaster.isDraft,
            createBy: riskMaster.createBy,
            riskItems: riskItems
        }
        const response = await http?.post('/risk/risk-assessment/add', formData);

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

export default riskAssessmentAddApi;
