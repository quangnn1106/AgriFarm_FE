import { AxiosInstance } from "axios";

export const deleteSupplierApi = async ( http: AxiosInstance | null, supplierId?: string | undefined ) => {
    try {
        const res = await http?.delete(`material/suppliers/delete`, {
          params: {
            id: supplierId
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