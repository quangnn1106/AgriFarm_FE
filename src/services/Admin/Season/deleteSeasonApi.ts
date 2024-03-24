
import { AxiosInstance } from "axios";

export const deleteSeasonApi = async ( http: AxiosInstance | null, seasonId?: string | undefined ) => {
    try {
        const res = await http?.delete(`cult/seasons/delete`, {
          params: {
            id: seasonId
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