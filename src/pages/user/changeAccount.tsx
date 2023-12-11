import { MdDelete } from "react-icons/md";
import { Header } from "../../components/headers/headerForm";
import ProfileChangeForm from "../../components/forms/profileChangeForm";
import PasswordChangeForm from "../../components/forms/passwordChangeForm";
import DeleteAccountModal from "../../components/forms/accountDeletionForm";
import { useChangeAccount } from "../../hooks/user/useChangeAccount";
import ProfileImageSection from "../../components/sections/changeProfileImage";


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
    <div className="grid bg-gray-100 h-screen w-screen">
      <Header textColor={"text-black"} />
    
      <div className="flex flex-col justify-center items-center flex-1 bg-white p-4 md:p-10">
        <div className="w-full max-w-screen-md mx-auto flex flex-col gap-6 justify-center">
        <><hr /></>
        <h2 className="font-serif text-2xl  text-center font-semibold mb-4">ACCOUNT SETTINGS </h2>
          <div className="w-full  bg-white p-4 md:p-8">
            <ProfileImageSection />
          </div>
          <><hr /></>
          <ProfileChangeForm
            username={username}
            newusername={newusername}
            setNewUsername={setNewUsername}
            setUsername={setUsername}
            handleProfileSave={handleProfileSave}
            showSuccessProfileChangeMessage={showSuccessProfileChangeMessage}
          />
  <><hr /></>
          <PasswordChangeForm
            password={password}
            newpassword={newpassword}
            setPassword={setPassword}
            setNewPassword={setNewPassword}
            handleChangePassword={handleChangePassword}
            showSuccessPasswordChangeMessage={showSuccessPasswordChangeMessage}
          />
  <><hr /></>
          <div className="w-full max-w-screen-md mx-auto shadow-md p-4 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Account Deletion</h3>
            <p className="mb-2 md:mb-4 text-center text-red-500">WARNING: This action cannot be undone!</p>
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
          <><hr /></>
          <DeleteAccountModal
            showModal={showModal}
            confirmationText={confirmationText}
            setConfirmationText={setConfirmationText}
            handleDeleteAccount={handleDeleteAccount}
            setShowModal={setShowModal}
            showSuccessMessage={showSuccessMessage}
          />
        </div>
      </div>
    </div>
  );
  
  
  
    
    
    

}  




