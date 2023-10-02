import { useQuery } from "react-query";
import { useAxios } from "../../lib/axios";
import { Courses } from "../../types/courseTypes";


export function useCourse(uuid: string | undefined) {
    const axios = useAxios();
  
    const { data, isFetching, isError, error } = useQuery<Courses>(
      ['course', uuid],
      async () => {
        const response = await axios.get(`/courses/${uuid}`);
        return response.data.course;
      }
    );
  
    return {
      data,
      isFetching,
      isError,
      error,
    };
  }