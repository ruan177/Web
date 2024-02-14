// useDeleteAccount.js
import { useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "../../context/loginContext";
import useAxios from "../../lib/axios";

export const useDeleteAccount = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const { user, logout } = useAuth();
  const axios = useAxios();

  const handleDeleteAccountMutation = useMutation(async () => {
    const response = await axios.delete(`/users/${user?.id}/delete`);
    return response.data;
  }, {
    onSuccess: () => {
      setShowSuccessMessage(true);
      logout();
    },
  });

  const handleDeleteAccount = async () => {
    if (confirmationText === "DELETE") {
      handleDeleteAccountMutation.mutate();
    } else {
      alert("Incorrect confirmation text. Type 'DELETE' to delete the account.");
    }
  };

  return {
    showModal,
    setShowModal,
    showSuccessMessage,
    confirmationText,
    setConfirmationText,
    handleDeleteAccount,
    isLoading: handleDeleteAccountMutation.isLoading,
  };
};
