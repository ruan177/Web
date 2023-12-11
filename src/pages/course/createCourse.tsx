import React from "react";
import Header from "../../components/headers/header";
import '../../styles/global.css';
import { ToastContainer } from "react-toastify";
import MDEditor from "@uiw/react-md-editor";
import 'react-toastify/dist/ReactToastify.css';
import { useCreateCourse } from "../../hooks/courses/useCreateCourses";
import MarkdownEditorWithImageUploader from "../../components/Editor/MardowEditorWIthImageUploader";
import { Notification } from "../../components/notification/notification";

export function CreateCourse() {
  // Destructure values from the custom hook
  const {
    CourseName,
    setCourseName,
    BodyCourseContent,
    setBodyCourseContent,
    CourseDescription,
    setCourseDescription,
    handleSubmit,
    error
  } = useCreateCourse();

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
          CREATE CONTENT
        </h1>

        {/* Course Title Input */}
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Title"
          defaultValue={CourseName}
          onChange={(event) => setCourseName(event.target.value)}
        />

        <textarea
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Description"
          defaultValue={CourseDescription}
          onChange={(event) => setCourseDescription(event.target.value)}
        />
<div data-color-mode="light" className="mb-8">
        <MarkdownEditorWithImageUploader
          bodyCourseContent={BodyCourseContent}
          setBodyCourseContent={setBodyCourseContent}
        />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-20 border border-black focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
          >
            Create Course
          </button>
        </div>

        {/* Display Error */}
        <p>{error}</p>

        {/* Notification Component */}
        <Notification />
      </div>
    </>
  );
}
