// ProfileForm.tsx
import React from "react";
import { MdSave } from "react-icons/md";

interface ProfileFormProps {
  username: string;
  newusername: string;
  setUsername: (value: string) => void;
  setNewUsername: (value: string) => void;
  handleProfileSave: () => void;
  showSuccessProfileChangeMessage: boolean;
}

const ProfileChangeForm: React.FC<ProfileFormProps> = ({
  username,
  newusername,
  setNewUsername,
  setUsername,
  handleProfileSave,
  showSuccessProfileChangeMessage,
}) => {
  return (
    <div className="w-full shadow-md rounded bg-white p-4 md:p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Change username</h3>

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
            value={newusername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
      </div>
      {/* Add other fields for profile */}
      <div className="flex justify-center md:justify-end mb-4"> {/* Centralizar o botão em dispositivos móveis */}
        <button
          className="bg-blue-500 hover:bg-blue-700 rounded text-white font-bold py-2 px-6 md:py-2 md:px-8 focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={handleProfileSave}
        >
          <MdSave className="mr-2" />
          Save
        </button>
      </div>
      {showSuccessProfileChangeMessage && <p className="text-center text-green-500 mt-2">Changes saved successfully!</p>}
    </div>

  );
};

export default ProfileChangeForm;
