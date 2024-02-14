

import { useState } from 'react';
import { useAuth } from '../../context/loginContext';
import useAxios from '../../lib/axios';
import { toast } from 'react-toastify';
import { queryClient } from '../../lib/queryClient';


const useProfileImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth()
  const axios = useAxios();
  const uploadProfileImage = async (selectedImage: File | null) => {
    if (!selectedImage) {
      setError('Por favor, selecione uma imagem antes de salvar.');
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
    
      const response = await axios.patch(`/profile/${user?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
       console.log("tud ok")
        toast.success("Sucess", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        queryClient.invalidateQueries(['userInfo', user?.id]);
        queryClient.refetchQueries(['userInfo', user?.id]);
        
        
      }

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