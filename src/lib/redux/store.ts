import {configureStore} from "@reduxjs/toolkit";
import authReducer from "@/lib/redux/slice/authSlice";
import {useSelector} from "react-redux";

export const userStore = configureStore({
  reducer: {
    authReducer,
  }
});
export type RootState = ReturnType<typeof userStore.getState>
export const useAppSelector = useSelector.withTypes<RootState>()
export type AppDispatch = typeof userStore.dispatch;