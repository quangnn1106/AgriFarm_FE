
import { AxiosInstance } from "axios";

export const deleteProduct = async ( http: AxiosInstance | null, productId?: string | undefined ) => {
    try {
        const res = await http?.delete(`cult/products/delete`, {
          params: {
            id: productId
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