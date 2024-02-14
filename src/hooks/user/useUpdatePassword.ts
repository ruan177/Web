// useUpdatePassword.js
import { useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "../../context/loginContext";
import useAxios from "../../lib/axios";

export const useUpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessPasswordChangeMessage, setSuccessPasswordChangeMessage] = useState(false);
  const { user, logout } = useAuth();
  const axios = useAxios();

  const handleChangePasswordMutation = useMutation(async () => {
    const response = await axios.patch(`/users/${user?.id}/update`, {
      password,
      newPassword,
    });
    return response.data;
  }, {
    onSuccess: () => {
      setSuccessPasswordChangeMessage(true);
      logout();
    },
  });

  const handleChangePassword = () => {
    handleChangePasswordMutation.mutate();
  };

  return {
    newPassword,
    setNewPassword,
    password,
    setPassword,
    showSuccessPasswordChangeMessage,
    handleChangePassword,
    isLoading: handleChangePasswordMutation.isLoading
  };
};
