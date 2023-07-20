
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Settings = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [oldUsername, setOldUsername] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleUpdateOption = () => {
    setShowUpdate(true);
  };

  const handleDeleteOption = () => {
    setShowDeleteModal(true);
    setDeleteInputValue("");
    setDeleteConfirmed(false);
  };

  const handleCancelOption = () => {
    setShowUpdate(false);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (deleteInputValue === "DELETE") {
      // Coloque aqui a lógica para deletar a conta
      setDeleteConfirmed(true);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Drawer */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="font-bold text-xl mb-4">Settings</h2>
        <ul>
          <li
            className="cursor-pointer py-2 border-b border-gray-300 tracking-tight"
            onClick={handleUpdateOption}
          >
            Update Account
          </li>
          <li
            className="cursor-pointer py-2 border-b border-gray-300"
            onClick={handleDeleteOption}
          >
            Delete Account
          </li>
          <li
            className="cursor-pointer py-2 border-b border-gray-300"
            
          >
            <NavLink to="/">Back to Home</NavLink>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="w-3/4 p-4">
        {showUpdate ? (
          <>
            <h3 className="font-bold text-lg mb-4 text-center">Update Account</h3>
            <div className="mb-4"> 
              <label htmlFor="oldUsername" className="block mb-2 italic flex items-center font-medium rounded-lg text-sm text-indigo-900">
                Old Username:
              </label>
              <input
                type="text"
                id="oldUsername"
                className="border border-gray-300 px-2 py-1 w-full rounded"
                value={oldUsername}
                onChange={(e) => setOldUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block mb-2 italic flex items-center font-medium rounded-lg text-sm text-indigo-900">
                Old Password:
              </label>
              <input
                type="password"
                id="oldPassword"
                className="border border-gray-300 px-2 py-1 w-full rounded"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="changePassword" className="block mb-2 italic flex items-center font-medium rounded-lg text-sm text-indigo-900">
                New Password:
              </label>
              <input
                type="password"
                id="changePassword"
                className="border border-gray-300 px-2 py-1 w-full rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newUsername" className="block mb-2 italic flex items-center font-medium rounded-lg text-sm text-indigo-900">
                New Username:
              </label>
              <input
                type="text"
                id="newUsername"
                className="border border-gray-300 px-2 py-1 w-full rounded"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            {/* Add other fields for updating account */}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                onClick={handleCancelOption}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <h3 className="font-bold text-lg">Select an option from the drawer</h3>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            {!deleteConfirmed ? (
              <>
                <p className="mb-4"> If you delete your account, all courses you have created will be permanently deleted and cannot be recovered.</p>
                <input
                  type="text"
                  placeholder="Type DELETE to confirm"
                  className="border border-gray-300 px-2 py-1 w-full rounded mb-4"
                  value={deleteInputValue}
                  onChange={(e) => setDeleteInputValue(e.target.value)}
                />
                <div className="flex justify-center">
                  <button
                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleCancelOption}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleConfirmDelete}
                  >
                    Confirm Delete
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-green-500">Account deleted successfully!</p>
            )}
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      
    </div>
  );
};
