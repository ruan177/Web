// DeleteAccountModal.tsx
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDeleteAccount } from "../../hooks/user/useDeleteAccount";


 const DeleteAccountModal = () => {
  const {
    showModal,
    confirmationText,
    setConfirmationText,
    handleDeleteAccount,
    setShowModal,
    showSuccessMessage, 
    isLoading
  } = useDeleteAccount()


  return (
    <>
      <div className="w-full max-w-screen-md mx-auto shadow-md p-4 md:p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Deletar Conta</h3>
        <p className="mb-2 md:mb-4 text-center text-red-500">Cuidado: Esta ação não pode ser desfeita!</p>
        <div className="flex justify-center md:justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 rounded text-black font-bold py-2 px-6 md:py-2 md:px-8 focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={() => setShowModal(true)}
          >
            <MdDelete className="mr-2" />
            Delete Account
          </button>
        </div>
        {showSuccessMessage && <p className="text-center text-green-500 mt-2">Account deleted successfully!</p>}
      </div>
      <hr />
      {showModal ? (
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
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0   0   24   24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4   12a8   8   0   018-8V0C5.373   0   0   5.373   0   12h4zm2   5.291A7.962   7.962   0   014   12H0c0   3.042   1.135   5.824   3   7.938l3-2.647z"></path>
                    </svg>
                    Deletando...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )};

export default DeleteAccountModal
