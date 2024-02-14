
import { Header } from "../../components/headers/headerForm";
import ProfileChangeForm from "../../components/forms/profileChangeForm";
import PasswordChangeForm from "../../components/forms/passwordChangeForm";
import DeleteAccountModal from "../../components/forms/accountDeletionForm";

import ProfileImageSection from "../../components/sections/changeProfileImage";


export const ChangeAccount = () => {


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
          <ProfileChangeForm/>
          <><hr /></>
          <PasswordChangeForm/>
          <><hr /></>
          <DeleteAccountModal/>
        </div>
      </div>
    </div>
  );







}




