import { FormEvent, useState } from "react";

import { toast } from "react-toastify";
import useAxios from "../../lib/axios";
import { useAuth } from "../../context/loginContext";
import { queryClient } from "../../lib/queryClient";

export function useFormSubmit(uuid: string | undefined) {

    const [courseName, setCourseName] = useState('');
    const [bodyCourseContent, setBodyCourseContent] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();
    const axios = useAxios();
    
    const handleSubmit = async function (event: FormEvent) {
      event.preventDefault();
      setLoading(true)
  
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
          queryClient.invalidateQueries(['course', uuid ])
          queryClient.refetchQueries(['course', uuid ])
        }
      } catch (error: any) {
        setError(error.response.data.error);
        // Handle error
      } finally{
        setLoading(false)
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
      loading
    };
  }