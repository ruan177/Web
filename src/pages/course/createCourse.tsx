import Header from "../../components/headers/header";
import '../../styles/global.css'
import { ToastContainer } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
import 'react-toastify/dist/ReactToastify.css';
import { useCreateCourse } from "../../hooks/courses/useCreateCourses";

export function CreateCourse() {
  const {
    CourseName,
    setCourseName,
    BodyCourseContent,
    setBodyCourseContent,
    CourseDescription,
    setCourseDescription,
    handleSubmit,
  } = useCreateCourse();

  return (

    <>
      <div className="flex-grow">
        <Header />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-8">Create Course</h1>

        <div className="mb-4">
          <label htmlFor="" className="block italic font-medium text-sm text-indigo-900 mb-2">
            Title
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            placeholder="Title"
            defaultValue={CourseName}
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
            defaultValue={CourseDescription}
            onChange={(event) => setCourseDescription(event.target.value)}
          />
        </div>

        <div data-color-mode="light" className="mb-8">
          <label htmlFor="" className="block italic font-medium text-sm text-indigo-900 mb-2">
            Content
          </label>
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
          theme="light"
        />
      </div>
    </>




  );


}
