import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import { userApi } from "./services/users/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";

// const rootReducer = combineSlices(userSlice);

export const store = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  });
};

//setupListeners(store.dispatch);

// Infer the type of store
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
