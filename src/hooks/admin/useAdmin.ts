import { useState, useEffect } from "react";

import { useQuery, useMutation } from "react-query";
import { User } from "../../components/tables/usersTable";
import { Course } from "../../types/AdminTableTypes";
import { queryClient } from "../../lib/queryClient";
import { AxiosError } from "axios";
import { useAuth } from "../../context/loginContext";
import useAxios from "../../lib/axios";

export function useAdmin() {
    const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [isUsersEditMode, setIsUsersEditMode] = useState(false);
    const [isCoursesEditMode, setIsCoursesEditMode] = useState(false);
    const [usersData, setUsersData] = useState<User[]>([]); // Store the updated user data here
    const [coursesData, setCoursesData] = useState<Course[]>([]);
    const {user, } = useAuth();
    const axios = useAxios();
  
    const handleUsersEdit = () => { setIsCoursesEditMode(true); };
    const handleCoursesEdit = () => { setIsCoursesEditMode(true); };
    const handleUsersCancel = () => { setIsCoursesEditMode(true); };
    const handleCoursesCancel = () => { setIsCoursesEditMode(true); };
  
    const { data: usersDataInitial, isLoading: isLoadingUsers, isError: isErrorUsers } =
    useQuery<User[], AxiosError>('users', async () => {
      const response = await axios.get(`/users/${user?.id}/admin`);
      return response.data;
    });
  useEffect(() => {
    if (usersDataInitial) {
      setUsersData(usersDataInitial);
    }
  }, [usersDataInitial]);
  
  const { data: coursesDataInitial, isLoading: isLoadingCourses, isError: isErrorCourses } =
    useQuery<Course[], AxiosError>('courses', async () => {
      const response = await axios.get('/courses/admin');
      return response.data.courses;
    });
  useEffect(() => {
    if (coursesDataInitial) {
      setCoursesData(coursesDataInitial);
    }
  }, [coursesDataInitial]);
  
    const updateUserMutation = useMutation<void, AxiosError, User[]>(
      async (updatedUsers) => {
        return await axios.patch('/users/update', updatedUsers);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('users');
        },
      }
    );
    
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
    
    const deleteUserMutation = useMutation<void, AxiosError, number[]>(
      async (selectedUserIds) => {
        await axios.delete('/users/delete', { data: selectedUserIds });
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('users');
          queryClient.refetchQueries('users');
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
    
  
    const handleUsersSave = async () => {
      const updatedUsers = usersData.filter((user) => {
        const initialUser = usersDataInitial?.find((initial) => initial.id === user.id);
        return initialUser && initialUser.isAdmin !== user.isAdmin;
      });
      if (updatedUsers.length > 0) {
        try {
          const response: any = await updateUserMutation.mutateAsync(updatedUsers);
          if (response.status === 200) {
            setSelectedUsers([]);
            setIsUsersEditMode(false);
          }
        } catch (error) {
          console.error('Update error:', error); // Add this line
        }
      } else {
        setIsUsersEditMode(false);
      }
    };
  
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
          // Lidar com o erro
        }
      } else {
        setIsCoursesEditMode(false);
      }
    };
  
    const handleUserDelete = async () => {
      try {
        await deleteUserMutation.mutateAsync(selectedUsers);
        setSelectedUsers([]);
      } catch (error) {
        // Handle error
      }
    };
  
    const handleCourseDelete = async () => {
      try {
        await deleteCoursesMutation.mutateAsync(selectedCourses);
        // Clear selected courses
        setSelectedCourses([]);
      } catch (error) {
        // Handle error
      }
    };
  
    const handleUserSelect = (userId: number) => {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.includes(userId)
          ? prevSelectedUsers.filter((id) => id !== userId)
          : [...prevSelectedUsers, userId]
      );
    };
  
    const handleCourseSelect = (courseId: number) => {
      setSelectedCourses((prevSelectedCourses) =>
        prevSelectedCourses.includes(courseId)
          ? prevSelectedCourses.filter((id) => id !== courseId)
          : [...prevSelectedCourses, courseId]
      );
    };
  // Add query and mutation logic here...

  return {
    activeTab,
    setActiveTab,
    selectedUsers,
    setSelectedUsers,
    selectedCourses,
    setSelectedCourses,
    isUsersEditMode,
    setIsUsersEditMode,
    isCoursesEditMode,
    setIsCoursesEditMode,
    usersData,
    setUsersData,
    coursesData,
    setCoursesData,
    axios,
    handleUsersEdit,
    handleCoursesEdit,
    handleUsersCancel,
    handleCoursesCancel,
    handleUsersSave,
    handleCoursesSave,
    handleUserDelete,
    handleCourseDelete,
    handleUserSelect,
    handleCourseSelect,
    // Add other functions and state here...
  };
}
