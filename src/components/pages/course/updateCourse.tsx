import { FormEvent, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { axios } from '../../../lib/axios';
import { useParams } from "react-router-dom"
import Header from "../../headers/header";
import '../../../styles/global.css'
import MDEditor from '@uiw/react-md-editor'
import { useQuery } from "react-query";

interface Course {
  uuid: string,
  name: string,
  author: string,
  body: string,
}

export function UpdateCourse() {
  const [preview, setPreview] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [bodyCourseContent, setBodyCourseContent] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [error, setError] = useState('');
  const { uuid } = useParams();

  const { data, isLoading, isError } = useQuery(['course', uuid], async () => {
    const response = await axios.get(`/courses/${uuid}`);
    return response.data;
  });

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();
    const userId = localStorage.getItem('user');

    try {
      await axios.patch(`/courses/${uuid}/update`, {
        name: courseName,
        description: courseDescription,
        author_id: userId,
        body: bodyCourseContent
      });
      // Redirect or show success message
    } catch (error: any) {
      setError(error.response.data.error)
      // Handle error
    }
  };

  useEffect(() => {
    if (data) {
      setCourseName(data.course.name);
      setCourseDescription(data.course.description);
      setBodyCourseContent(data.course.body);
    }
  }, [data]);

  if (isLoading) {
    return <p>Carregando curso...</p>;
  }

  if (isError) {
    return <p>Ocorreu um erro ao carregar o curso.</p>;
  }

  return (
    <>
        <div className="flex-grow">
    <Header />
  </div>

  <div className="container mx-auto px-4 py-16 max-w-4xl">
    <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-8">Update Course</h1>

    <div className="mb-4">
      <input
        className="border border-gray-300 p-2 w-full"
        placeholder="Título"
        defaultValue={courseName}
        onChange={(event) => setCourseName(event.target.value)}
      />
    </div>

    <div className="mb-4">
      <input
        className="border border-gray-300 p-2 w-full"
        placeholder="Description"
        defaultValue={courseDescription}
        onChange={(event) => setCourseDescription(event.target.value)}
      />
    </div>

    <div data-color-mode="light" className="mb-8">
      <MDEditor
        height={400}
        value={bodyCourseContent}
        onChange={(value) => setBodyCourseContent(value || '')}
      />
    </div>

    <div className="flex justify-end">
      <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
        Atualizar Curso
      </button>
    </div>
  </div>
</>
   
  );
}
