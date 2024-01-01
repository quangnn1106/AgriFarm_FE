import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/common-slice";
import userReducer from "./features/user-slice";


// define reducer for rtk
export const store = configureStore({
    reducer: {
        authReducer,
        userReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;