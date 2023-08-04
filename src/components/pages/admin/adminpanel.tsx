{/* import { useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { axios } from "../../../lib/axios";
import { NavLink } from "react-router-dom";

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
  isApproved: boolean;
}

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<"users" | "courses">("users");

  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } =
    useQuery<User[], AxiosError>("users", async () => {
      const response = await axios.get('/users')
      return response.data;
    });

  const { data: courses, isLoading: isLoadingCourses, isError: isErrorCourses } =
    useQuery<Course[], AxiosError>("courses", async () => {
      const response = await axios.get('/courses');
      return response.data.courses;
    });

  return (
    <div className="flex h-screen">
      
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="font-bold text-xl mb-4">Admin</h2>
        <ul>
          <li
            className={`cursor-pointer py-2 border-b border-gray-300 ${
              activeTab === "users" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
          <li
            className={`cursor-pointer py-2 border-b border-gray-300 ${
              activeTab === "courses" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </li>
          <li
            className="cursor-pointer py-2 border-b border-gray-300"
            
          >
            <NavLink to="/">Back to Home</NavLink>
          </li>
        </ul>
      </div>

      
      <div className="w-3/4 p-4">
        {activeTab === "users" && (
          <>
            <h3 className="font-bold text-lg mb-4">Users</h3>
            {isLoadingUsers ? (
              <p>Loading users...</p>
            ) : isErrorUsers ? (
              <p>Error fetching users.</p>
            ) : (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Is Admin</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <td className="border px-4 py-2">{user.username}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {activeTab === "courses" && (
          <>
            <h3 className="font-bold text-lg mb-4">Courses</h3>
            {isLoadingCourses ? (
              <p>Loading courses...</p>
            ) : isErrorCourses ? (
              <p>Error fetching courses.</p>
            ) : (
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Is Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {courses?.map((course) => (
                    <tr key={course.id}>
                      <td className="border px-4 py-2">{course.name}</td>
                      <td className="border px-4 py-2">{course.description}</td>
                      <td className="border px-4 py-2">
                        {course.isApproved ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};
*/}
import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { AxiosError } from 'axios';
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
  isApproved: boolean;
}

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'courses'>('users');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [isUsersEditMode, setIsUsersEditMode] = useState(false);
  const [isCoursesEditMode, setIsCoursesEditMode] = useState(false);
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } =
    useQuery<User[], AxiosError>('users', async () => {
      const response = await axios.get('/users');
      return response.data;
    });

  const { data: coursesData, isLoading: isLoadingCourses, isError: isErrorCourses } =
    useQuery<Course[], AxiosError>('courses', async () => {
      const response = await axios.get('/courses');
      return response.data.courses;
    });


  const handleUsersSave = () => {
    // Implemente a lógica para excluir os usuários e cursos selecionados
  };
  const handleCoursesSave = () => {
    // Implemente a lógica para excluir os usuários e cursos selecionados
  };
  const handleUserDelete = () => {
    // Implemente a lógica para excluir os usuários e cursos selecionados
  };
  const handleCourseDelete = () => {
    // Implemente a lógica para excluir os usuários e cursos selecionados
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
                      <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
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
                      <TableCell>{course.isApproved ? 'Yes' : 'No'}</TableCell>
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
    </div>
  );
};

export default Admin;