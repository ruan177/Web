import '../../styles/global.css'
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/headers/header";
import { AxiosError } from "axios";
import { useCourses } from "../../hooks/courses/useCourses";
import { useAuth } from '../../context/loginContext';
import { FaStar, FaRegStar } from 'react-icons/fa'
import { useState } from 'react';


export function Courses() {
  const { user } = useAuth();

  const {
    search,
    setSearch,
    page,
    setPage,
    isFetching,
    isError,
    error,
    filteredCourses,
    totalPages,
    startIndex,
    endIndex,
    isCourseSaved,
    handleSave,
    handleUnsave,
    cardsPerPage
  } = useCourses()



  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredCourseId, setHoveredCourseId] = useState(null);

  const handleMouseEnter = (courseId) => {
    setShowTooltip(true);
    setHoveredCourseId(courseId);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setHoveredCourseId(null);
  };

  const goBack = () => {
    navigate(-1); // Navigates back by one entry in the history stack
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-8">
        <h3 className="font-serif block text-gray-700 text-3xl mt-2">Cursos</h3>
        <div className="max-w-3xl mx-auto w-full mt-2">
          <input
            name="search"
            type="text"
            placeholder="Buscar..."
            className="w-full appearance-none block w-full bg-gray-100 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />


          {isFetching ? (
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {filteredCourses && filteredCourses.length > 0 ? (

                <><ol className="grid gap-4">
                  {filteredCourses.slice(startIndex, endIndex).map(course => (

                    <li
                      className="p-4 border border-gray-300 rounded shadow-md relative"
                      key={course.id}
                    >
                      <Link to={`/courses/${course.id}`}>
                        <h3 className="text-xl font-bold">{course.name}</h3>
                      </Link>
                      <p className="text-gray-600">{course.description}</p>
                      {user && (
                        <div className="absolute top-2 right-2">
                          {isCourseSaved(course.savedUsers, user?.id) ? (
                            <div
                              onMouseEnter={() => handleMouseEnter(course.id)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <FaStar onClick={() => handleUnsave.mutate({ courseId: course.id, userId: user?.id })} />
                              {showTooltip && hoveredCourseId === course.id && <div className="absolute bg-gray-800 text-white text-center p-1 rounded-md font-medium bottom-full left-1/2 transform -translate-x-1/2 z-10">
                                Desfavoritar</div>}
                            </div>
                          ) : (
                            <div
                              onMouseEnter={() => handleMouseEnter(course.id)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <FaRegStar onClick={() => handleSave.mutate({ courseId: course.id, userId: user?.id })} />
                              {showTooltip && hoveredCourseId === course.id && <div className="absolute bg-gray-800 text-white text-center p-1 rounded-md font-medium bottom-full left-1/2 transform -translate-x-1/2 z-10">
                                Favoritar</div>}
                            </div>
                          )}
                        </div>
                      )}
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
                      disabled={page === totalPages || totalPages === 0 || (filteredCourses?.length ?? 0) === endIndex}
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
                        ? 'Nenhum curso criado .'
                        : 'Nenhum curso criado.'}
                    </p>
                  ) : (
                    <><div className="px-10 space-y-5 lg:py-6 text-center">
                      <h1 className="text-6xl md:text-7xl max-w-xl font-serif w-11/12 sm:w-9/12">
                        <span className="underline decoration-black decoration-4">
                          THERE'S NOTE IN HERE!
                        </span>{" "}

                      </h1>
                      <h2 className="w-9/12 font-normal">
                        Oops! There are no courses available!                       </h2>

                    </div><button onClick={goBack} className="mt-4">Voltar</button></>
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