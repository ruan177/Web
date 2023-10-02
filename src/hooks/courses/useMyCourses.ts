import { useState } from "react";
import { useMutation, useQuery } from 'react-query';
import { queryClient } from "../../lib/queryClient";
import { useAuth } from "../../context/loginContext";
import { useAxios } from "../../lib/axios";
import { Course } from "../../types/courseTypes";



export function useMyCourses() {
    const { loggedIn, changeLoggedIn } = useAuth();
    const [search, setSearch] = useState('');
    const userUuid = localStorage.getItem('user');
    const [deleteError, setDeleteError] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const axios = useAxios();

    const { data, isFetching, isError, error } = useQuery<Course[]>('MyCourses', async () => {
        const response = await axios.get(`/mycourses/${userUuid}`, {
            params: {
                page: page,
                pageSize: pageSize,
            },
        });
        return response.data.courses;
    },
        {
            keepPreviousData: true,
        });

    const cardsPerPage = 7;

    const filteredCourses = search.length > 0
        ? data?.filter(course => course.name.toLowerCase().includes(search.toLowerCase()))
        : data || [];

    const deleteCourseMutation = useMutation((id: string) => axios.delete(`/courses/${id}/delete`), {
        onSuccess: () => {
            queryClient.invalidateQueries('MyCourses');
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
