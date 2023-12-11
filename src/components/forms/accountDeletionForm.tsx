// DeleteAccountModal.tsx
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

interface DeleteAccountModalProps {
  showModal: boolean;
  showSuccessMessage: boolean;
  confirmationText: string;
  setShowModal: (showModal: boolean) => void; 
  setConfirmationText: (value: string) => void;
  handleDeleteAccount: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  showModal,
  confirmationText,
  setConfirmationText,
  handleDeleteAccount,
  setShowModal,

}) => {
  return (
    showModal? (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black ">
        <div className="bg-white p-6  ">
          <p className="mb-4 text-center text-black">
            Are you sure you want to delete your account? Type "DELETE" to confirm:
          </p>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full mb-4"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline mr-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
              onClick={handleDeleteAccount}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      ): null
    )
  
};

export default DeleteAccountModal
