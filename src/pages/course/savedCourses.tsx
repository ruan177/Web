import '../../styles/global.css'
import { Link } from "react-router-dom";
import Header from "../../components/headers/header";
import { AxiosError } from "axios";

import { useSavedCourses } from '../../hooks/courses/useSavedCourses';
import { useState } from 'react';
import { useAuth } from '../../context/loginContext';
import { useCourses } from '../../hooks/courses/useCourses';
import { FaRegStar, FaStar } from 'react-icons/fa';



export function SavedCourses() {
  const { user } = useAuth();
  const {
    isCourseSaved,
    handleSave,
    handleUnsave,

  } = useCourses()
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
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-8">
        <h3 className="font-serif block text-gray-700 text-3xl ">Cursos Salvos</h3>
        <div className="max-w-3xl mx-auto w-full mt-2">
          <input
            name="search"
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 mb-4 text-lg border border-purple-900 rounded"
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
                        ? 'Nenhum curso salvo .'
                        : 'Nenhum curso salvo.'}
                    </p>
                  ) : (
                    <>
                      <div className="px-10 space-y-5 lg:py-6">
                        <h1 className="text-6xl md:text-7xl max-w-xl font-serif w-11/12 sm:w-9/12">
                          <span className="underline decoration-black decoration-4">
                            THERE'S NOTE IN HERE!
                          </span>{" "}

                        </h1>
                        <h2 className="w-9/12 font-normal">
                          Oops! It looks like you haven't saved any courses yet. How about starting to saved one now?                        </h2>
                        <Link to="/courses">
                          <button className="mt-4 bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">
                            Save Courses
                          </button>
                        </Link>
                      </div>


                    </>
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