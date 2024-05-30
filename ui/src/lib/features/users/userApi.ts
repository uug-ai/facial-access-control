import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "apiUsers",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/api/" }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    getUser: build.query({
      query: (id: number) => `users/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = userApi;
