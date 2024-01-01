import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../createAppAsyncThunk';
import axios from 'axios';
import { AppDispatch } from '../store';

export type stateUser = {
  users: UserModel[];
};

export type UserModel = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
};
const initialState: stateUser = {
  users: [
    {
      id: 1,
      firstName: 'Quag',
      lastName: 'Nguyen',
      age: 20,
      gender: 'male'
    }
  ]
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setArrUserAction: (state: stateUser, action: PayloadAction<UserModel[]>) => {
      state.users = action.payload;
    }
  },
  extraReducers(builder) {
    //pending: đang xử lý
    //fulfilled: đã xử lý thành công
    //rejected: xử lý thất bại
    builder.addCase(GetAllUser.pending, (state, action) => {
      //bật loading
    });
    builder.addCase(
      GetAllUser.fulfilled,
      (state: stateUser, action: PayloadAction<UserModel[]>) => {
        //tắt loading
        console.log('user reducer: ', action);

        state.users = action.payload;
      }
    );
    builder.addCase(GetAllUser.rejected, (state, action) => {
      //tắt loading
    });
  }
});

export const { setArrUserAction } = user.actions;

export default user.reducer;

/* ---------------- action api async action ----------  */
export const getUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await axios({ url: 'https://dummyjson.com/users', method: 'GET' });
      const content: UserModel[] = result.data.users;
      //Sau khi lấy dữ liệu từ api về chúng ta sẽ dispatch lên store
      const action: PayloadAction<UserModel[]> = setArrUserAction(content);
      console.log('content: ', content);

      console.log('71', action);

      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

// thunk
export const GetAllUser = createAsyncThunk('user/GetAllUser', async () => {
  const response = await axios({
    url: 'https://dummyjson.com/users',
    method: 'GET'
  });

  // The value we return becomes the `fulfilled` action payload
  return response.data;
});
