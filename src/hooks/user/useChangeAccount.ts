import { useState } from "react";
import { useMutation } from "react-query";
import { useAxios } from "../../lib/axios";
import { queryClient } from "../../lib/queryClient";
import { useAuth } from "../../context/loginContext";

export const useChangeAccount = () => {
  const [newpassword, setNewPassword] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userId = localStorage.getItem("user");
  const { loggedIn, changeLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const axios = useAxios();

  const updateProfileMutation = useMutation(
    async () => {
      const response = await axios.patch(`/users/${userId}/update`, {
        username,
        newusername,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        setShowSuccessMessage(true);
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );

  const handleChangePasswordMutation = useMutation(
    async () => {
      const response = await axios.patch(`/users/${userId}/update`, {
        password,
        newpassword,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        setShowSuccessMessage(true);
        changeLoggedIn(false);
      },
    }
  );

  const handleProfileSave = () => {
    updateProfileMutation.mutate();
  };

  const handleChangePassword = () => {
    handleChangePasswordMutation.mutate();
  };

  const handleDeleteAccount = async () => {
    if (confirmationText === "DELETE") {
      try {
        const response = await axios.delete(`/users/${userId}/delete`);
        if (response.status === 200) {
          setShowSuccessMessage(true);

          setTimeout(() => {
            changeLoggedIn(false);
            window.location.href = "/login"; // Redirect to the login page
          }, 3000); // Redirect delay in milliseconds (e.g., 3 seconds)
        }
      } catch (error) {
        // Handle error
      }
    } else {
      // Display an error message for incorrect confirmation text
      alert("Incorrect confirmation text. Type 'DELETE' to delete the account.");
    }
  };

  return {
    newpassword,
    setNewPassword,
    newusername,
    setNewUsername,
    password,
    setPassword,
    username,
    setUsername,
    showSuccessMessage,
    setShowSuccessMessage,
    showModal,
    setShowModal,
    confirmationText,
    setConfirmationText,
    loggedIn,
    handleProfileSave,
    handleChangePassword,
    handleDeleteAccount,
  };
};
