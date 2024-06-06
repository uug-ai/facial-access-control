import { authApi } from "@/lib/services/auth/authApi";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";

const initialState: Partial<LoginResponse> = {};

const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(name).toString("base64");

  setCookie(name, toBase64, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: () => {
      deleteCookie("auth_token");
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (_state, { payload }) => {
          setAuthCookie(payload.token, "auth_token");
          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.getAuthData.matchFulfilled,
        (_state, { payload }) => {
          setAuthCookie(payload.token, "auth_token");
          return payload;
        }
      );
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
