import { AxiosInstance } from "axios";

export const deleteEquipmentApi = async ( http: AxiosInstance | null, equipmentId?: string | undefined ) => {
    try {
        const res = await http?.delete(`equip/farm-equipments/delete`, {
          params: {
            id: equipmentId
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