import '../../styles/global.css'
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/headers/header";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useMyCourses } from '../../hooks/courses/useMyCourses';
import { AxiosError } from 'axios';
import { Notification } from "../../components/notification/notification";
import logo from '../../assets/logos/course.jpg';
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
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigates back by one entry in the history stack
  };
  return (
    <div>
<Header />
      <div className="flex flex-col items-center justify-center mt-4">
        <h3 className="font-serif block text-gray-700 text-3xl ">Meus Cursos</h3>
        <div className="max-w-3xl mx-auto w-full mt-2">


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
                    className="p-4 border border-gray-300 rounded shadow-md relative sm:relative flex flex-col"
                    key={course.id}
                  >
                    <Link to={`/courses/${course.id}`}>
                      <h3 className="text-xl font-bold">{course.name}</h3>
                    </Link>
                    <p className="text-gray-600">{course.description}</p>

                    <div className="flex flex-row space-x-1 mt-4 sm:absolute sm:top-2 sm:right-2">
                      <Link to={`/course/${course.id}/update`}>
                        <button className="bg-black hover:bg-gray-700 text-white font-bold py-1 px-2 rounded inline-flex items-center">
                          <AiOutlineEdit className="mr-2" size={16} />
                          Editar
                        </button>
                      </Link>
                      <button onClick={() => handleDeleteCourse(course.id)} className="bg-white hover:bg-red-700 text-black font-bold py-1 px-2 rounded inline-flex items-center border border-black">
                        <AiOutlineDelete className="mr-2" size={12} />
                        Excluir
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
                      disabled={page === totalPages || totalPages === 0 || (filteredCourses?.length ?? 0) === endIndex}
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
                      <div className="px-10 space-y-5 lg:py-6 text-center">
                        <h1 className="text-6xl md:text-7xl max-w-xl font-serif w-11/12 sm:w-9/12">
                          <span className="underline decoration-black decoration-4">
                            THERE'S NOTE IN HERE!
                          </span>{" "}

                        </h1>
                        <h2 className="w-9/12 font-normal">
                          Oops! It looks like you haven't created any courses yet. How about starting to create one now?                        </h2>
                        <Link to="/course/create">
                          <button className="mt-4 items-center bg-black hover:bg-grey-700 text-white font-bold py-2 px-4 rounded">
                            Create your first course
                          </button>
                        </Link>
                      </div>
                      <button onClick={goBack} className="mt-4">Voltar</button>

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
