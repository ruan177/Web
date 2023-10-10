
import { AxiosInstance } from 'axios';
import { useState } from 'react';

const useProfileImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadProfileImage = async (selectedImage: File | null, axiosInstance: AxiosInstance) => {
    if (!selectedImage) {
      setError('Por favor, selecione uma imagem antes de salvar.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    try {
      // Substitua '/upload-profile-image' pelo endpoint correto no seu backend
      await axiosInstance.post('/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Você pode adicionar lógica adicional aqui para atualizar o estado do usuário
    } catch (error) {
      console.error('Erro ao enviar a imagem de perfil:', error);
      setError('Ocorreu um erro ao enviar a imagem de perfil.');
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, error, uploadProfileImage };
};

export default useProfileImageUpload;