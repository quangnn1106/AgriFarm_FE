import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/common-slice";
import userReducer from "./features/user-slice";
import productsReducer from "./features/season-slice";



// define reducer for rtk
export const store = configureStore({
    reducer: {
        authReducer,
        userReducer,
        productsReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;