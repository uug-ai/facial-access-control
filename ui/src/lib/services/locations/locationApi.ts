import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const getToken = async () => {
  const session = await getSession();
  return session?.user.token;
};

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

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    return result;
  },
  tagTypes: ["Location"],
  endpoints: (build) => ({
    getLocations: build.query({
      query: () => "locations",
      providesTags: ["Location"],
    }),
    getLocation: build.query({
      query: (id: number) => `locations/${id}`,
      providesTags: ["Location"],
    }),
    addLocation: build.mutation({
      query: (location) => ({
        url: "locations",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: location,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocation: build.mutation({
      query: ({ id, body }) => ({
        url: `locations/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      invalidatesTags: ["Location"],
    }),
    deleteLocation: build.mutation({
      query: (id: number) => ({
        url: `locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationQuery,
  useAddLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
