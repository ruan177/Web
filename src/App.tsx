import { useState, createContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from './components/pages/auth/login';
import { Home } from './components/pages/home';
import { Register } from './components/pages/auth/register';
import { Courses } from './components/pages/course/courses';
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


export const LoginContext = createContext({ loggedIn: false, changeLoggedIn: (value: true | false) => { } });

export default function App() {

  const [loggedIn, changeLoggedIn] = useState<boolean>(localStorage.access ? true : false);



  useEffect(() => {
    // When the loggedIn state is updated, force a re-render to show/hide <UserProfile />
  }, [loggedIn])

  return (
    <LoginContext.Provider value={{ loggedIn, changeLoggedIn }}>

      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />,
            <Route path="/register" element={<Register />} />,
            <Route path="/" element={<Home />} />,
            <Route path="/courses" element={<Courses />} />,
            <Route path="/courses/:uuid" element={<Course />} />,
            <Route path="/course/create" element={<PrivateRoute><CreateCourse /></PrivateRoute>} />,
            <Route path="/course/:uuid/update" element={<PrivateRoute><UpdateCourse /></PrivateRoute>} />,
            <Route path="/mycourses/:userId" element={<PrivateRoute><MyCourses /></PrivateRoute>} />,
            <Route path="/account/update" element={<PrivateRoute><ChangeAccount /></PrivateRoute>} />,
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />,
            <Route path="/reset" element={<ResetPasswordForm />} />,
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

    </LoginContext.Provider>

  )
}

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { loggedIn } = useContext(LoginContext);

  if (!loggedIn) {
    return <Navigate to="/login" />;

  };
  return children;
}

