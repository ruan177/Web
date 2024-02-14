import React, { useState, ChangeEvent } from 'react';
import { FaSave } from 'react-icons/fa';
import useProfileImageUpload from '../../hooks/user/useProfileImageUpload';
import { useAuth } from '../../context/loginContext';
import { Notification } from '../notification/notification';

const ProfileImageSection = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { isUploading, error, uploadProfileImage } = useProfileImageUpload();
    const { user } = useAuth()

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file || null);
    };

    const handleSaveImage = async () => {
        uploadProfileImage(selectedImage);
    };
  


    return (
        <><div className="bg-transparent p-4 rounded-lg ">
            <h2 className="text-xl overline text-center font-semibold mb-4">Foto </h2>
            {selectedImage ? (
                <div className="mb-4">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Profile photo"
                        className="w-32 h-32 border border-white rounded-full mx-auto shadow-lg"
                        defaultValue={user?.profileImageUrl} />
                </div>
            ) : (
                <div className="mb-4">
                    <div className="w-32 h-32 bg-gray-400 rounded-full mx-auto"></div>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block mx-auto p-2 border border-gray-300 rounded-lg shadow-sm" />

            <div className="mt-6 flex space-y-4 justify-end">
                <button
                    className="bg-black border border-white hover:bg-blue-700 rounded text-white font-bold py-2 px-8  focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"

                    onClick={handleSaveImage}
                > {isUploading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0  24  24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4  12a8  8  0  018-8V0C5.373  0  0  5.373  0  12h4zm2  5.291A7.962  7.962  0  014  12H0c0  3.042  1.135  5.824  3  7.938l3-2.647z"></path>
                      </svg>
                      ...
                    </>
                  ) : (
                    <><FaSave className="mr-2" />
                    </>
                  )}
                    
                   Save
                </button>
            </div>
        </div>
            <Notification /></>
    );
};

export default ProfileImageSection;