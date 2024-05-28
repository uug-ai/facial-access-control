import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

// const rootReducer = combineSlices(userSlice);

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// export type RootState = ReturnType<typeof makeStore.getState>;
// export type AppDispatch = typeof makeStore.dispatch;
