
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Home} from './components/pages/home'
import {Routes, Route, Navigate, RouteProps, redirect, useLocation } from "react-router-dom";
import { Login } from './components/pages/login';
import { Register } from './components/pages/register';

interface ILayoutProps {
  children: RouteProps["children"];
}

export default function App() {
    return (

      <Routes>
          <Route  path ="/login"   element ={<Login />}/>,
          <Route  path ="/register"   element ={ <Register />}/>,
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }/>
      </Routes>
  
)
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let isAutenticated:boolean = true; //for testing 
  if (!isAutenticated) {
    return <Navigate to="/login"/>
  };

  return children;
}