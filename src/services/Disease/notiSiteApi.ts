import { WarningDiseaseDef } from '@/app/[locale]/(Dashboard)/(Member)/diagnostic/model/diseaseDiagnosticModel';
import { AxiosInstance } from 'axios';

interface params {
    [key : string] : string
}
const notiSiteApi = async (
    http: AxiosInstance | null,
    data : WarningDiseaseDef) => {
    try {
        const params : params = {
            SiteId: data.siteId,
            Distance: data.distance.toString(),
            DiseaseName: data.diseaseName,
        };
        const response = await http?.post('/noti/hubs/warning-disease', params);

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
export default notiSiteApi;
