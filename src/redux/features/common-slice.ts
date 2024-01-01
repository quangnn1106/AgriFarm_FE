import { ACCESS_TOKEN, settings, http } from '@/utils/config';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import { loginModel } from '@/app/(Auth)/models/login-model';
import { registerModel } from '@/app/(Auth)/models/register-model';

export type UserState = {
  userLogin: UserLoginResponse | null;
  userRegister: UserRegisterResponse | null;
};

export type UserLoginResponse = {
  email: string;
  access: string;
  status: string;
};

export type UserRegisterResponse = {
  email: string;
  status: string;
};

const initialState: UserState = {
  userLogin: {
    email: '',
    access: '',
    status: ''
  },
  userRegister: {
    email: '',
    status: ''
  }
};

const auth = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    resetState: (state: UserState) => {
      if (state.userLogin) state.userLogin.status = '';
      if (state.userRegister) state.userRegister.status = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsyncApi.pending, (state: UserState) => {
        if (state.userLogin) state.userLogin.status = 'loading';
      })
      .addCase(
        loginAsyncApi.fulfilled,
        (state: UserState, action: PayloadAction<UserLoginResponse>) => {
          state.userLogin = action.payload;
          settings.setStorage(ACCESS_TOKEN, action.payload?.access as string);
          settings.setCookie(ACCESS_TOKEN, action.payload?.access as string, 3);
          state.userLogin.status = 'done';
        }
      )
      .addCase(loginAsyncApi.rejected, (state: UserState) => {
        if (state.userLogin) state.userLogin.status = 'error';
      })
      .addCase(registerAsyncApi.pending, (state: UserState) => {
        if (state.userRegister) state.userRegister.status = 'loading';
      })
      .addCase(registerAsyncApi.fulfilled, (state: UserState) => {
        if (state.userRegister) {
          state.userRegister.status = 'done';
        }
      })
      .addCase(registerAsyncApi.rejected, (state: UserState) => {
        if (state.userRegister) {
          state.userRegister.status = 'error';
        }
      });
  }
});

export const { resetState } = auth.actions;

export default auth.reducer;

export const loginAsyncApi = createAppAsyncThunk(
  'userReducer/loginAsyncApi',
  async (userLogin: loginModel) => {
    const response = await http.post('/common/login/', userLogin);
    return response.data;
  }
);

export const registerAsyncApi = createAppAsyncThunk(
  'userReducer/registerAsyncApi',
  async (userRegister: registerModel) => {
    const response = await http.post('/common/register/', userRegister);
    return response.data;
  }
);
