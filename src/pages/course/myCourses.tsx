import '../../styles/global.css'
import { Link } from "react-router-dom";
import Header from "../../components/headers/header";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useMyCourses } from '../../hooks/courses/useMyCourses';
import { AxiosError } from 'axios';
import { Notification } from "../../components/notification/notification";
import logo from '../../assets/logos/coffe.png';
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


          {isFetching ? (
            <p className="text-gray-600 text-center">Carregando cursos...</p>
          ) : (
            <>
              {filteredCourses && filteredCourses.length > 0 ? (
                <>
                  <input
                    name="search"
                    type="text"
                    placeholder="Buscar..."
                    className="w-full appearance-none block w-full bg-gray-100 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                  />
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

                </>
              ) : (
                <>
                  {isError ? (
                    <p className="text-red-500">
                      {error instanceof AxiosError
                        ? 'Nenhum curso criado .'
                        : 'Nenhum curso criado.'}
                    </p>
                  ) : (
                    <>
                      <div className="px-10 space-y-5 lg:py-6">
                        <h1 className="text-6xl md:text-7xl max-w-xl font-serif w-11/12 sm:w-9/12">
                          <span className="underline decoration-black decoration-4">
                            MarkedLearn
                          </span>{" "}

                        </h1>
                        <h2 className="w-9/12 font-normal">
                        Oops! It looks like you haven't created any courses yet. How about starting to create one now?                        </h2>
                        <Link to="/course/create">
                          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Create your first course
                          </button>
                        </Link>
                      </div>
                      <img
                        className="hidden sm:inline-flex h-40 lg:h-80 xl:h-full"
                        src={logo}
                        alt=""
                      />
                    </>


                  )}
                </>

              )}
            </>
          )}
        </div>
      </div>
 
    </div >
  );
}