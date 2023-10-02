import { useContext, useState } from "react";
import { MdSave, MdDelete } from "react-icons/md";
import { Header } from "../../components/headers/headerForm";
import { useMutation, useQueries, useQuery } from "react-query";
import { useAxios } from "../../lib/axios";
import { queryClient } from "../../lib/queryClient";
import { useAuth } from "../../context/loginContext";
import { FaSave } from "react-icons/fa";
import ProfileChangeForm from "../../components/forms/profileChangeForm";
import PasswordChangeForm from "../../components/forms/passwordChangeForm";
import DeleteAccountModal from "../../components/forms/accountDeletionForm";


export const ChangeAccount = () => {
  const [newpassword, setNewPassword] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userId = localStorage.getItem('user');
  const { loggedIn, changeLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const axios = useAxios();

  const updateProfileMutation = useMutation(
    async () => {
      const response = await axios.patch(`/users/${userId}/update`, {
        username,
        newusername
      });
      return response.data;
    },
    {
      onSuccess: () => {
        setShowSuccessMessage(true);
        queryClient.invalidateQueries(['userInfo']);
      }
    }
  );
  const handleChangePasswordMutation = useMutation(
    async () => {
      const response = await axios.patch(`/users/${userId}/update`, {
        password,
        newpassword
      });
      return response.data;
    },
    {
      onSuccess: () => {
        setShowSuccessMessage(true);

        changeLoggedIn(false);

      }
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
            window.location.href = "/login"; // Redirecionar para a página de login
          }, 3000);
        } // Tempo em milissegundos até o redirecionamento (3 segundos no exemplo)
      } catch (error: any) {

      }
    } else {
      // Caso o texto de confirmação esteja incorreto, exibir mensagem de erro
      alert("Texto de confirmação incorreto. Digite 'DELETE' para excluir a conta.");
    }
  };

  return (
    <div className="grid bg-gray-100 h-screen">
      <Header textColor={"text-black"} />
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="w-full max-w-3xl flex flex-col gap-6 justify-center p-10">
          <div className="w-full shadow-md rounded bg-white p-8">

          </div>
          <ProfileChangeForm
            username={username}
            newusername={newusername}
            setNewUsername={setNewUsername}
            setUsername={setUsername}
            handleProfileSave={handleProfileSave}
            showSuccessMessage={showSuccessMessage}
          />

          <PasswordChangeForm
            password={password}
            newpassword={newpassword}
            setPassword={setPassword}
            setNewPassword={setNewPassword}
            handleChangePassword={handleChangePassword}
            showSuccessMessage={showSuccessMessage}
          />

          <div className="w-full shadow-md rounded bg-white p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Account Deletion</h3>
            <p className="mb-4 text-center text-red-500">WARNING: This action cannot be undone!</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 rounded text-white font-bold py-2 px-8  focus:outline-none focus:shadow-outline flex items-center"
                onClick={() => setShowModal(true)}
              >
                <MdDelete className="mr-2" />
                Delete Account
              </button>
            </div>
            {showSuccessMessage && <p className="text-center text-green-500 mt-2">Account deleted successfully!</p>}
          </div>
          <DeleteAccountModal
            showModal={showModal}
            confirmationText={confirmationText}
            setConfirmationText={setConfirmationText}
            handleDeleteAccount={handleDeleteAccount}
            setShowModal={setShowModal}
            showSuccessMessage={showSuccessMessage} />
        </div>
      </div>
    </div>

  );
};

// ChangeAccount.js




