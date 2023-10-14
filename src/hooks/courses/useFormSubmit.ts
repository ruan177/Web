import { FormEvent, useState } from "react";

import { toast } from "react-toastify";
import useAxios from "../../lib/axios";
import { useAuth } from "../../context/loginContext";

export function useFormSubmit(uuid: string | undefined) {

    const [courseName, setCourseName] = useState('');
    const [bodyCourseContent, setBodyCourseContent] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [error, setError] = useState('');
    const {user} = useAuth();
    const axios = useAxios();
    
    const handleSubmit = async function (event: FormEvent) {
      event.preventDefault();

  
      try {
        const response = await axios.patch(`/courses/${uuid}/update`, {
          name: courseName,
          description: courseDescription,
          author_id: user?.id,
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