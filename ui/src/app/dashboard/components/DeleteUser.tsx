"use client";

import React from "react";
import { Button } from "@uug-ai/ui";
import { useDeleteUserMutation } from "@/lib/services/users/userApi";

interface DeleteUserProps {
  id: number;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ id }) => {
  const [deleteUser, { data, error, isLoading }] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.error(err);
    }
  };

  return <Button onClick={handleDeleteUser}>x</Button>;
};

export default DeleteUser;
