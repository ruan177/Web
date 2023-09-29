
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useAxios } from '../../../lib/axios';
import Navigation from '../../tables/navigation';
import UsersTable from '../../tables/usersTable';
import CoursesTable from '../../tables/coursesTable';
import { User, Course } from '../../utils/AdminTableTypes'
import { deleteCoursesMutation, deleteUserMutation, updateCoursesMutation, updateUserMutation } from '../../utils/adminMutations';


export const Admin = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isUsersEditMode, setIsUsersEditMode] = useState(false);
  const [isCoursesEditMode, setIsCoursesEditMode] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]); // Store the updated user data here
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const axios = useAxios();

  const handleUsersEdit = () => { setIsCoursesEditMode(true); };
  const handleCoursesEdit = () => { setIsCoursesEditMode(true); };
  const handleUsersCancel = () => { setIsCoursesEditMode(true); };
  const handleCoursesCancel = () => { setIsCoursesEditMode(true); };

  const { data: usersDataInitial, isLoading: isLoadingUsers, isError: isErrorUsers } =
    useQuery<User[], AxiosError>('users', async () => {
      const userId = localStorage.getItem('user');
      const response = await axios.get(`/users/${userId}/admin`);
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

  return (

    <div className="flex h-screen">
      <Navigation
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div className="w-3/4 p-4">
        <UsersTable
          activeTab={activeTab}
          usersData={usersData}
          isUsersEditMode={isUsersEditMode}
          selectedUsers={selectedUsers}
          handleUsersEdit={handleUsersEdit}
          handleUserDelete={handleUserDelete}
          handleUserSelect={handleUserSelect}
          handleUsersCancel={handleUsersCancel}
          handleUsersSave={handleUsersSave}
          setUsersData={setUsersData} />

        <CoursesTable
          activeTab={activeTab}
          coursesData={coursesData}
          isCoursesEditMode={isCoursesEditMode}
          selectedCourses={selectedCourses}
          handleCoursesEdit={handleCoursesEdit}
          handleCourseDelete={handleCourseDelete}
          handleCourseSelect={handleCourseSelect}
          handleCoursesCancel={handleCoursesCancel}
          handleCoursesSave={handleCoursesSave}
          setCoursesData={setCoursesData}
        />
      </div>
    </div>
  );
};

export default Admin;