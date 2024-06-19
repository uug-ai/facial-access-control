import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import dialogReducer from "./features/dialog/dialogSlice";
import { userApi } from "./services/users/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { locationApi } from "./services/locations/locationApi";

// const rootReducer = combineSlices(userSlice);

export const store = configureStore({
  reducer: {
    user: userReducer,
    dialog: dialogReducer,
    [userApi.reducerPath]: userApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(locationApi.middleware),
});

setupListeners(store.dispatch);

// Infer the type of store
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
