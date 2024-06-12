"use client";

import React from "react";
import { Button } from "../../../components/ui";
import { useAddLocationMutation } from "@/lib/services/locations/locationApi";

const AddLocation = () => {
  const [addLocation, { data, error, isLoading }] = useAddLocationMutation();

  // Possible values of error:
  // FetchBaseQueryError | SerializedError | undefined
  // 1) Checking if error is NOT undefined:
  if (error) {
    // 2) Checking if error is FetchBaseQueryError based on
    // discriminated property 'status':
    if ("status" in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      );
      // 3) We're left with the 3rd case, SerializedError:
    } else {
      // you can access all properties of `SerializedError` here
      return <div>{error.message}</div>;
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddLocation = async () => {
    try {
      const newLocationData = {
        name: "New Location",
        address: "New Address",
        lat: 44,
        lng: 43,
      };
      await addLocation(newLocationData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button onClick={handleAddLocation}>Add Location</Button>
      {data && <div>Location added successfully</div>}
    </div>
  );
};

export default AddLocation;
