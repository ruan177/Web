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
  const {loggedIn, changeLoggedIn} = useContext(LoginContext);
  
  
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

  const handleDeleteAccount = () => {
    try {

      setShowSuccessMessage(true);
    } catch (error) {

    }

  };

  return (
    <div className="grid bg-gray-100 h-screen">
      <Header />
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
                onClick={handleDeleteAccount}
              >
                <MdDelete className="mr-2" />
                Delete Account
              </button>
            </div>
            {showSuccessMessage && <p className="text-center text-green-500 mt-2">Account deleted successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
