import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";
import { axios } from "../../../lib/axios";
import '../../../styles/global.css'
import { Link } from "react-router-dom";
import Header from "../../headers/header";
import { useQuery } from 'react-query'


interface Course {
    id: string,
    name: string,
    description: string,
}
export function Courses() {
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const [search, setSearch] = useState('');

  const { data, isFetching, isError, error } = useQuery<Course[]>('courses', async () => {
    const response = await axios.get('/courses');
    return response.data;
  });

  const filteredCourses = search.length > 0
    ? data?.filter(course => course.name.includes(search))
    : data?.courses || [];

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
                    </li>
                  ))}
                </ol>
              ) : (
                <>
                  {isError ? (
                    <p className="text-red-500">{error?.message || 'Erro ao carregar cursos.'}</p>
                  ) : (
                    <p className="text-gray-600 text-center">
                      Nenhum curso encontrado.
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

