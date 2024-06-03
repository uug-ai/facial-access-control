import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/api/" }),
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
      query: (user) => ({
        url: "locations",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: user,
      }),
      invalidatesTags: ["Location"],
    }),
    updateLocation: build.mutation({
      query: ({ id, body }) => ({
        url: `locations/${id}`,
        method: "PUT",
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
