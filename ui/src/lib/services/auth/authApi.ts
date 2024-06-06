import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      typeof window === "undefined"
        ? "http://localhost:api"
        : window.location.origin,
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/api/login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Auth"],
    }),

    getAuthData: build.query<LoginResponse, { token: string }>({
      query: ({ token }) => ({
        url: "/api/auth-details",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useGetAuthDataQuery } = authApi;
