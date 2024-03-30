import { AxiosInstance } from "axios";

export const deleteFertilizerApi = async ( http: AxiosInstance | null, fertilizerId?: string | undefined ) => {
    try {
        const res = await http?.delete(`fert/farm-fertilizes/delete`, {
          params: {
            id: fertilizerId
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