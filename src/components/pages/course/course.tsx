import { useEffect, useState } from "react"
import { axios } from "../../../lib/axios";
import { useParams } from "react-router-dom"
import Header from "../../headers/header";
import MarkdownPreview from '@uiw/react-markdown-preview';
import '../../../styles/global.css'
import { useQuery } from "react-query";

interface Course {
    uuid: string,
    name: string,
    author: string,
    body: string,
}

export function Course() {
  const [postContent, setPostContent] = useState('');
  const [course, setCourse] = useState<Course>();
  const [error, setError] = useState('');
  const { uuid } = useParams();

  const { data , isFetching, isError } = useQuery<Course>(
    ['course', uuid],
    async () => {
      const response = await axios.get(`/courses/${uuid}`);
      return response.data.course;
    }
  );



  return (
    <div>
      <Header />
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="px-64 space-y-4 ">
          {isFetching ? (
            <p className="text-center">Carregando curso...</p>
          ) : (
            <>
              <h2 className="text-center">{data?.name}</h2>
              <hr />
              <div data-color-mode="light">
                <MarkdownPreview source={data?.body} />
              </div>
            </>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
