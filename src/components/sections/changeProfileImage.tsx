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
        setSelectedImage(file);
    };

    const handleSaveImage = async () => {
        uploadProfileImage(selectedImage);
    };


    return (
        <><div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            {selectedImage ? (
                <div className="mb-4">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Profile photo"
                        className="w-32 h-32 rounded-full mx-auto shadow-lg"
                        defaultValue={user?.profileImageUrl} />
                </div>
            ) : (
                <div className="mb-4">
                    <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto"></div>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block mx-auto p-2 border border-gray-300 rounded-lg shadow-sm" />

            <div className="mt-6 flex space-y-4 justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 rounded text-white font-bold py-2 px-8  focus:outline-none focus:shadow-outline flex items-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"

                    onClick={handleSaveImage}
                >
                    <FaSave className="mr-2" />
                   Save
                </button>
            </div>
        </div>
            <Notification /></>
    );
};

export default ProfileImageSection;