"use client";

import React from "react";
import { useAddUserMutation } from "@/lib/services/users/userApi"; // Replace "path/to/addUsersQuery" with the actual path to the module containing the useAddUsersQuery function.
import { Button } from "../../../components/ui";

const AddUser = () => {
  const [addUser, { data, error, isLoading }] = useAddUserMutation();

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

  const handleAddUser = async () => {
    try {
      const newUserData = {
        firstName: "Johnn",
        lastName: "Doe",
        email: "newusermail@example.com",
        password: "password",
        role: "admin",
        installed: true,
        language: "en",
      };
      await addUser(newUserData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button onClick={handleAddUser}>Add User</Button>
      {data && <div>User added successfully</div>}
    </div>
  );
};

export default AddUser;
