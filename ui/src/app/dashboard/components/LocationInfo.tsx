"use client";

import { useGetLocationsQuery } from "@/lib/services/locations/locationApi";
import { Box, Text } from "@uug-ai/ui";
import React from "react";

const LocationInfo = () => {
  const { data, error, isLoading } = useGetLocationsQuery(undefined);

  return (
    <Box>
      <Text as="p">Locations: {data?.data.length}</Text>
    </Box>
  );
};

export default LocationInfo;
