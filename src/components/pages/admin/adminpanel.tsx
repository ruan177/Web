import { useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { axios } from "../../../lib/axios";

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

interface Course {
  id: number;
  title: string;
  description: string;
  isApproved: boolean;
}

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<"users" | "courses">("users");

  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } =
    useQuery<User[], AxiosError>("users", async () => {
      const response = await axios.get('/user')
      return response.data;
    });

  const { data: courses, isLoading: isLoadingCourses, isError: isErrorCourses } =
    useQuery<Course[], AxiosError>("courses", async () => {
      const response = await axios.get('/courses');
      return response.data;
    });

  return (
    <div className="flex h-screen">
      {/* Drawer */}
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
        </ul>
      </div>

      {/* Content */}
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
                      <td className="border px-4 py-2">{course.title}</td>
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


