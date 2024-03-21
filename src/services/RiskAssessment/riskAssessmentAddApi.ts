import { RiskItemDef } from '@/app/[locale]/(Dashboard)/(Admin)/risk-assessment/interface';
import { AxiosInstance } from 'axios';

interface params {
    [key : string] : string
}
interface RiskMasterDef {
    riskName: string;
    riskDescription: string;
    createBy: string,
    riskItems: RiskItemDef[];
}
const riskAssessmentAddApi = async (
    http: AxiosInstance | null,
    data : RiskItemDef[]) => {
    try {
        const formData: RiskMasterDef = {
            riskName: "Test risk name",
            riskDescription: "Test risk description",
            createBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            riskItems: data
        }
        console.log(formData);
        // const params : params = {
        //     plantDiseaseId: data.plantDiseaseId,
        //     description: data.description,
        //     feedback: data.feedback,
        //     location: data.location,
        //     createBy: data.createBy
        // };
        // if (data.landId) {
        //     params.landId =  data.landId;
        // }
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
