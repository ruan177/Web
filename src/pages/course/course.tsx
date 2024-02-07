import { useParams } from "react-router-dom"
import Header from "../../components/headers/header";
import MarkdownPreview from '@uiw/react-markdown-preview';
import '../../styles/global.css'
import { useCourse } from "../../hooks/courses/useCourse";


export function Course() {
  const { uuid } = useParams();
  const { data, isFetching, isError, error } = useCourse(uuid);

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="px-64 space-y-4 ">
          {isFetching ? (

            <div className="flex"

            >
              <svg className=" animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0  0  24  24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4  12a8  8  0  018-8V0C5.373  0  0  5.373  0  12h4zm2  5.291A7.962  7.962  0  014  12H0c0  3.042  1.135  5.824  3  7.938l3-2.647z"></path>
              </svg>
              Carregando cursos...
            </div>


          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4 mt-8 text-center">{data?.name}</h2>
              <hr />
              <div data-color-mode="light" className="w-full max-w-screen-xl mx-auto p-4">
                <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                  <MarkdownPreview source={data?.body} />
                </div>
              </div>
            </>

          )}
          {isError && (
            <p className="text-red-500">
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </p>
          )}
        </div>
      </div>
    </div>
  );

}
