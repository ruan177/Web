import { FormEvent, useEffect, useState } from "react"
import{ axios } from "../../../lib/axios";
import Header from "../../headers/header";
import '../../../styles/global.css'
import { ToastContainer, toast } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
import { useQuery } from "react-query";

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
      const response  = await axios.post('/courses',
        {
          name: CourseName,
          description: CourseDescription,
          author_id: userId,
          body: CourseDescription
        });
        if (response.status === 200) {
          toast.success("Curso enviado para aprovação"); // Exibe a snackbar de sucesso
          // Redirect ou show success message
        }
      // Redirect or show success message
    } catch (error: any) {
      setError(error.response.data.error)
    }

  }
  return (
    <>


      <div className="flex-grow ">
        <Header />
      </div>


      <div className="container mx-auto px-4 py-16 max-w-4xl">

        <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900">Create Course</h1>

        <input
          className="position-center border border-gray-300 px-4 py-2 mb-4 w-full sm:max-w-md"
          placeholder="Title"
          defaultValue={CourseName}
          onChange={event => setCourseName(event.target.value)}
        />

        <input
          className="position-center border border-gray-300 px-4 py-2 mb-4 w-full sm:max-w-md"
          placeholder="Description"
          defaultValue={CourseDescription}
          onChange={event => setCourseDescription(event.target.value)}
        />

        <div data-color-mode="light">
          <MDEditor

            height={400}
            value={BodyCourseContent}
            onChange={(value) => setBodyCourseContent(value || '')}
          />
        </div>
        <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-20 rounded-full focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>Criar Curso</button>
        <ToastContainer />
      </div>






    </>
  );


}
