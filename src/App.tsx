
import Header from './components/headers/header'
import { useEffect,useState, createContext, useContext } from 'react';
import {Routes, Route, Navigate, RouteProps, BrowserRouter } from "react-router-dom";
import { Login } from './components/pages/login';
import { Home } from './components/pages/home';
import { Register } from './components/pages/register';
import { Courses } from './components/pages/curso';

import React from 'react';
import '../src/styles/global.css'
import { baseUrl } from './lib/baseUrl';

interface ILayoutProps {
  children: RouteProps["children"];
}



export const LoginContext = createContext({ loggedIn: false, changeLoggedIn: (value: true | false) => {} });

export default function App() {
    useEffect(()=>{
      function refreshTokens(){
        if(localStorage.refresh){
          const url = baseUrl + '/refresh';
          fetch(url,{
            method: 'POST',
            headers: {
              'Content-type': "application/json",
            },
            body: JSON.stringify({
              refresh: localStorage.refresh,
            }),
          })
          .then((response)=>{
            response.json()
          })
          .then((data: any)=>{
            localStorage.access = data.access;
            changeLoggedIn(true)
          })
        }
      }
      const minute = 1000*60;
      refreshTokens();
      //setInterval(//refreshTokens, minute*3);
    }, []);


    const [loggedIn, setLoggedIn] = useState<boolean>(localStorage.access? true: false);

    function changeLoggedIn(value: boolean){
      setLoggedIn(value);
      if(value === false){
        localStorage.clear();
      }
    }
    return (
      <LoginContext.Provider value={{loggedIn, changeLoggedIn}}>
       <BrowserRouter>
          <Routes>
              <Route  path ="/login"   element ={<Login />}/>,
              <Route  path ="/register"   element ={ <Register />}/>,
              <Route  path ="/"   element ={ <Home />}/>,
              <Route
                path="/courses"
                element={
                  <RequireAuth>
                    <Courses />
                  </RequireAuth>
                }/>
            </Routes>
          </BrowserRouter>
      </LoginContext.Provider>
  
)
}

 function RequireAuth({ children }: { children: JSX.Element }) {
    const {loggedIn} = useContext(LoginContext)
    if (!loggedIn) {
        return <Navigate to="/login"/>
  };
  return children;
}

