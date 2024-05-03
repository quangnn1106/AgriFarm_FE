import HttpResponseCommon from '@/types/response';
import { AxiosInstance } from 'axios';
import { SolutionPackage } from './payload/response/solutionResponse';

const getSolutionApi: (
  http?: AxiosInstance | null
) => Promise<HttpResponseCommon<SolutionPackage[]>> = async http => {
  const res = await http?.get(`/farm/solution/get`, {
    // params: {
    //   seasonId: seasonId
    // },
    // headers: {
    //   pageSize: 40
    // }
  });
  //console.log('response staffsService: ', res);
  return res?.data;
};

export default getSolutionApi;
