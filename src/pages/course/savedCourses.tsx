import '../../styles/global.css'
import { Link } from "react-router-dom";
import Header from "../../components/headers/header";
import { AxiosError } from "axios";

import { useSavedCourses } from '../../hooks/courses/useSavedCourses';



export function SavedCourses() {
 
  const {
    search,
    setSearch,
    page,
    setPage,
    isFetching,
    isError,
    error,
    totalPages,
    displayedCourses,
  } = useSavedCourses()

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="max-w-3xl mx-auto w-full">
          <input
            name="search"
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 mb-4 text-lg border border-purple-900 rounded"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />

          {isFetching ? (
            <p className="text-gray-600 text-center">Carregando cursos...</p>
          ) : (
            <>
              {displayedCourses?.length || 0 > 0 ? (
                <><ol className="grid gap-4">
                  {displayedCourses?.map(course => (
                    <li
                      className="p-4 border border-gray-300 rounded shadow-md relative"
                      key={course.id}
                    >
                      <Link to={`/courses/${course.id}`}>
                        <h3 className="text-xl font-bold">{course.name}</h3>
                      </Link>
                      <p className="text-gray-600">{course.description}</p>

                    </li>
                  ))}
                </ol><div className="flex justify-center mt-4">
                    <button
                      className="bg-gray-200 p-2 mr-2"
                      disabled={page === 1}
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    >
                      Anterior
                    </button>

                    <button
                      className="bg-gray-200 p-2 ml-2"
                      disabled={page === totalPages || totalPages === 0}
                      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      Próxima
                    </button>
                  </div></>
              ) : (
                <>
                  {isError ? (
                    <p className="text-red-500">
                      {error instanceof AxiosError
                        ? error.response?.data.message || 'Erro ao carregar cursos.'
                        : 'Erro ao carregar cursos.'}
                    </p>
                  ) : (
                    <p className="text-gray-600 text-center">
                      Nenhum curso salvo.
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