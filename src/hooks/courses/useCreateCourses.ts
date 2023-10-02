import { FormEvent, useState } from "react";
import { useAxios } from "../../lib/axios";
import '../../styles/global.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function useCreateCourse() {

  const [CourseName, setCourseName] = useState('');
  const [BodyCourseContent, setBodyCourseContent] = useState('');
  const [CourseDescription, setCourseDescription] = useState('');
  const [error, setError] = useState('');
  const axios = useAxios();

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();
    const userId = localStorage.getItem('user');

    try {
      const response = await axios.post('/courses', {
        name: CourseName,
        description: CourseDescription,
        author_id: userId,
        body: BodyCourseContent, // Fix this to use the content from the MDEditor
      });
      if (response.status === 200) {
        toast.success("Curso enviado para aprovação", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Redirect or show success message
      }
      // Redirect or show success message
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return {
    CourseName,
    setCourseName,
    BodyCourseContent,
    setBodyCourseContent,
    CourseDescription,
    setCourseDescription,
    error,
    handleSubmit,
  };
}