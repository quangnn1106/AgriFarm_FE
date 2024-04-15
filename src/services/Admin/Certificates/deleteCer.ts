import { AxiosInstance } from 'axios';

export const deleteCerApi = async (
  http: AxiosInstance | null,
  id?: string | undefined
) => {
  try {
    const res = await http?.delete(`user/user-cert/delete`, {
      params: {
        id: id
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
};
