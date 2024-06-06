import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import authReducer from "./features/auth/authSlice";
import { userApi } from "./services/users/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { locationApi } from "./services/locations/locationApi";
import { authApi } from "./services/auth/authApi";

// const rootReducer = combineSlices(userSlice);

export const store = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      [userApi.reducerPath]: userApi.reducer,
      [locationApi.reducerPath]: locationApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(locationApi.middleware)
        .concat(authApi.middleware),
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
