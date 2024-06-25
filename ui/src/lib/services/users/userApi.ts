import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

let cachedToken: string | null = null;

const getToken = async () => {
  if (!cachedToken) {
    const session = await getSession();
    cachedToken = session?.user.token || null;
  }
  return cachedToken;
};

console.log(process.env.NEXT_PUBLIC_API_URL);

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
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
      query: () => ({ url: "users" }),
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
