import { landDef } from '@/app/[locale]/(Dashboard)/(SuperAdmin)/sa/diagnostic/add/model/diseaseDiagnosticModel';
import { AxiosInstance } from 'axios';

export const getListLandApi = async (http: AxiosInstance | null, siteId : string) => {
    try {
        // Call api land
        const response = await http?.get('/soil/lands/get', {
            params: {
                siteId: siteId
            }
        });
        const normalizedData : landDef[] = response?.data.data.map((item : any) => ({
            value: `${item.id},${item.positions[0]?.lat ?? ""},${item.positions[0]?.long ?? ""}`,
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

export const getListLandAdminApi = async (http: AxiosInstance | null, siteId : string): Promise<string[] | undefined> => {
    try {
        // Call api land
        const response = await http?.get('/soil/lands/get', {
            params: {
                siteId: siteId
            }
        });
        const normalizedData : string[] = response?.data.data.map((item : any) => (item.id));
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

