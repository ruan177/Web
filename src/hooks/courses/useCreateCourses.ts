import { FormEvent, useState } from "react";
import '../../styles/global.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxios from "../../lib/axios";
import { useAuth } from "../../context/loginContext";
import { queryClient } from "../../lib/queryClient";
import { useNavigate } from "react-router-dom";
export function useCreateCourse() {

  const [CourseName, setCourseName] = useState('');
  const [BodyCourseContent, setBodyCourseContent] = useState('');
  const [CourseDescription, setCourseDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axios = useAxios();

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/courses', {
        name: CourseName,
        description: CourseDescription,
        author_id: user?.id,
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
        queryClient.invalidateQueries('MyCourses');
        queryClient.refetchQueries(['MyCourses']);
        navigate(`/mycourses/${user?.id}`);
   }
      // Redirect or show success message
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setLoading(false); // Finaliza o carregamento
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
    loading
  };
}