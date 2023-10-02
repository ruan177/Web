import { FormEvent, useState } from "react";
import { useAxios } from "../../lib/axios";
import { toast } from "react-toastify";

export function useFormSubmit(uuid: string | undefined) {
    const axios = useAxios();
    const [courseName, setCourseName] = useState('');
    const [bodyCourseContent, setBodyCourseContent] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async function (event: FormEvent) {
      event.preventDefault();
      const userId = localStorage.getItem('user');
  
      try {
        const response = await axios.patch(`/courses/${uuid}/update`, {
          name: courseName,
          description: courseDescription,
          author_id: userId,
          body: bodyCourseContent,
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
      } catch (error: any) {
        setError(error.response.data.error);
        // Handle error
      }
    };
  
    return {
      courseName,
      setCourseName,
      courseDescription,
      setCourseDescription,
      bodyCourseContent,
      setBodyCourseContent,
      error,
      handleSubmit,
    };
  }