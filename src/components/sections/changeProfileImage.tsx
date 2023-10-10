import React, { useState, ChangeEvent } from 'react';
import { FaSave } from 'react-icons/fa';
import useProfileImageUpload from '../../hooks/user/useProfileImageUpload';
import axios from 'axios';


const ProfileImageSection = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { isUploading, error, uploadProfileImage } = useProfileImageUpload();

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file);
    };

    const handleSaveImage = async () => {
        uploadProfileImage(selectedImage, axios);
    };


    return (
        <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Photo Profile</h2>

            {selectedImage ? (
                <div className="mb-4">
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Foto de perfil"
                        className="w-32 h-32 rounded-full mx-auto"
                    />
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
                className="block mx-auto p-2 border border-gray-300 rounded-lg"
            />

            <div className="flex space-y-4 justify-end">
                <button
                    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline flex items-center"

                    onClick={handleSaveImage}
                >
                    <FaSave className="mr-2" />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ProfileImageSection;