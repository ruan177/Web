import { useQuery } from "react-query";
import { Courses } from "../../types/courseTypes";
import useAxios from "../../lib/axios";


export function useCourse(uuid: string | undefined) {

  const axios = useAxios();
  const { data, isFetching, isError, error } = useQuery<Courses>(
    ['course', uuid],
    async () => {
      const response = await axios.get(`/courses/${uuid}`);
      return response.data.course;
    }, {
      staleTime: 30*(60*1000),
    }
  );

  return {
    data,
    isFetching,
    isError,
    error,
  };
}