// PasswordChangeForm.tsx
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";

interface PasswordChangeFormProps {
  password: string;
  newpassword: string;
  setPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  handleChangePassword: () => void;
  showSuccessMessage: boolean;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  password,
  newpassword,
  setPassword,
  setNewPassword,
  handleChangePassword,
  showSuccessMessage,
}) => {
  return (
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
                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline flex items-center"
                
                onClick={handleChangePassword}
              >
              <FaSave className="mr-2" />
                Save Changes
              </button>
            </div>
            {showSuccessMessage && <p className="text-center text-green-500 mt-2">Password changed successfully!</p>}
          </div>
  );
};

export default PasswordChangeForm;
