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
    addUser: build.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = userApi;
