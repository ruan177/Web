import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/headers/header";
import '../../styles/global.css'
import MDEditor from '@uiw/react-md-editor'
import { ToastContainer } from "react-toastify";
import { useCourse } from "../../hooks/courses/useCourse";
import { useFormSubmit } from "../../hooks/courses/useFormSubmit";
import { Notification } from "../../components/notification/notification";
import MarkdownEditorWithImageUploader from "../../components/Editor/MardowEditorWIthImageUploader";


export function UpdateCourse() {
  const { uuid } = useParams();
  const { data, isFetching, isError, error: any } = useCourse(uuid);
  const {
    courseName,
    setCourseName,
    courseDescription,
    setCourseDescription,
    bodyCourseContent,
    setBodyCourseContent,
    error: formError,
    handleSubmit,
    loading
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
      {/* Header Component */}
      <div className="flex-grow">
        <Header />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Page Title */}
        <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 mb-8">
          UPDATE CONTENT
        </h1>

        {/* Course Title Input */}
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Title"
          defaultValue={courseName}
          onChange={(event) => setCourseName(event.target.value)}
        />

        <textarea
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Description"
          defaultValue={courseDescription}
          onChange={(event) => setCourseDescription(event.target.value)}
        />
        <div data-color-mode="light" className="mb-8">
          <MarkdownEditorWithImageUploader
            bodyCourseContent={bodyCourseContent}
            setBodyCourseContent={setBodyCourseContent}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-20 border border-black focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >{loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0  24  24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4  12a8  8  0  018-8V0C5.373  0  0  5.373  0  12h4zm2  5.291A7.962  7.962  0  014  12H0c0  3.042  1.135  5.824  3  7.938l3-2.647z"></path>
              </svg>
              Alterando Curso...
            </>
          ) : (
            "Salvar"
          )
            } 

          </button>
        </div>

        {/* Display Error */}


        {/* Notification Component */}
        <Notification />
      </div>
    </>
  );
}
