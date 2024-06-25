import { baseQuery } from "@/lib/utils/apiMethods";
import { createApi } from "@reduxjs/toolkit/query/react";

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
