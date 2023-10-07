import { useQuery } from "react-query";
import { Courses } from "../../types/courseTypes";
import axios from "axios";


export function useCourse(uuid: string | undefined) {

  
    const { data, isFetching, isError, error } = useQuery<Courses>(
      ['course', uuid],
      async () => {
        const response = await axios.get(`http://localhost:8080/courses/${uuid}`);
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