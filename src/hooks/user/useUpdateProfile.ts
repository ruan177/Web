// useUpdateProfile.js
import { useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../lib/queryClient";
import { useAuth } from "../../context/loginContext";
import useAxios from "../../lib/axios";

export const useUpdateProfile = () => {
  const [newUsername, setNewUsername] = useState("");
  const [username, setUsername] = useState("");
  const [showSuccessProfileChangeMessage, setShowSuccessProfileChangeMessage] = useState(false);
  const { user } = useAuth();
  const axios = useAxios();

  const updateProfileMutation = useMutation(async () => {
    const response = await axios.patch(`/users/${user?.id}/update`, {
      username,
      newUsername,
    });
    return response.data;
  }, {
    onSuccess: () => {
      setShowSuccessProfileChangeMessage(true);
      queryClient.invalidateQueries(['userInfo', user?.id]);
      queryClient.refetchQueries(['userInfo', user?.id]);
    },
  });

  const handleProfileSave = () => {
    updateProfileMutation.mutate();
  };

  return {
    newUsername,
    setNewUsername,
    username,
    setUsername,
    showSuccessProfileChangeMessage,
    handleProfileSave,
    isLoading: updateProfileMutation.isLoading
  };
};
