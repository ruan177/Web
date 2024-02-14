// ProfileForm.tsx
import React from "react";
import { MdSave } from "react-icons/md";
import { useUpdateProfile } from "../../hooks/user/useUpdateProfile";



const ProfileChangeForm = () => {
  const { 
    username,
    newUsername,
    setNewUsername,
    setUsername,
    handleProfileSave,
    showSuccessProfileChangeMessage ,
    isLoading
  } = useUpdateProfile();

  return (
    <div className="w-full shadow-md rounded bg-white p-4 md:p-8">
      <h3 className="text-xl overline font-bold text-gray-900 mb-4 md:mb-6 text-center">Username</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
      </div>
      {/* Add other fields for profile */}
      <div className="flex justify-center md:justify-end mb-4"> {/* Centralizar o botão em dispositivos móveis */}
        <button
          className="bg-black hover:bg-blue-700 rounded text-white font-bold py-2 px-6 md:py-2 md:px-8 focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={handleProfileSave}
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
            <MdSave className="mr-2" />
            Save
          </>
        )}
        </button>
      </div>
      {showSuccessProfileChangeMessage && <p className="text-center text-green-500 mt-2">Changes saved successfully!</p>}
    </div>

  );
};

export default ProfileChangeForm;
