import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";
import  {axios}  from "../../../lib/axios";
import '../../../styles/global.css'
import { Link } from "react-router-dom";
import Header from "../../headers/header";
import { useMutation, useQuery } from 'react-query'

import type { AxiosRequestConfig} from 'axios'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { queryClient } from "../../../lib/queryClient";


interface Course {
  id: string,
  name: string,
  description: string,
}
export function MyCourses() {
const { loggedIn, changeLoggedIn } = useContext(LoginContext);
const [search, setSearch] = useState('');
const userUuid = localStorage.getItem('user');
const [deleteError, setDeleteError] = useState('');

const { data, isFetching, isError, error } = useQuery<Course[]>('MyCourses', async () => {
  const response = await axios.get(`/mycourses/${userUuid}`);
  return response.data;
});

const filteredCourses = search.length > 0
  ? data?.filter(course => course.name.includes(search))
  : data?.courses || [];

  const deleteCourseMutation = useMutation((id: string) => axios.delete(`/courses/${id}/delete`
  ), {
    onSuccess: () => {
      queryClient.invalidateQueries('MyCourses'); // Invalidate the cache for 'MyCourses' after successful deletion
    },
  });

  function handleDeleteCourse(id: string): void {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourseMutation.mutate(id);
    }
  }

return (
  <div>
    <Header />
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="max-w-3xl mx-auto">
        <input
          name="search"
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 mb-4 text-lg border border-gray-300 rounded"
          onChange={e => setSearch(e.target.value)}
          value={search}
        />

        {isFetching ? (
          <p className="text-gray-600 text-center">Carregando cursos...</p>
        ) : (
          <>
            {filteredCourses.length > 0 ? (
              <ol className="grid gap-4">
                {filteredCourses.map(course => (
                  <li
                    className="p-4 border border-gray-300 rounded shadow-md"
                    key={course.id}
                  >
                    <Link to={`${course.id}`}>
                      <h3 className="text-xl font-bold">{course.name}</h3>
                    </Link>
                    <p className="text-gray-600">{course.description}</p>
                    <div className="flex gap-2 mt-2">
                    <Link to={`/course/${course.id}/update`}>
                      <AiOutlineEdit className="cursor-pointer text-blue-500" size={20} />
                    </Link>

                    <button onClick={() => handleDeleteCourse(course.id)}>
                      <AiOutlineDelete className="cursor-pointer text-red-500" size={20} />
                    </button>
                  </div>
                  </li>
                ))}
              </ol>
            ) : (
              <>
                {isError ? (
                  <p className="text-red-500">{error?.message || deleteError?.message  || 'Erro ao carregar cursos.'}</p>
                ) : (
                  <p className="text-gray-600 text-center">
                    Nenhum curso criado.
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
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
);
}

