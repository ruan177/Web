import { useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../lib/queryClient";
import { useAuth } from "../../context/loginContext";
import axios from "axios";

export const useChangeAccount = () => {
  const [newpassword, setNewPassword] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showSuccessProfileChangeMessage, setShowSuccessProfileChangeMessage] = useState(false);
  const [showSuccessPasswordChangeMessage, setSuccessPasswordChangeMessag] = useState(false);
  const {user, logout} = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");


  const updateProfileMutation = useMutation(
    async () => {
      const response = await axios.patch(`http://localhost:8080/users/${user?.id}/update`, {
        username,
        newusername,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        setShowSuccessProfileChangeMessage(true);
        queryClient.invalidateQueries(["userInfo"]);
      },
    }
  );

  const handleChangePasswordMutation = useMutation(
    async () => {
      const response = await axios.patch(`http://localhost:8080/users/${user?.id}/update`, {
        password,
        newpassword,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        setSuccessPasswordChangeMessag(true);
        logout();
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
        const response = await axios.delete(`http://localhost:8080/users/${user?.id}/delete`);
        if (response.status === 200) {
          setShowSuccessMessage(true);

          setTimeout(() => {
            logout();
            // Redirect to the login page
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
    showSuccessProfileChangeMessage,
    showSuccessPasswordChangeMessage,
    setShowSuccessMessage,
    showModal,
    setShowModal,
    confirmationText,
    setConfirmationText,
    handleProfileSave,
    handleChangePassword,
    handleDeleteAccount,
  };
};
