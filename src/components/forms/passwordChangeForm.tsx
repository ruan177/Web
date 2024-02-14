// PasswordChangeForm.tsx
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useUpdatePassword } from "../../hooks/user/useUpdatePassword";



const PasswordChangeForm = () => {
  const {
    password,
    newPassword,
    setPassword,
    setNewPassword,
    handleChangePassword,
    showSuccessPasswordChangeMessage,
    isLoading
  } = useUpdatePassword();

  return (
    <div className="w-full shadow-md rounded bg-white p-8">
      <h3 className="text-xl overline font-bold text-gray-900 mb-6 text-center">Password</h3>
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Add other fields for changing password */}
      <div className="flex justify-end">
        <button
          className="bg-black hover:bg-blue-700 rounded text-white font-bold py-2 px-8  focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"

          onClick={handleChangePassword}
        >
           {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0   0   24   24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4   12a8   8   0   018-8V0C5.373   0   0   5.373   0   12h4zm2   5.291A7.962   7.962   0   014   12H0c0   3.042   1.135   5.824   3   7.938l3-2.647z"></path>
            </svg>
            Salvando...
          </>
        ) : (
          <>
            <FaSave className="mr-2" />
            Save
          </>
        )}
        </button>
      </div>
      {showSuccessPasswordChangeMessage && <p className="text-center text-green-500 mt-2">Password changed successfully!</p>}
    </div>
  );
};

export default PasswordChangeForm;
