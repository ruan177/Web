
import React, { useEffect, useId, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { axios } from '../../../lib/axios';
import { NavLink } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from '@mui/material';
import { queryClient } from '../../../lib/queryClient';

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface Course {
  id: number;
  name: string;
  description: string;
  isAproved: boolean;
}

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isUsersEditMode, setIsUsersEditMode] = useState(false);
  const [isCoursesEditMode, setIsCoursesEditMode] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]); // Store the updated user data here
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const { data: usersDataInitial, isLoading: isLoadingUsers, isError: isErrorUsers } =
    useQuery<User[], AxiosError>('users', async () => {
      const userId = localStorage.getItem('user');
      const response = await axios.get(`/users/${userId}/admin`);
      return response.data;
    });

  // Initialize user data and set it to usersData state
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
      // Add this line
      console.log('Inside handleUsersSave');
      const updatedUsers = usersData.filter((user) => {
        const initialUser = usersDataInitial.find((initial) => initial.id === user.id);
        return initialUser && initialUser.isAdmin !== user.isAdmin;
      });

      if (updatedUsers.length > 0) {
        try {
          const response = await updateUserMutation.mutateAsync(updatedUsers);
          console.log('Update response:', response); // Add this line
    
     
            if(response.status === 200){
              //setUsersData(updatedUsers);
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
        setIsCoursesEditMode(false);
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
        // Lidar com o erro
      }
    } else {
      setIsCoursesEditMode(false);
    }
  };
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

  const handleUserDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(selectedUsers);
      setSelectedUsers([]);
    } catch (error) {
      // Handle error
    }
  };

  const deleteCoursesMutation = useMutation<void, AxiosError, number[]>(
    async (selectedCourseIds) => {
      await axios.delete('/courses/delete', { data: selectedCourseIds });
    },
    {
      // You can also provide an onSuccess callback if needed.
      onSuccess: () => {
        // On successful deletion, invalidate and refetch the 'courses' query
        queryClient.invalidateQueries('courses');
        queryClient.refetchQueries('courses');
        setIsCoursesEditMode(false);
      },
    }
  );

  const handleCourseDelete = async () => {
    try {
      await deleteCoursesMutation.mutateAsync(selectedCourses);
      // Clear selected courses
      setSelectedCourses([]);
    } catch (error) {
      // Handle error
    }
  };
  const handleUsersEdit = () => {
    setIsUsersEditMode(true);
  };

  const handleCoursesEdit = () => {
    setIsCoursesEditMode(true);
  };

  const handleUsersCancel = () => {
    setIsUsersEditMode(false);
  };

  const handleCoursesCancel = () => {
    setIsCoursesEditMode(false);
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
      {/* Drawer */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="font-bold text-xl mb-4">Admin</h2>
        <ul>
          <li
            className={`cursor-pointer py-2 border-b border-gray-300 ${activeTab === 'users' ? 'font-bold' : ''
              }`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </li>
          <li
            className={`cursor-pointer py-2 border-b border-gray-300 ${activeTab === 'courses' ? 'font-bold' : ''
              }`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </li>
          <li className="cursor-pointer py-2 border-b border-gray-300">
            <NavLink to="/">Back to Home</NavLink>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="w-3/4 p-4">
        {activeTab === 'users' && (
          <>
            <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
              Users
              <div className="space-x-2">
                {/* Botão de editar usuários */}
                <Button variant="contained" color="primary" onClick={handleUsersEdit}>
                  Edit
                </Button>
                {isUsersEditMode && (
                  <Button variant="contained" color="secondary" onClick={handleUserDelete}>
                    Delete
                  </Button>
                )}
                {/* Botão de excluir usuários */}

              </div>
            </h3>
            <TableContainer component={Paper}>
              <Table aria-label="users table">
                <TableHead>
                  <TableRow>
                    {isUsersEditMode && <TableCell></TableCell>} {/* Cabeçalho da checkbox */}
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Is Admin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersData?.map((user) => (
                    <TableRow key={user.id}>
                      {isUsersEditMode && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelect(user.id)}
                          />
                        </TableCell>
                      )}
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                      {isUsersEditMode ? (
                        <TableCell>
                          <select
                            value={user.isAdmin ? 'true' : 'false'}
                            onChange={(event) => {
                              const updatedUsers = usersData.map((u) =>
                                u.id === user.id ? { ...u, isAdmin: event.target.value === 'true' } : u
                              );
                              setUsersData(updatedUsers); // Update the local state directly
                            }}
                          >
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                        </TableCell>
                      ) : (
                        <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
                      )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        {isUsersEditMode && (
          <div className="flex mt-2 items-center space-x-2">
            {/* Botão de cancelar edição de cursos */}
            <Button variant="contained" color="error" onClick={handleUsersCancel}>
              Cancel
            </Button>

            {/* Botão de salvar edição de cursos */}
            <Button variant="contained" color="success" onClick={handleUsersSave}>
              Save
            </Button>
          </div>
        )}
      </>
        )}

      {activeTab === 'courses' && (
        <>
          <h3 className="font-bold text-lg mb-4 flex items-center justify-between">
            Courses
            <div className="space-x-2">
              {/* Botão de editar cursos */}
              <Button variant="contained" color="primary" onClick={handleCoursesEdit}>
                Edit
              </Button>

              {/* Botão de excluir cursos */}
              {isCoursesEditMode && (
                <Button variant="contained" color="secondary" onClick={handleCourseDelete}>
                  Delete
                </Button>
              )}

            </div>
          </h3>
          <TableContainer component={Paper}>
            <Table aria-label="courses table">
              <TableHead>
                <TableRow>
                  {isCoursesEditMode && <TableCell></TableCell>} {/* Cabeçalho da checkbox */}
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Is Approved</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coursesData?.map((course) => (
                  <TableRow key={course.id}>
                    {isCoursesEditMode && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => handleCourseSelect(course.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>
                    {isCoursesEditMode ? (
                        <TableCell>
                          <select
                            value={course.isApproved ? 'true' : 'false'}
                            onChange={(event) => {
                              const updatedCourses = coursesData.map((u) =>
                                u.id === course.id ? { ...u, isApproved: event.target.value === 'true' } : u
                              );
                              setCoursesData(updatedCourses); // Update the local state directly
                            }}
                          >
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                        </TableCell>
                      ) : (
                        <TableCell>{course.isAproved ? 'Yes' : 'No'}</TableCell>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isCoursesEditMode && (
            <div className="flex mt-2 items-center space-x-2">
              {/* Botão de cancelar edição de cursos */}
              <Button variant="contained" color="secondary" onClick={handleCoursesCancel}>
                Cancel
              </Button>

              {/* Botão de salvar edição de cursos */}
              <Button variant="contained" color="primary" onClick={handleCoursesSave}>
                Save
              </Button>
            </div>
          )}
        </>
      )}
      {/* Botão de editar */}

    </div>
    </div >
  );
};

export default Admin;