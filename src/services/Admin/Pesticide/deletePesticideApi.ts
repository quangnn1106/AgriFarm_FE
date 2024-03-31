import { AxiosInstance } from "axios";

export const deletePesticideApi = async ( http: AxiosInstance | null, pesticideId?: string | undefined ) => {
    try {
        const res = await http?.delete(`ppp/farm-pesticides/delete`, {
          params: {
            id: pesticideId
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