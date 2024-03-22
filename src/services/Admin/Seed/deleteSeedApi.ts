import { AxiosInstance } from "axios";

export const deleteSeedApi = async ( http: AxiosInstance | null, seedId?: string | undefined ) => {
    try {
        const res = await http?.delete(`seed/farm-seeds/delete`, {
          params: {
            id: seedId
          }
        });
        console.log(res?.status);
        
      } catch (error: unknown) {
        // Assert the type of error to be an instance of Error
        if (error instanceof Error) {
          throw new Error(`Error calling API: ${error.message}`);
        } else {
          throw new Error(`Unknown error occurred: ${error}`);
        }
      }
  }