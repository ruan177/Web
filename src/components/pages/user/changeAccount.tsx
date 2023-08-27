import { useContext, useState } from "react";
import { MdSave, MdDelete } from "react-icons/md";
import { Header } from "../../headers/headerForm";
import { useMutation, useQueries, useQuery } from "react-query";
import { axios } from "../../../lib/axios";
import { queryClient } from "../../../lib/queryClient";
import { LoginContext } from "../../../App";
import { redirect } from "react-router-dom";

export const ChangeAccount = () => {
  const [newpassword, setNewPassword] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userId = localStorage.getItem('user');
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const [showModal, setShowModal] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [profileImage, setProfileImage] = useState(null);
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

        // Logout the user after 5 seconds
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
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Profile</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="oldUsername" className="block italic font-medium text-sm text-indigo-900 mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  id="Username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="changePassword" className="block italic font-medium text-sm text-indigo-900 mb-2">
                  New Username:
                </label>
                <input
                  type="text"
                  id="newUsername"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newusername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
            </div>
            {/* Add other fields for profile */}
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline flex items-center"
                onClick={handleProfileSave}
              >
                <MdSave className="mr-2" />
                Save Changes
              </button>
            </div>
            {showSuccessMessage && <p className="text-center text-green-500 mt-2">Changes saved successfully!</p>}
          </div>

          <div className="w-full shadow-md rounded bg-white p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Change Password</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="oldPassword" className="block italic font-medium text-sm text-indigo-900 mb-2">
                  Current Password:
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block italic font-medium text-sm text-indigo-900 mb-2">
                  New Password:
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Add other fields for changing password */}
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline flex items-center"
                onClick={handleChangePassword}
              >
                <MdSave className="mr-2" />
                Save Changes
              </button>
            </div>
            {showSuccessMessage && <p className="text-center text-green-500 mt-2">Password changed successfully!</p>}
          </div>

          <div className="w-full shadow-md rounded bg-white p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Account Deletion</h3>
            <p className="mb-4 text-center text-red-500">WARNING: This action cannot be undone!</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-full focus:outline-none focus:shadow-outline flex items-center"
                onClick={() => setShowModal(true)}
              >
                <MdDelete className="mr-2" />
                Delete Account
              </button>
            </div>
            {showSuccessMessage && <p className="text-center text-green-500 mt-2">Account deleted successfully!</p>}
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
              <div className="bg-white p-6 rounded-md shadow-md">
                <p className="mb-4 text-center text-red-500">
                  Tem certeza que deseja excluir sua conta? Digite "DELETE" para confirmar:
                </p>
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full mb-4"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                />
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2"
                    onClick={() => setShowModal(false)}
                  >
                    Fechar
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    onClick={handleDeleteAccount}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};
