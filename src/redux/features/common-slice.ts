import { ACCESS_TOKEN, http } from '@/utils/config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import { loginModel } from '@/app/[locale]/(Auth)/models/login-model';
import { registerModel } from '@/app/[locale]/(Auth)/models/register-model';
import FormRegisterValues from '@/types/register';
import HttpResponseCommon from '@/types/response';
import Admin, { Solution } from '@/types/admin';
import { register } from '@/services/authService';

export type UserState = {
  userRegister: HttpResponseCommon<Admin | [] | undefined> | null;
};

const initialState: UserState = {
  userRegister: {
    data: {
      id: '49ee98e2-6a34-4895-a325-188fbe7c2c07',
      firstName: 'string 01',
      lastName: 'string 01',
      phone: 'string',
      email: 'string',
      address: 'string',
      siteCode: 'string',
      siteName: 'string',
      isApprove: 0,
      solution: {
        id: '45aa6629-5e67-4c70-aa9c-eed4e82e7da6',
        name: 'Solution 1',
        description: 'This is cheapest solution',
        price: 10.0,
        durationInMonth: 6
      },
      cost: 10.0,
      paymentDetail: ''
    },

    status: 0,
    message: ''
  }
};

const auth = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    resetState: (state: UserState) => {
      if (state.userRegister) state.userRegister.status = 0;
    }
  },
  extraReducers(builder) {
    builder.addCase(registerAsyncApi.pending, (state: UserState) => {
      if (state.userRegister) state.userRegister.message = 'loading';
    });
    builder.addCase(registerAsyncApi.fulfilled, (state: UserState, action) => {
      //tắt loading
      console.log('action: ', action);

      state.userRegister = action.payload;
    });
    builder.addCase(registerAsyncApi.rejected, (state: UserState, action) => {
      if (state.userRegister) {
        console.log('state.userRegister rejected: ', action);

        state.userRegister.message = 'error';
      }
    });
  }
});

export const { resetState } = auth.actions;

export default auth.reducer;

// export const loginAsyncApi = createAppAsyncThunk(
//   'userReducer/loginAsyncApi',
//   async (userLogin: loginModel) => {
//     const response = await http.post('/common/login/', userLogin);
//     return response.data;
//   }
// );

export const registerAsyncApi = createAppAsyncThunk(
  'userReducer/registerAsyncApi',
  async (values: FormRegisterValues) => {
    // const userRegister: FormRegisterValues = {
    //   ...values,
    //   paymentDetail: 'custom default'
    //   // solutionId: 'e43d372f-1ad5-46bd-b950-a95419211c0e'
    // };
    const response = await register(values);
    if (response && response.status === 202) {
      console.log('data resp register: ', response);

      return response;
    }
    if (response && response.status === 400) {
      console.log('ấdasdasdasdass', response.message);

      return response;
    }

    return null;
  }
);
