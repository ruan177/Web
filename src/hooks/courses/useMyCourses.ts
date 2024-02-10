import { useState } from "react";
import { useMutation, useQuery } from 'react-query';
import { queryClient } from "../../lib/queryClient";
import { Course } from "../../types/courseTypes";
import useAxios from "../../lib/axios";
import { useAuth } from "../../context/loginContext";



export function useMyCourses() {

    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const [deleteError, setDeleteError] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const axios = useAxios();

    const { data, isFetching, isError, error } = useQuery<Course[]>('MyCourses', async () => {
        const response = await axios.get(`/mycourses/${user?.id}`, {
            params: {
                page: page,
                pageSize: pageSize,
            },
        });
        return response.data.courses;
    },
        {
            keepPreviousData: true,
            staleTime: 30*(60*1000),
        });

    const cardsPerPage = 7;

    const filteredCourses = search.length > 0
        ? data?.filter(course => course.name.toLowerCase().includes(search.toLowerCase()))
        : data || [];
   
        
    const deleteCourseMutation = useMutation((id: string) => axios.delete(`/courses/${id}/delete`), {
        onSuccess: () => {
           
            queryClient.invalidateQueries('MyCourses');
            queryClient.refetchQueries(['MyCourses', page, pageSize]);
        },
    });

    function handleDeleteCourse(id: string): void {
        if (window.confirm('Are you sure you want to delete this course?')) {
            deleteCourseMutation.mutate(id);
        }
    }

    const totalPages = Math.ceil(filteredCourses?.length || 0/ cardsPerPage);
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = Math.min(startIndex + cardsPerPage, filteredCourses?.length || 0);


    return {
        search,
        setSearch,
        deleteError,
        data,
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
    };
}
