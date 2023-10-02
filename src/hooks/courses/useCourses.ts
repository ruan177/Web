import { useState } from "react";
import { useAxios } from "../../lib/axios";
import { useQuery } from "react-query";
import { CoursesResponse } from "../../types/courseTypes";


export function useCourses() {
  const [search, setSearch] = useState<string>(''); // Declare o tipo do estado como string
  const [page, setPage] = useState<number>(1); // Declare o tipo do estado como número
  const [pageSize, setPageSize] = useState<number>(10); // Declare o tipo do estado como número
  const axios = useAxios();

  const { 
    data, 
    isFetching, 
    isError, 
    error 
  } = useQuery<CoursesResponse>(
    ['courses', page, pageSize], // Adicione a variável "page" como dependência
    async () => {
      const response = await axios.get('/courses', {
        params: {
          page: page,
          pageSize: pageSize,
        },
      });
      return response.data; // Não é necessário acessar response.data.courses aqui
    },
    {
      keepPreviousData: true,
    }
  );

  const cardsPerPage = 7;

  const filteredCourses = search.length > 0
    ? data?.courses?.filter(course => course.name.toLowerCase().includes(search.toLowerCase()))
    : data?.courses || [];

  const startIndex = (page - 1) * cardsPerPage;

  const endIndex = Math.min(startIndex + cardsPerPage, filteredCourses?.length || 0 ) ; // Use Math.min para evitar índices maiores do que o tamanho do array

  const totalPages = Math.ceil(filteredCourses?.length || 0  / cardsPerPage);

  const displayedCourses = filteredCourses?.slice(startIndex, endIndex);


  return {
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    axios,
    data,
    isFetching,
    isError,
    error,
    totalPages,
    cardsPerPage,
    filteredCourses,
    startIndex, 
    endIndex,
    displayedCourses
  };
}
