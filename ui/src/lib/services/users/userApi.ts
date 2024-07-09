import { baseQuery, getToken } from "@/lib/utils/apiMethods";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: async (args, api, extraOptions) => {
    const token = await getToken();
    if (token) {
      args.headers = { ...args.headers, Authorization: `Bearer ${token}` };
    }
    console.log("args:", args, "api:", api, "extraOptions:", extraOptions);
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
      query: (user) => ({
        url: `users/${user.id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: user,
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
    inviteUser: build.mutation({
      query: (user) => ({
        url: "users/invite",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    onboardUser: build.mutation({
      query: (user) => {
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
          if (key === 'video' && value instanceof Blob) {
            formData.append(key, value, 'video.webm');
          } else {
            formData.append(key, value as string);
          }
        });

        return {
          url: "users/onboard",
          method: "POST",
          body: formData,
        };
      },
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
  useInviteUserMutation,
  useOnboardUserMutation
} = userApi;
