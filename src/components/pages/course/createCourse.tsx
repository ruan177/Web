import { FormEvent, useEffect, useState } from "react"
import { axios } from "../../../lib/axios";
import Header from "../../headers/header";
import '../../../styles/global.css'
import { ToastContainer, toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
import { useQuery } from "react-query";
import 'react-toastify/dist/ReactToastify.css';

export function CreateCourse() {
  const [preview, setPreview] = useState(false)
  const [CourseName, setCourseName] = useState('');
  const [BodyCourseContent, setBodyCourseContent] = useState('');
  const [CourseDescription, setCourseDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();
    const userId = localStorage.getItem('user')

    try {
      const response = await axios.post('/courses',
        {
          name: CourseName,
          description: CourseDescription,
          author_id: userId,
          body: CourseDescription
        });
      if (response.status === 200) {
        toast.success("Curso enviado para aprovação",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",}); // Exibe a snackbar de sucesso
        // Redirect ou show success message
      }
      // Redirect or show success message
    } catch (error: any) {
      setError(error.response.data.error)
    }

  }
  return (
  
<>
  <div className="flex-grow">
    <Header />
  </div>

  <div className="container mx-auto px-4 py-16 max-w-4xl">
    <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-8">Create Course</h1>

    <div className="mb-4">
      <input
        className="border border-gray-300 p-2 w-full"
        placeholder="Title"
        defaultValue={CourseName}
        onChange={(event) => setCourseName(event.target.value)}
      />
    </div>

    <div className="mb-4">
      <input
        className="border border-gray-300 p-2 w-full"
        placeholder="Description"
        defaultValue={CourseDescription}
        onChange={(event) => setCourseDescription(event.target.value)}
      />
    </div>

    <div data-color-mode="light" className="mb-8">
      <MDEditor
        height={400}
        value={BodyCourseContent}
        onChange={(value) => setBodyCourseContent(value || '')}
      />
    </div>

    <div className="flex justify-end">
      <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
        Criar Curso
      </button>
    </div>

    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
  </div>
</>



    
  );


}
