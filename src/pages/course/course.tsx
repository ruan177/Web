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
            <p className="text-center">Carregando curso...</p>
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
