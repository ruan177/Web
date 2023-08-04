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
interface CoursesResponse {
  courses: Course[];
  totalCount?: number; // Nova propriedade para indicar o total de cursos disponíveis
}

export function Courses() {
  const { loggedIn, changeLoggedIn } = useContext(LoginContext);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isFetching, isError, error } = useQuery<CoursesResponse>('courses', async () => {
    const response = await axios.get('/courses', {
      params: {
        page: page,
        pageSize: pageSize,
      },
    });
    return response.data.courses;
  }, {
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(data?.totalCount ?? 0 / pageSize) || 0;
  const filteredCourses = search.length > 0
    ? data?.filter(course => course.name.toLowerCase().includes(search.toLowerCase()))
    : data || [];

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
                <><ol className="grid gap-4">
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
                </ol><div className="flex justify-center mt-4">
                    <div className="flex justify-center mt-4">
                      <button
                        className="bg-gray-200 p-2 mr-2"
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                      >
                        Anterior
                      </button>
                      <p>{page}</p>
                      <button
                        className="bg-gray-200 p-2 ml-2"
                        disabled={page === totalPages || totalPages === 0} 
                        onClick={() => setPage(prev => prev + 1)}
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                </>
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

