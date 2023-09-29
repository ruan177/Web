// ProfileForm.tsx
import React  from "react";
import { MdSave } from "react-icons/md";

interface ProfileFormProps {
  username: string;
  newusername: string;
  setUsername: (value: string) => void;
  setNewUsername: (value: string) => void;
  handleProfileSave: () => void;
  showSuccessMessage: boolean;
}

const ProfileChangeForm: React.FC<ProfileFormProps> = ({
  username,
  newusername,
  setNewUsername,
  setUsername,
  handleProfileSave,
  showSuccessMessage,
}) => {
  return (
    <div className="w-full shadow-md rounded bg-white p-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Username Change</h3>

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
          className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline flex items-center"
          onClick={handleProfileSave}
        >
          <MdSave className="mr-2" />
          Save Changes
        </button>
      </div>
      {showSuccessMessage && <p className="text-center text-green-500 mt-2">Changes saved successfully!</p>}
    </div>
  );
};

export default ProfileChangeForm;
