import { useState, createContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from './components/pages/auth/login';
import { Home } from './components/pages/home';
import { Register } from './components/pages/auth/register';
import { Courses } from './components/pages/course/courses';
import { Error } from './components/pages/error';
import '../src/styles/global.css'
import { Course } from './components/pages/course/course';
import { CreateCourse } from './components/pages/course/createCourse';
import { UpdateCourse } from './components/pages/course/updateCourse';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from 'react-query';
import { MyCourses } from './components/pages/course/myCourses';
import { useContext } from "react";
import { Admin } from './components/pages/admin/adminpanel';
import { ChangeAccount } from './components/pages/user/changeAccount';
import ResetPasswordForm from './components/pages/user/resetPassword';
import { AuthProvider } from './context/loginContext';
import { PrivateRoute } from './lib/privateRoute';



export default function App() {


  return (
    <AuthProvider>

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} errorElement={<Error />}/>,
            <Route path="/register" element={<Register />}errorElement={<Error />} />,
            <Route path="/" element={<Home />} errorElement={<Error />}/>,
            <Route path="/courses" element={<Courses />}errorElement={<Error />}/>,
            <Route path="/courses/:uuid" element={<Course />}errorElement={<Error />} />,
            <Route path="/course/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>} errorElement={<Error />}/>,
            <Route path="/course/:uuid/update" element={<PrivateRoute><UpdateCourse /></PrivateRoute>} errorElement={<Error />}/>,
            <Route path="/mycourses/:userId" element={<PrivateRoute><MyCourses /></PrivateRoute>}errorElement={<Error />} />,
            <Route path="/account/update" element={<PrivateRoute><ChangeAccount /></PrivateRoute>}errorElement={<Error />} />,
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} errorElement={<Error />}/>,
            <Route path="/reset" element={<ResetPasswordForm />} errorElement={<Error />}/>,
            <Route path="/error" element={<Error />}  />,
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

    </AuthProvider>

  )
}



