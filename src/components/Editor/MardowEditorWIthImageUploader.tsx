import React from 'react';
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from '@uiw/react-md-editor';
import { RiImageAddLine } from 'react-icons/ri';
import useAxios from '../../lib/axios';
interface MarkdownEditorWithImageUploaderProps {
    bodyCourseContent: string;
    setBodyCourseContent: React.Dispatch<React.SetStateAction<string>>;
  }

function MarkdownEditorWithImageUploader({
    bodyCourseContent,
    setBodyCourseContent,
  }: MarkdownEditorWithImageUploaderProps) {
  const axios = useAxios();

  const addImageIcon = (
    <RiImageAddLine size={20} />
  );

  const addImageCommand: ICommand = {
    name: 'addImage',
    keyCommand: 'addImage',
    buttonProps: { 'aria-label': 'Add Image' },
    icon: addImageIcon,
    execute: async (state: TextState, api: TextAreaTextApi) => {
      try {
        // Abra um diálogo de seleção de arquivo para o usuário escolher a imagem
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', async (event) => {
          const target = event.target as HTMLInputElement;
          if (target.files && target.files.length > 0) {
            const file = target.files[0];
         
            if (file) {
              // Enviar a imagem para o backend usando FormData
              const formData = new FormData();
              formData.append('file', file);
         
              // Realizar a solicitação POST para enviar a imagem para o servidor
              const response = await axios.post('/upload', formData);
         
              // Verifique a resposta do servidor para obter a URL da imagem carregada
              if (response.data.imageUrl) {
                const imageMarkdown = `![Image](${response.data.imageUrl})`;
                api.replaceSelection(imageMarkdown);
              }
            }
          }
         });

        fileInput.click();
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    },
  };

  return (
   
      <MDEditor
      className='shadow appearance-none bg-gray-50 border border-black rounded-lg'
        height={400}
        value={bodyCourseContent}
        onChange={(value) => setBodyCourseContent(value || '')}
        commands={[
          addImageCommand, // Adicione o novo comando aqui
        ]}
      />
    
  );
}

export default MarkdownEditorWithImageUploader;
