
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Login } from './pages/auth/login';
import { Home } from './pages/home';
import { Register } from './pages/auth/register';
import { Courses } from './pages/course/courses';
import { Error } from './pages/error';
import '../src/styles/global.css'
import { Course } from './pages/course/course';
import { CreateCourse } from './pages/course/createCourse';
import { UpdateCourse } from './pages/course/updateCourse';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from 'react-query';
import { MyCourses } from './pages/course/myCourses';
import { Admin } from './pages/admin/adminpanel';
import { ChangeAccount } from './pages/user/changeAccount';
import ResetPasswordForm from './pages/user/resetPassword';
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



