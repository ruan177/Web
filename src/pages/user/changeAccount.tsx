
import { Header } from "../../components/headers/headerForm";
import ProfileChangeForm from "../../components/forms/profileChangeForm";
import PasswordChangeForm from "../../components/forms/passwordChangeForm";
import DeleteAccountModal from "../../components/forms/accountDeletionForm";
import ProfileImageSection from "../../components/sections/changeProfileImage";
import { useAuth } from "../../context/loginContext";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { queryClient } from "../../lib/queryClient";
import { User } from "../../components/tables/usersTable";


export const ChangeAccount = () => {
  const { user } = useAuth()
  const data: User | undefined = queryClient.getQueryData(['userInfo', user?.id])
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="grid bg-gray-100 h-screen w-screen">
      <Header textColor={"text-black"} />

      <div className="flex flex-col justify-center items-center flex-1 bg-white p-4 md:p-10 mt-4">
        <div className="w-full max-w-screen-md mx-auto flex flex-col gap-6 justify-center">
          <hr />
          <h2 className=" font-serif block text-gray-700 text-3xl text-center font-semibold mb-4">Alterar Conta </h2>
          <div className="w-full bg-white p-4 md:p-8">
            <ProfileImageSection />
          </div>
          <hr />
          <div className="w-full shadow-md rounded bg-white p-8">
            <h3 className="text-xl overline font-bold text-gray-900 mb-6 text-center">Nome de usuario </h3>
            <div className="flex flex-row justify-between items-center gap-4 mb-4">
              <span className="text-gray-700 font-bold">{data?.username }</span>
              <button onClick={() => setIsUsernameModalOpen(true)} className="bg-black hover:bg-blue-700 rounded text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                <AiOutlineEdit className="mr-2" size={16} />
                Editar
              </button>
            </div>
          </div>

          <hr />
          <div className="w-full shadow-md rounded bg-white p-8">
            <h3 className="text-xl overline font-bold text-gray-900 mb-6 text-center">Senha </h3>
            <div className="flex flex-row justify-between items-center gap-4 mb-4">
              <span className="text-gray-700 font-bold">**********</span>
              <button onClick={() => setIsPasswordModalOpen(true)} className="bg-black hover:bg-blue-700 rounded text-white font-bold py-2 px-8 focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                <AiOutlineEdit className="mr-2" size={16} />
                Editar
              </button>
            </div>
          </div>
          
          <hr />
          <DeleteAccountModal />
        </div>
        {isUsernameModalOpen ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
            <div className="bg-white p-6">
              <button onClick={() => setIsUsernameModalOpen(false)} className="float-right">
                <AiOutlineClose size={24} />
              </button>
              <ProfileChangeForm />
            </div>
          </div>
        ) : null}
         {isPasswordModalOpen ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black">
            <div className="bg-white p-6">
              <button onClick={() => setIsPasswordModalOpen(false)} className="float-right">
                <AiOutlineClose size={24} />
              </button>
              <PasswordChangeForm />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );







}




