import { landDef } from '@/app/[locale]/(Dashboard)/(Disease)/diagnostic-add/model/diseaseDiagnosticModel';
import { AxiosInstance } from 'axios';

const getListLandApi = async (http: AxiosInstance | null, siteId : string) => {
    try {
        // Call api land
        // const normalizedData : landDef[] = [
        //     {
        //         value: "37fc1a72-00f0-4efb-8ad9-cfd4026d6e28",
        //         label: "Lane 1"
        //     },
        //     {
        //         value: "2931c02b-7bc0-4447-9c08-3024f24c5b4c",
        //         label: "Lane 2"
        //     },
        //     {
        //         value: "1364ad25-a701-4d5d-9d69-292b366c84b0",
        //         label: "Lane 33333333333"
        //     }
        // ];
        
        const response = await http?.get('/soil/lands/get', {
            params: {
                siteId: siteId,
            }
        });
        const normalizedData : landDef[] = response?.data.map((item : any) => ({
            value: item.id,
            label: item.name
        }));
        return normalizedData;
    } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
            throw new Error(`Error calling API: ${error.message}`);
        } else {
            throw new Error(`Unknown error occurred: ${error}`);
        }
    }
};

export default getListLandApi;
