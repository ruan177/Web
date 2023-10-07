import { useState } from "react";

import { useQuery, useMutation } from "react-query";
import { CoursesResponse, SavedCoursesUser } from "../../types/courseTypes";
import axios from "axios";
import { queryClient } from "../../lib/queryClient";



export function useCourses() {
  const [search, setSearch] = useState<string>(''); // Declare o tipo do estado como string
  const [page, setPage] = useState<number>(1); // Declare o tipo do estado como número
  const [pageSize, setPageSize] = useState<number>(10); // Declare o tipo do estado como número


  const { 
    data, 
    isFetching, 
    isError, 
    error 
  } = useQuery<CoursesResponse>(
    ['courses', page, pageSize], // Adicione a variável "page" como dependência
    async () => {
      const response = await axios.get('http://localhost:8080/courses', {
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

  function isCourseSaved(savedUsers: SavedCoursesUser[], userId: string): boolean {
    console.log("savedUsers:", savedUsers);
    console.log("userId:", userId);
    return savedUsers.some(user => user.user_id === userId);
  }


  const handleSave = useMutation(
    async ({ courseId, userId }: { courseId: string, userId: string }) => {
      const data = {
        userId: userId,
        courseId: courseId,
      };
      const response = await axios.post('http://localhost:8080/save', {
        data: data,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        // After successfully saving a course, refetch the course list
        queryClient.refetchQueries(['courses', page, pageSize]);
      },
    }
  );
  
  // Define a mutation for unsaving a course
  const handleUnsave = useMutation(
    async ({ courseId, userId }: { courseId: string, userId: string }) => {
      const data = {
        userId: userId,
        courseId: courseId,
      };
      const response = await axios.delete('http://localhost:8080/save/delete', {
        data: data,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        // After successfully unsaving a course, refetch the course list
        queryClient.refetchQueries(['courses', page, pageSize]);
      },
    }
  );

  

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
    displayedCourses,
    isCourseSaved,
    handleSave,
    handleUnsave
  };
}

