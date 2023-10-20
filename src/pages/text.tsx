import MDEditor from '@uiw/react-md-editor';
import React, { useState } from 'react';

import { useDropzone } from 'react-dropzone';

function MarkdownEditorWithImageUploader() {
  const [BodyCourseContent, setBodyCourseContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    // Faça o upload do arquivo ou realize qualquer processamento necessário aqui.
    // Neste exemplo, vamos apenas exibir a imagem carregada.

    setUploadedImage(URL.createObjectURL(file));

    // Adicione o código Markdown da imagem carregada ao conteúdo existente no editor.
    const imageMarkdown = `![image](${URL.createObjectURL(file)})\n\n`;
    setBodyCourseContent(BodyCourseContent + imageMarkdown);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Arraste e solte uma imagem aqui ou clique para selecionar uma imagem.</p>
      </div>
      {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
      <MDEditor
        height={400}
        value={BodyCourseContent}
        onChange={(value) => setBodyCourseContent(value || '')}
      />
    </div>
  );
}

export default MarkdownEditorWithImageUploader;
