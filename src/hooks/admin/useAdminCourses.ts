import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { Course } from "../../types/AdminTableTypes";
import { AxiosError } from "axios";
import { queryClient } from "../../lib/queryClient";
import { useAuth } from "../../context/loginContext";
import useAxios from "../../lib/axios";

export function useAdminCourses() {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isCoursesEditMode, setIsCoursesEditMode] = useState(false);
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [coursePage, setCoursePage] = useState(1);
  const courseItemsPerPage =  8;
  
  const axios = useAxios();

  const handleCoursesEdit = () => { setIsCoursesEditMode(true); };
  const handleCoursesCancel = () => { setIsCoursesEditMode(false); };

  const { data: coursesDataInitial } = useQuery<Course[], AxiosError>(['courses', coursePage], async () => {
    const response = await axios.get(`/courses/admin?page=${coursePage}&limit=${courseItemsPerPage}`);
    return response.data.courses;
  });

  useEffect(() => {
    if (coursesDataInitial) {
      setCoursesData(coursesDataInitial);
    }
  }, [coursesDataInitial]);

  const updateCoursesMutation = useMutation<void, AxiosError, Course[]>(
    async (updatedCourses) => {
      return await axios.patch('/courses/update', updatedCourses);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
        queryClient.refetchQueries('courses');
      },
    }
  );

  const deleteCoursesMutation = useMutation<void, AxiosError, number[]>(
    async (selectedCourseIds) => {
      await axios.delete('/courses/delete', { data: selectedCourseIds });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('courses');
        queryClient.refetchQueries('courses');
      },
    }
  );

  const handleCoursesSave = async () => {
    const coursesToUpdate = coursesData.map((course) =>
      selectedCourses.includes(course.id) ? { ...course, isAproved: !course.isAproved } : course
    );

    if (coursesToUpdate.length > 0) {
      try {
        await updateCoursesMutation.mutateAsync(coursesToUpdate);
        setCoursesData(coursesToUpdate);
        setIsCoursesEditMode(false);
        setSelectedCourses([]); // Limpar cursos selecionados
      } catch (error) {
        console.error('Save error:', error);
      }
    } else {
      setIsCoursesEditMode(false);
    }
  };

  const handleCourseDelete = async () => {
    try {
      await deleteCoursesMutation.mutateAsync(selectedCourses);
      // Clear selected courses
      setSelectedCourses([]);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  const handleCourseSelect = (courseId: number) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter((id) => id !== courseId)
        : [...prevSelectedCourses, courseId]
    );
  };
  const courseTotalPages = Math.ceil(coursesData?.length / courseItemsPerPage);
  const displayedCourses = coursesData?.slice((coursePage -  1) * courseItemsPerPage, coursePage * courseItemsPerPage);

  return {
    selectedCourses,
    setSelectedCourses,
    isCoursesEditMode,
    setIsCoursesEditMode,
    coursesData,
    setCoursesData,
    axios,
    handleCoursesEdit,
    handleCoursesCancel,
    handleCoursesSave,
    handleCourseDelete,
    handleCourseSelect,
    coursePage,
    setCoursePage,
    courseTotalPages,
    displayedCourses,
  };
}