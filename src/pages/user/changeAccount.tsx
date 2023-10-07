import { MdDelete } from "react-icons/md";
import { Header } from "../../components/headers/headerForm";
import ProfileChangeForm from "../../components/forms/profileChangeForm";
import PasswordChangeForm from "../../components/forms/passwordChangeForm";
import DeleteAccountModal from "../../components/forms/accountDeletionForm";
import { useChangeAccount } from "../../hooks/user/useChangeAccount";

export const ChangeAccount = () => {
  const {
    newpassword,
    setNewPassword,
    newusername,
    setNewUsername,
    password,
    setPassword,
    username,
    setUsername,
    showSuccessMessage,
    showSuccessProfileChangeMessage,
    showSuccessPasswordChangeMessage,
    showModal,
    setShowModal,
    confirmationText,
    setConfirmationText,
    handleProfileSave,
    handleChangePassword,
    handleDeleteAccount,
  } = useChangeAccount();


  return (
    <div className="grid bg-gray-100 h-screen">
      <Header textColor={"text-black"} />
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="w-full max-w-3xl flex flex-col gap-6 justify-center p-10">
          <div className="w-full shadow-md rounded bg-white p-8">

          </div>
          <ProfileChangeForm
            username={username}
            newusername={newusername}
            setNewUsername={setNewUsername}
            setUsername={setUsername}
            handleProfileSave={handleProfileSave}
            showSuccessProfileChangeMessage={showSuccessProfileChangeMessage}
          />

          <PasswordChangeForm
            password={password}
            newpassword={newpassword}
            setPassword={setPassword}
            setNewPassword={setNewPassword}
            handleChangePassword={handleChangePassword}
            showSuccessPasswordChangeMessage={showSuccessPasswordChangeMessage}
          />

          <div className="w-full shadow-md rounded bg-white p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Account Deletion</h3>
            <p className="mb-4 text-center text-red-500">WARNING: This action cannot be undone!</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 rounded text-white font-bold py-2 px-8  focus:outline-none focus:shadow-outline flex items-center"
                onClick={() => setShowModal(true)}
              >
                <MdDelete className="mr-2" />
                Delete Account
              </button>
            </div>
            {showSuccessMessage && <p className="text-center text-green-500 mt-2">Account deleted successfully!</p>}
          </div>
          <DeleteAccountModal
            showModal={showModal}
            confirmationText={confirmationText}
            setConfirmationText={setConfirmationText}
            handleDeleteAccount={handleDeleteAccount}
            setShowModal={setShowModal}
            showSuccessMessage={showSuccessMessage} />
        </div>
      </div>
    </div>

  );
};

// ChangeAccount.js




