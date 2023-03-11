
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Home} from './components/pages/home'
import {Routes, Route, Navigate, RouteProps, redirect, useLocation } from "react-router-dom";
import { Login } from './components/pages/login';
import { Register } from './components/pages/register';
import { Courses } from './components/pages/curso';

interface ILayoutProps {
  children: RouteProps["children"];
}

export default function App() {
    return (

      <Routes>
          <Route  path ="/login"   element ={<Login />}/>,
          <Route  path ="/register"   element ={ <Register />}/>,
          <Route
            path="/courses"
            element={
              <RequireAuth>
                <Courses />
              </RequireAuth>
            }/>
          <Route  path ="/home"   element ={ <Home />}/>,
      </Routes>
  
)
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let isAutenticated:boolean = true;
  if (!isAutenticated) {
    return <Navigate to="/login"/>
  };

  return children;
}