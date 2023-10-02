import {  useEffect  } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/headers/header";
import '../../styles/global.css'
import MDEditor from '@uiw/react-md-editor'
import { ToastContainer } from "react-toastify";
import { useCourse } from "../../hooks/courses/useCourse";
import { useFormSubmit } from "../../hooks/courses/useFormSubmit";


export function UpdateCourse() {
  const { uuid } = useParams();
  const { data, isFetching, isError, error } = useCourse(uuid);
  const {
    courseName,
    setCourseName,
    courseDescription,
    setCourseDescription,
    bodyCourseContent,
    setBodyCourseContent,
    error: formError,
    handleSubmit,
  } = useFormSubmit(uuid);

  useEffect(() => {
    if (data) {
      setCourseName(data.name);
      setCourseDescription(data.description);
      setBodyCourseContent(data.body);
    }
  }, [data]);

  if (isFetching) {
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
          <label htmlFor="" className="block italic font-medium text-sm text-indigo-900 mb-2">
            Title
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            placeholder="Título"
            defaultValue={courseName}
            onChange={(event) => setCourseName(event.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block italic font-medium text-sm text-indigo-900 mb-2">
            Description
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            placeholder="Description"
            defaultValue={courseDescription}
            onChange={(event) => setCourseDescription(event.target.value)}
          />
        </div>

        <div data-color-mode="light" className="mb-8">
          <label htmlFor="" className="block italic font-medium text-sm text-indigo-900 mb-2">
            Content
          </label>
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
