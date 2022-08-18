import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userApi } from "./user/userServices";
import auth from "./user";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [userApi.reducerPath]: userApi.reducer,
      auth
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
    ...options
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
