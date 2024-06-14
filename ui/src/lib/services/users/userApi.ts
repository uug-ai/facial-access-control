import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const getToken = async () => {
  const session = await getSession();
  return session?.user.token;
};

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost/api/",
  prepareHeaders: async (headers) => {
    const token = await getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: async (args, api, extraOptions) => {
    const token = await getToken();
    if (token) {
      args.headers = { ...args.headers, Authorization: `Bearer ${token}` };
    }
    return baseQuery(args, api, extraOptions);
  },
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => ({
        url: "users",
      }),
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
        headers: { "Content-Type": "application/json" },
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id: number) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    boardUser: build.mutation({
      query: (user) => ({
        url: "users/onboarding",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
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
  useDeleteUserMutation,
} = userApi;
