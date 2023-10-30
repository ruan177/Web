import '../../styles/global.css'
import { Link } from "react-router-dom";
import Header from "../../components/headers/header";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useMyCourses } from '../../hooks/courses/useMyCourses';
import { AxiosError } from 'axios';
import { Notification } from "../../components/notification/notification";

export function MyCourses() {
  const {
    search,
    setSearch,
    isFetching,
    isError,
    error,
    page,
    setPage,
    totalPages,
    startIndex,
    endIndex,
    handleDeleteCourse,
    filteredCourses
  } = useMyCourses();

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="max-w-3xl mx-auto w-full">
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
              {filteredCourses && filteredCourses.length > 0 ? (
                <ol className="grid gap-4">
                  {filteredCourses.slice(startIndex, endIndex).map(course => (
                    <li
                      className="p-4 border border-gray-300 rounded shadow-md relative"
                      key={course.id}
                    >
                      <Link to={`/courses/${course.id}`}>
                        <h3 className="text-xl font-bold">{course.name}</h3>
                      </Link>
                      <p className="text-gray-600">{course.description}</p>
                      <div className="flex flex-row space-x-2 absolute top-2 right-2">
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
                    <p className="text-red-500">
                      {error instanceof AxiosError
                        ? 'Nenhum curso criado .'
                        : 'Nenhum curso criado.'}
                    </p>
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
      <div className="flex justify-center mt-4">
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
      </div>
      <Notification />
   
    </div>
  );
}