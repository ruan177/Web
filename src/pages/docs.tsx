import React, { useState } from 'react';
import MdEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Header from '../components/headers/header';


const MarkdownTutorialPage = () => {
  const [markdown, setMarkdown] = useState(`
# Título da Página

## Sintaxe Básica do Markdown

Markdown é uma linguagem de marcação leve que você pode usar para adicionar formatação a texto simples. Aqui estão alguns exemplos de como usar o Markdown:

### Cabeçalhos

\`\`\`
# H1
## H2
### H3
#### H4
##### H5
###### H6
\`\`\`

###   Ênfase

\`\`\`
*italic*
**bold**
***bold e italic***
\`\`\`

### Listas

\`\`\`
1. Primeiro item
2. Segundo item
3. Terceiro item

* Item da lista
* Outro item da lista
\`\`\`

### Links

\`\`\`
[Texto do link](https://www.example.com)
\`\`\`

### Imagens

\`\`\`
![Texto alternativo](url-da-imagem.jpg)
\`\`\`

 Você pode adicionar uma imagem usando HTML. Aqui está um exemplo:

\`\`\`
<img src="url-da-imagem.jpg" alt="Texto alternativo" width="500" height="300" />
\`\`\`

---

#  Como Alterar o Tamanho de uma imagem

As propriedade width="500" height="300" definem o tamanho da imagem em pixels

## O que são Largura e Altura?
 
- **Largura (width)**: É a medida horizontal da imagem, do lado esquerdo para o direito.
- **Altura (height)**: É a medida vertical da imagem, do topo para o fundo.
 
## Como Definir a Largura e a Altura
 
Para definir a largura e a altura basta alterar esses valores , 


\`\`\`
<img src="url-da-imagem.jpg" alt="Texto alternativo" width="500" height="300" />
\`\`\`



### Tabelas

\`\`\`
| Tabela | Tabela |
| ------ | ------ |
| Célula | Célula |
| Célula | Célula |
\`\`\`

### Blocos de Código

Você pode criar blocos de código em Markdown usando três crases (\`\`\`). Aqui está um exemplo:

\`\`\`
\`\`\`javascript
function helloWorld() {
  console.log("Olá, mundo!");
}
\`\`\`
\`\`\`


`);

  const handleEditorChange = (text: any) => {
    setMarkdown(text);
  };

  return (
    <div className="markdown-tutorial-page">
      <Header />
      <div data-color-mode="light" className="w-full max-w-screen-xl mx-auto p-4">
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <MarkdownPreview source={markdown} />
        </div>
      </div>
      
    </div >
  );
};

export default MarkdownTutorialPage;