import HttpResponseCommon from '@/types/response';

import { AxiosInstance } from 'axios';
import { AssignRolePayload } from './Payload/request/assignRoleRequest';
import Staffs from './Payload/response/staffs';

export const upgradeRoleMan: (
  http: AxiosInstance | null,
  id?: string
) => Promise<HttpResponseCommon<Staffs[]>> = async (http, id) => {
  const updateRaw: AssignRolePayload = {
    role: 2,
    note: '123'
  };
  try {
    const res = await http?.put(`/user/accounts/up-role`, updateRaw, {
      params: {
        id: id
      }
    });
    // console.log('/register/registry/put ', res);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
